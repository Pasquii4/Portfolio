import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const CONTACT_TO = process.env.CONTACT_TO_EMAIL ?? "pascualpau04@gmail.com";

const MAX_NAME = 200;
const MAX_EMAIL = 320;
const MAX_MESSAGE = 8000;

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type ContactBody = { name?: unknown; email?: unknown; message?: unknown };

async function sendViaResend(params: {
  email: string;
  subject: string;
  html: string;
}): Promise<{ ok: true } | { ok: false; status: number }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, status: 500 };

  const from =
    process.env.CONTACT_FROM_EMAIL ??
    process.env.RESEND_FROM ??
    "Portfolio <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [CONTACT_TO],
      reply_to: params.email,
      subject: params.subject,
      html: params.html,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("[contact] Resend error", res.status, body);
    return { ok: false, status: 502 };
  }
  return { ok: true };
}

async function sendViaSmtp(params: {
  email: string;
  subject: string;
  html: string;
}): Promise<{ ok: true } | { ok: false; status: number }> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return { ok: false, status: 500 };

  const port = Number(process.env.SMTP_PORT ?? "587");
  const secure = process.env.SMTP_SECURE === "true";
  const from = process.env.SMTP_FROM ?? user;

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });
    await transporter.sendMail({
      from,
      to: CONTACT_TO,
      replyTo: params.email,
      subject: params.subject,
      html: params.html,
    });
    return { ok: true };
  } catch (e) {
    console.error("[contact] SMTP error", e);
    return { ok: false, status: 502 };
  }
}

export async function POST(request: Request) {
  let json: ContactBody;
  try {
    json = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const name = typeof json.name === "string" ? json.name.trim() : "";
  const email = typeof json.email === "string" ? json.email.trim() : "";
  const message = typeof json.message === "string" ? json.message.trim() : "";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  if (name.length > MAX_NAME || email.length > MAX_EMAIL || message.length > MAX_MESSAGE) {
    return NextResponse.json({ error: "too_long" }, { status: 400 });
  }

  const hasResend = Boolean(process.env.RESEND_API_KEY);
  const hasSmtp = Boolean(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
  );

  if (!hasResend && !hasSmtp) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const subject = `[Portfolio] ${name}`;
  const html = `
    <p><strong>Nombre / Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${escapeHtml(message).replace(/\r?\n/g, "<br/>")}</p>
  `;

  if (hasResend) {
    const result = await sendViaResend({ email, subject, html });
    if (!result.ok) {
      return NextResponse.json({ error: "send_failed" }, { status: result.status });
    }
    return NextResponse.json({ ok: true, message: "sent" });
  }

  const smtpResult = await sendViaSmtp({ email, subject, html });
  if (!smtpResult.ok) {
    return NextResponse.json({ error: "send_failed" }, { status: smtpResult.status });
  }
  return NextResponse.json({ ok: true, message: "sent" });
}
