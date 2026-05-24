import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidPayload(payload: unknown): payload is ContactPayload {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  const { name, email, message } = payload as Record<string, unknown>;

  return (
    typeof name === "string" &&
    typeof email === "string" &&
    typeof message === "string" &&
    name.trim().length >= 2 &&
    name.trim().length <= 100 &&
    EMAIL_REGEX.test(email.trim()) &&
    message.trim().length >= 10 &&
    message.trim().length <= 3000
  );
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function sendTelegramNotification(
  token: string,
  chatId: string,
  payload: ContactPayload,
  receivedAt: string,
) {
  const telegramText = [
    "Nouveau message depuis le portfolio",
    "",
    `Nom: ${payload.name}`,
    `Email: ${payload.email}`,
    `Date: ${receivedAt}`,
    "",
    `Message:\n${payload.message}`,
  ].join("\n");

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: telegramText,
    }),
  });

  if (!response.ok) {
    throw new Error("Telegram notification failed");
  }
}

async function sendGmailMessage(
  gmailUser: string,
  gmailAppPassword: string,
  toEmail: string,
  payload: ContactPayload,
  receivedAt: string,
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safeMessage = escapeHtml(payload.message).replace(/\n/g, "<br />");

  await transporter.sendMail({
    from: `Portfolio Contact <${gmailUser}>`,
    to: toEmail,
    replyTo: payload.email,
    subject: `Nouveau message portfolio - ${payload.name}`,
    text: [
      "Nouveau message depuis le portfolio",
      `Nom: ${payload.name}`,
      `Email: ${payload.email}`,
      `Date: ${receivedAt}`,
      "",
      payload.message,
    ].join("\n"),
    html: `
      <h2>Nouveau message depuis le portfolio</h2>
      <p><strong>Nom:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Date:</strong> ${escapeHtml(receivedAt)}</p>
      <hr />
      <p>${safeMessage}</p>
    `,
  });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    if (!isValidPayload(payload)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const toEmail = process.env.CONTACT_TO_EMAIL;
    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (!toEmail || !gmailUser || !gmailAppPassword) {
      return NextResponse.json({ error: "Missing environment variables" }, { status: 500 });
    }

    const contactPayload: ContactPayload = {
      name: payload.name.trim(),
      email: payload.email.trim(),
      message: payload.message.trim(),
    };

    const receivedAt = new Date().toISOString();

    await sendGmailMessage(gmailUser, gmailAppPassword, toEmail, contactPayload, receivedAt);

    if (telegramToken && telegramChatId) {
      try {
        await sendTelegramNotification(telegramToken, telegramChatId, contactPayload, receivedAt);
      } catch {
        // Do not fail the request when Telegram is unavailable.
      }
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Unable to process contact request" }, { status: 500 });
  }
}
