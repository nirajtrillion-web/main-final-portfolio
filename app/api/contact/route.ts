import { NextResponse } from "next/server";
import nodemailer, { type Transporter } from "nodemailer";

// In-memory sliding window rate limiter (zero third-party dependencies)
// Limits submissions to 5 requests per 15 minutes per IP address
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Periodically clean expired keys to ensure zero memory bloat
function cleanupExpiredRateLimits() {
  const now = Date.now();
  rateLimitMap.forEach((record, ip) => {
    if (now > record.resetAt) {
      rateLimitMap.delete(ip);
    }
  });
}

// Sanitize & validate constraints
const MAX_NAME_LEN = 100;
const MAX_EMAIL_LEN = 254;
const MAX_PHONE_LEN = 30;
const MAX_MESSAGE_LEN = 3000;
const ALLOWED_PROJECT_TYPES = new Set([
  "Business / Company Website",
  "E-Commerce / Online Store",
  "Custom Web Application / SaaS",
  "High-Converting Landing Page",
  "Website Redesign & Maintenance",
  "Other / Custom Project",
]);

// RFC 5322 compliant email regex without catastrophic backtracking risks (ReDoS safe)
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const PHONE_REGEX = /^[\d\s+\-()]{7,25}$/;

// Persistent singleton SMTP connection pool across serverless warm invocations
let cachedTransporter: Transporter | null = null;

function getTransporter(user: string, pass: string): Transporter {
  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      service: "gmail",
      pool: true,
      maxConnections: 3,
      maxMessages: 100,
      auth: {
        user,
        pass,
      },
    });
  }
  return cachedTransporter;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    // 1. IP extraction & Rate Limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const clientIp = (forwardedFor ? forwardedFor.split(",")[0].trim() : realIp) || "127.0.0.1";

    cleanupExpiredRateLimits();

    const now = Date.now();
    const existingLimit = rateLimitMap.get(clientIp);

    if (existingLimit && now < existingLimit.resetAt) {
      if (existingLimit.count >= MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json(
          { error: "Too many submission attempts. Please wait 15 minutes before trying again." },
          { status: 429 }
        );
      }
      existingLimit.count += 1;
    } else {
      rateLimitMap.set(clientIp, {
        count: 1,
        resetAt: now + RATE_LIMIT_WINDOW_MS,
      });
    }

    // 2. Server credentials validation
    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailAppPassword) {
      // Do not leak internal environment variable names to clients
      return NextResponse.json(
        { error: "Contact delivery service is temporarily unavailable. Please email directly." },
        { status: 503 }
      );
    }

    // 3. Payload size and JSON parsing check
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Malformed request payload." },
        { status: 400 }
      );
    }

    const { name, email, phone, projectType, message, honeypot } = body;

    // 4. Honeypot check (anti-bot safeguard)
    if (honeypot && typeof honeypot === "string" && honeypot.trim().length > 0) {
      // Return synthetic success to silently trap automated spam bots
      return NextResponse.json({ success: true, message: "Inquiry received." });
    }

    // 5. Input Validation & Type Checking
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid field format. Name, email, and message are required." },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();
    const cleanPhone = typeof phone === "string" ? phone.trim() : "";
    const cleanProjectType =
      typeof projectType === "string" && ALLOWED_PROJECT_TYPES.has(projectType.trim())
        ? projectType.trim()
        : "Business / Company Website";

    // 6. Strict field constraints & Length caps
    if (cleanName.length === 0 || cleanName.length > MAX_NAME_LEN) {
      return NextResponse.json(
        { error: `Name is required and must not exceed ${MAX_NAME_LEN} characters.` },
        { status: 400 }
      );
    }

    if (cleanEmail.length === 0 || cleanEmail.length > MAX_EMAIL_LEN || !EMAIL_REGEX.test(cleanEmail)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (cleanPhone.length > 0) {
      if (cleanPhone.length > MAX_PHONE_LEN || !PHONE_REGEX.test(cleanPhone)) {
        return NextResponse.json(
          { error: "Invalid phone number format." },
          { status: 400 }
        );
      }
    }

    if (cleanMessage.length === 0 || cleanMessage.length > MAX_MESSAGE_LEN) {
      return NextResponse.json(
        { error: `Message is required and must not exceed ${MAX_MESSAGE_LEN} characters.` },
        { status: 400 }
      );
    }

    // 7. SMTP Connection Pool & Dispatch
    const transporter = getTransporter(gmailUser, gmailAppPassword);

    const notificationMail = {
      from: `"Portfolio Leads" <${gmailUser}>`,
      to: gmailUser,
      replyTo: cleanEmail,
      subject: `New Project Brief: ${cleanName.replace(/[\r\n]/g, "")} (${cleanProjectType})`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>New Project Brief</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                background-color: #0b0c10;
                color: #e5e7eb;
                margin: 0;
                padding: 32px 16px;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background: #151821;
                border: 1px solid #2d3748;
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 10px 25px rgba(0,0,0,0.5);
              }
              .header {
                background: linear-gradient(135deg, #06b6d4, #4f46e5);
                padding: 24px;
                color: #ffffff;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 22px;
                letter-spacing: -0.5px;
              }
              .content {
                padding: 24px;
              }
              .field {
                margin-bottom: 20px;
              }
              .label {
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 1px;
                color: #9ca3af;
                font-weight: 600;
                margin-bottom: 6px;
              }
              .value {
                font-size: 15px;
                color: #f3f4f6;
                background: #0f1117;
                padding: 12px 16px;
                border-radius: 8px;
                border: 1px solid #1f2937;
              }
              .message-body {
                white-space: pre-wrap;
                line-height: 1.6;
              }
              .footer {
                padding: 16px 24px;
                border-top: 1px solid #1f2937;
                text-align: center;
                font-size: 12px;
                color: #6b7280;
                background: #0d0f15;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>New Portfolio Lead</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Client Name</div>
                  <div class="value">${escapeHtml(cleanName)}</div>
                </div>

                <div class="field">
                  <div class="label">Client Email</div>
                  <div class="value">
                    <a href="mailto:${escapeHtml(cleanEmail)}" style="color: #38bdf8; text-decoration: none;">
                      ${escapeHtml(cleanEmail)}
                    </a>
                  </div>
                </div>

                <div class="field">
                  <div class="label">Contact / Mobile Number</div>
                  <div class="value">
                    ${cleanPhone ? `<a href="tel:${escapeHtml(cleanPhone)}" style="color: #38bdf8; text-decoration: none;">${escapeHtml(cleanPhone)}</a>` : '<span style="color: #9ca3af;">Not Provided</span>'}
                  </div>
                </div>

                <div class="field">
                  <div class="label">Project Type</div>
                  <div class="value">${escapeHtml(cleanProjectType)}</div>
                </div>

                <div class="field">
                  <div class="label">Project Overview</div>
                  <div class="value message-body">${escapeHtml(cleanMessage)}</div>
                </div>
              </div>
              <div class="footer">
                Developer Bhai Portfolio Lead &bull; Direct Reply-To configured for ${escapeHtml(cleanEmail)}
              </div>
            </div>
          </body>
        </html>
      `,
    };

    const autoReplyMail = {
      from: `"Niraj Singh" <${gmailUser}>`,
      to: cleanEmail,
      subject: `Thank you for reaching out, ${cleanName.replace(/[\r\n]/g, "")}!`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; color: #1f2937; line-height: 1.6;">
          <p>Hi ${escapeHtml(cleanName)},</p>
          <p>Thank you for submitting your project brief. I have received your requirements regarding <strong>${escapeHtml(cleanProjectType)}</strong>.</p>
          <p>I will review the details and get back to you ASAP.</p>
          <br/>
          <p>Best regards,<br/><strong>Niraj Singh</strong></p>
        </div>
      `,
    };

    // Parallel non-blocking email dispatch
    await Promise.all([
      transporter.sendMail(notificationMail),
      transporter.sendMail(autoReplyMail),
    ]);

    return NextResponse.json({ success: true, message: "Emails sent successfully" });
  } catch (err: unknown) {
    // Log server-side only for debugging; do not leak error specifics or stack traces to callers
    console.error("Contact handler error:", err);
    return NextResponse.json(
      { error: "Unable to process project brief at this time. Please try again shortly." },
      { status: 500 }
    );
  }
}
