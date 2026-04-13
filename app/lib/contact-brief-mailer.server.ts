import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

import type { ContactBriefValues } from "@/lib/contact-brief";

type ContactBriefMailPayload = ContactBriefValues & {
  submittedAtIso: string;
  requestOrigin: string;
  requestPath: string;
  ipAddress: string;
  userAgent: string;
};

type ContactBriefMailSettings = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  to: string;
};

const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;

let cachedTransporter: Transporter | null = null;
let hasVerifiedTransporter = false;

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function parsePort(portValue: string): number {
  const parsed = Number.parseInt(portValue, 10);
  if (!Number.isFinite(parsed) || parsed <= 0 || parsed > 65535) {
    throw new Error("SMTP_PORT must be a valid TCP port between 1 and 65535");
  }

  return parsed;
}

function normalizeFromAddress(fromRaw: string | undefined, smtpUser: string): string {
  const fallbackFrom = `RASA Contact <${smtpUser}>`;
  const candidate = fromRaw?.trim();

  if (!candidate) {
    return fallbackFrom;
  }

  if (candidate.includes("<") && candidate.includes(">")) {
    return candidate;
  }

  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate)) {
    return `RASA Contact <${candidate}>`;
  }

  const extractedEmail = candidate.match(emailPattern)?.[0];
  if (!extractedEmail) {
    return fallbackFrom;
  }

  const displayName = candidate
    .replace(extractedEmail, "")
    .replace(/[<>"']/g, "")
    .trim();

  return displayName ? `${displayName} <${extractedEmail}>` : `RASA Contact <${extractedEmail}>`;
}

function readSettings(): ContactBriefMailSettings {
  const host = process.env.SMTP_HOST?.trim() || "smtp.gmail.com";
  const port = parsePort(process.env.SMTP_PORT?.trim() || "465");
  const secure = (process.env.SMTP_SECURE?.trim() || "true").toLowerCase() !== "false";
  const user = requireEnv("SMTP_USER");
  const pass = requireEnv("SMTP_PASS");
  const from = normalizeFromAddress(process.env.SMTP_FROM, user);
  const to = process.env.CONTACT_BRIEF_TO?.trim() || "rasa.helpcare@gmail.com";

  return {
    host,
    port,
    secure,
    user,
    pass,
    from,
    to,
  };
}

async function getTransporter(settings: ContactBriefMailSettings) {
  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      host: settings.host,
      port: settings.port,
      secure: settings.secure,
      auth: {
        user: settings.user,
        pass: settings.pass,
      },
      tls: {
        minVersion: "TLSv1.2",
      },
      pool: true,
      maxConnections: 2,
      maxMessages: 50,
    });
  }

  if (!cachedTransporter) {
    throw new Error("Failed to initialize SMTP transporter");
  }

  const transporter = cachedTransporter;

  if (!hasVerifiedTransporter) {
    await transporter.verify();
    hasVerifiedTransporter = true;
  }

  return transporter;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function withLineBreaks(value: string): string {
  return escapeHtml(value).replaceAll("\n", "<br />");
}

function buildContactBriefHtml(payload: ContactBriefMailPayload): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>RASA Contact Brief</title>
  </head>
  <body style="margin:0;padding:0;background:#ece9e1;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#1f1e1b;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:28px 16px;background:linear-gradient(145deg,#ece9e1 0%,#ded9cf 60%,#d6d2c8 100%);">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:760px;background:#f7f4ed;border:1px solid #c4bfb3;box-shadow:0 22px 45px rgba(31,30,27,0.14);">
            <tr>
              <td style="padding:26px 28px;background:linear-gradient(120deg,#22211d 0%,#37342f 100%);color:#f2ede3;">
                <p style="margin:0;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#c6b18a;font-weight:700;">RASA Strategic Inquiry</p>
                <h1 style="margin:10px 0 0;font-size:26px;line-height:1.2;font-weight:800;letter-spacing:0.01em;">New Contact Brief Submission</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:26px 28px 8px;">
                <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#403e37;">
                  A new inquiry has been received through the RASA contact form. The details are included below for immediate review.
                </p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#fffdfa;border:1px solid #ddd8cc;">
                  <tr>
                    <td style="width:210px;padding:12px 14px;background:#f1ece3;border-bottom:1px solid #ddd8cc;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;font-weight:700;color:#665f52;">Name</td>
                    <td style="padding:12px 14px;border-bottom:1px solid #ddd8cc;font-size:14px;color:#2f2d28;">${escapeHtml(payload.name)}</td>
                  </tr>
                  <tr>
                    <td style="width:210px;padding:12px 14px;background:#f1ece3;border-bottom:1px solid #ddd8cc;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;font-weight:700;color:#665f52;">Business Name</td>
                    <td style="padding:12px 14px;border-bottom:1px solid #ddd8cc;font-size:14px;color:#2f2d28;">${escapeHtml(payload.businessName)}</td>
                  </tr>
                  <tr>
                    <td style="width:210px;padding:12px 14px;background:#f1ece3;border-bottom:1px solid #ddd8cc;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;font-weight:700;color:#665f52;">Corporate Email</td>
                    <td style="padding:12px 14px;border-bottom:1px solid #ddd8cc;font-size:14px;color:#2f2d28;">
                      <a href="mailto:${escapeHtml(payload.corporateEmail)}" style="color:#2d5f76;text-decoration:none;font-weight:600;">${escapeHtml(payload.corporateEmail)}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="width:210px;padding:12px 14px;background:#f1ece3;border-bottom:1px solid #ddd8cc;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;font-weight:700;color:#665f52;">Phone Number</td>
                    <td style="padding:12px 14px;border-bottom:1px solid #ddd8cc;font-size:14px;color:#2f2d28;">${escapeHtml(payload.phoneNumber)}</td>
                  </tr>
                  <tr>
                    <td style="width:210px;padding:12px 14px;background:#f1ece3;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;font-weight:700;color:#665f52;vertical-align:top;">Inquiry Details</td>
                    <td style="padding:12px 14px;font-size:14px;line-height:1.7;color:#2f2d28;">${withLineBreaks(payload.inquiryDetails)}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 28px 26px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;background:#f5f2ea;border:1px solid #ddd8cc;">
                  <tr>
                    <td style="padding:10px 12px;border-bottom:1px solid #ddd8cc;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;font-weight:700;color:#6d6558;">Submitted At (UTC)</td>
                    <td style="padding:10px 12px;border-bottom:1px solid #ddd8cc;font-size:12px;color:#3d3a34;">${escapeHtml(payload.submittedAtIso)}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 12px;border-bottom:1px solid #ddd8cc;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;font-weight:700;color:#6d6558;">Source</td>
                    <td style="padding:10px 12px;border-bottom:1px solid #ddd8cc;font-size:12px;color:#3d3a34;">${escapeHtml(payload.requestOrigin)}${escapeHtml(payload.requestPath)}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 12px;border-bottom:1px solid #ddd8cc;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;font-weight:700;color:#6d6558;">Requester IP</td>
                    <td style="padding:10px 12px;border-bottom:1px solid #ddd8cc;font-size:12px;color:#3d3a34;">${escapeHtml(payload.ipAddress)}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 12px;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;font-weight:700;color:#6d6558;">User Agent</td>
                    <td style="padding:10px 12px;font-size:12px;color:#3d3a34;word-break:break-word;">${escapeHtml(payload.userAgent)}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px 22px;background:#ece8de;border-top:1px solid #d8d2c7;">
                <p style="margin:0;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#746b5d;font-weight:700;">RASA Contact Pipeline</p>
                <p style="margin:6px 0 0;font-size:12px;line-height:1.6;color:#5c564b;">This message was generated from the Contact Brief Form and delivered via authenticated Gmail SMTP.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildContactBriefText(payload: ContactBriefMailPayload): string {
  return [
    "RASA Strategic Inquiry - New Contact Brief",
    "",
    `Name: ${payload.name}`,
    `Business Name: ${payload.businessName}`,
    `Corporate Email: ${payload.corporateEmail}`,
    `Phone Number: ${payload.phoneNumber}`,
    "",
    "Inquiry Details:",
    payload.inquiryDetails,
    "",
    "Request Metadata:",
    `Submitted At (UTC): ${payload.submittedAtIso}`,
    `Source: ${payload.requestOrigin}${payload.requestPath}`,
    `Requester IP: ${payload.ipAddress}`,
    `User Agent: ${payload.userAgent}`,
  ].join("\n");
}

export async function sendContactBriefEmail(payload: ContactBriefMailPayload) {
  const settings = readSettings();
  const transporter = await getTransporter(settings);
  const subject = `[RASA Strategy Brief] ${payload.businessName} - ${payload.name}`;
  const text = buildContactBriefText(payload);

  let html: string | undefined;
  try {
    html = buildContactBriefHtml(payload);
  } catch (error) {
    console.error("Failed to build HTML mail template. Falling back to plain text.", error);
    html = undefined;
  }

  return transporter.sendMail({
    from: settings.from,
    to: settings.to,
    replyTo: payload.corporateEmail,
    subject,
    text,
    ...(html ? { html } : {}),
  });
}
