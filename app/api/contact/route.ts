import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailAppPassword) {
      return NextResponse.json(
        {
          error:
            "Email credentials are not configured. Please set GMAIL_USER and GMAIL_APP_PASSWORD in your environment.",
        },
        { status: 500 }
      );
    }

    const { name, email, phone, projectType, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, or message." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    // Email 1 (Notification to Niraj)
    const notificationMail = {
      from: `"Portfolio Leads" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email,
      subject: `New Project Brief: ${name} (${projectType || "General Inquiry"})`,
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
                  <div class="value">${escapeHtml(name)}</div>
                </div>

                <div class="field">
                  <div class="label">Client Email</div>
                  <div class="value">
                    <a href="mailto:${escapeHtml(email)}" style="color: #38bdf8; text-decoration: none;">
                      ${escapeHtml(email)}
                    </a>
                  </div>
                </div>

                <div class="field">
                  <div class="label">Contact / Mobile Number</div>
                  <div class="value">
                    ${phone ? `<a href="tel:${escapeHtml(phone)}" style="color: #38bdf8; text-decoration: none;">${escapeHtml(phone)}</a>` : '<span style="color: #9ca3af;">Not Provided</span>'}
                  </div>
                </div>

                <div class="field">
                  <div class="label">Project Type</div>
                  <div class="value">${escapeHtml(projectType || "Not Specified")}</div>
                </div>

                <div class="field">
                  <div class="label">Project Overview</div>
                  <div class="value message-body">${escapeHtml(message)}</div>
                </div>
              </div>
              <div class="footer">
                Developer Bhai Portfolio Lead &bull; Direct Reply-To configured for ${escapeHtml(email)}
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Email 2 (Auto-Reply to the Client)
    const autoReplyMail = {
      from: `"Niraj Singh" <${gmailUser}>`,
      to: email,
      subject: `Thank you for reaching out, ${name}!`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; color: #1f2937; line-height: 1.6;">
          <p>Hi ${escapeHtml(name)},</p>
          <p>Thank you for submitting your project brief. I have received your requirements regarding <strong>${escapeHtml(
            projectType || "your project"
          )}</strong>.</p>
          <p>I will review the details and get back to you ASAP.</p>
          <br/>
          <p>Best regards,<br/><strong>Niraj Singh</strong></p>
        </div>
      `,
    };

    // Send both emails in parallel
    await Promise.all([
      transporter.sendMail(notificationMail),
      transporter.sendMail(autoReplyMail),
    ]);

    return NextResponse.json({ success: true, message: "Emails sent successfully" });
  } catch (err: unknown) {
    console.error("Nodemailer error processing contact form:", err);
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
