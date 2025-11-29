export const runtime = "nodejs";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message, honey } = await req.json();

    // BOT ochrana – pokud je honey vyplněné → neodesílat
    if (honey && honey.trim() !== "") {
      return NextResponse.json({ ok: true }); 
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Web Portfolio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `Nová zpráva od ${name}`,
      html: `
        <h2>Nová zpráva z portfolia</h2>
        <p><strong>Jméno:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Zpráva:</strong><br/>${message}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return NextResponse.json({ ok: false, error: "Email se nepodařilo odeslat" }, { status: 500 });
  }
}
