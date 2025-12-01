export const runtime = "nodejs";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message, honey } = await req.json();

    // HONEYPOT (bot protection)
    if (honey && honey.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    // ZÁKLADNÍ VALIDACE
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { ok: false, error: "Chybí povinná pole." },
        { status: 400 }
      );
    }

    // BRAND KONSTANTY – KDYKOLIV SI UPRAV
    const BRAND_NAME = "Jiří Veselý – Web Portfolio";
    const BRAND_URL = "https://jirkawebok.vercel.app";
    const BRAND_PRIMARY = "#4f46e5"; // indigo
    const BRAND_MUTED = "#6b7280"; // tailwind slate-500
    const BRAND_BORDER = "#e5e7eb"; // slate-200
    const BRAND_BG = "#f9fafb"; // slate-50
    const LOGO_URL = "https://jirkawebok.vercel.app/logo.png"; // uprav na reálné logo
    const TRACKING_PIXEL_URL = "https://jirkawebok.vercel.app/api/email-open-pixel"; 
    // (můžeš si někdy dodělat endpoint, nebo to nechat tak – email klient se ho i tak pokusí načíst)

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // TEXTOVÁ VERZE (fallback)
    const plainTextForYou = `
Nová zpráva z portfolia

Jméno: ${name}
E-mail: ${email}
Předmět: ${subject}

Zpráva:
${message}

Odesláno přes ${BRAND_NAME} (${BRAND_URL})
`;

    const plainTextForSender = `
Ahoj ${name},

díky za tvoji zprávu! Tady je její kopie:

Předmět: ${subject}

Zpráva:
${message}

Ozvu se ti co nejdříve.

— Jirka Veselý
${BRAND_URL}
`;

    /* ─────────────────────────────────────────────────────────
       1) EMAIL PRO TEBE (ADMIN) – Apple / Notion styl
    ───────────────────────────────────────────────────────── */
    await transporter.sendMail({
      from: `"Web Portfolio" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `📨 Nová zpráva – ${subject} (${name})`,
      text: plainTextForYou,
      html: `
  <div style="background:${BRAND_BG}; padding:24px 0; font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <div style="max-width:640px;margin:0 auto;padding:0 16px;">
      
      <div style="text-align:center;margin-bottom:18px;">
        <a href="${BRAND_URL}" style="text-decoration:none;color:${BRAND_PRIMARY};font-weight:600;font-size:14px;">
          ${LOGO_URL ? `<img src="${LOGO_URL}" alt="${BRAND_NAME}" style="max-height:40px;margin-bottom:8px;" />` : ""}
          ${BRAND_NAME}
        </a>
      </div>

      <div style="background:#ffffff;border:1px solid ${BRAND_BORDER};border-radius:16px;padding:24px 22px 20px;">
        <h2 style="margin:0 0 8px;font-size:20px;color:#111827;font-weight:700;">
          Nová zpráva z portfolia
        </h2>
        <p style="margin:0 0 16px;font-size:13px;color:${BRAND_MUTED};">
          Někdo ti právě napsal z kontaktního formuláře.
        </p>

        <div style="margin-bottom:16px;padding:10px 12px;border-radius:12px;background:#f3f4f6;">
          <p style="margin:0;font-size:14px;">
            <strong>Jméno:</strong> ${name}<br/>
            <strong>E-mail:</strong> ${email}<br/>
            <strong>Předmět:</strong> ${subject}
          </p>
        </div>

        <div style="margin-top:12px;">
          <p style="margin:0 0 6px;font-size:13px;color:${BRAND_MUTED};">Zpráva:</p>
          <div style="border-radius:12px;border:1px solid ${BRAND_BORDER};padding:12px 14px;font-size:14px;line-height:1.6;white-space:pre-line;color:#111827;">
            ${message}
          </div>
        </div>

        <p style="margin-top:18px;font-size:11px;color:${BRAND_MUTED};">
          Tento e-mail byl vygenerován automaticky z <a href="${BRAND_URL}" style="color:${BRAND_PRIMARY};text-decoration:none;">${BRAND_URL}</a>.
        </p>
      </div>

      <div style="text-align:center;margin-top:10px;">
        <p style="margin:0;font-size:11px;color:${BRAND_MUTED};">
          ${BRAND_NAME}
        </p>
      </div>
    </div>

    <!-- Jednoduchý tracking pixel -->
    <img src="${TRACKING_PIXEL_URL}" alt="" width="1" height="1" style="display:block;opacity:0;" />
  </div>
      `,
    });

    /* ─────────────────────────────────────────────────────────
       2) KOPIE PRO ODESILATELE – čistý, přátelský styl
    ───────────────────────────────────────────────────────── */
    await transporter.sendMail({
      from: `"Web Portfolio" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `📨 Kopie zprávy – ${subject}`,
      text: plainTextForSender,
      html: `
  <div style="background:${BRAND_BG}; padding:24px 0; font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <div style="max-width:640px;margin:0 auto;padding:0 16px;">

      <div style="text-align:center;margin-bottom:18px;">
        <a href="${BRAND_URL}" style="text-decoration:none;color:${BRAND_PRIMARY};font-weight:600;font-size:14px;">
          ${LOGO_URL ? `<img src="${LOGO_URL}" alt="${BRAND_NAME}" style="max-height:40px;margin-bottom:8px;" />` : ""}
          ${BRAND_NAME}
        </a>
      </div>

      <div style="background:#ffffff;border:1px solid ${BRAND_BORDER};border-radius:16px;padding:24px 22px 20px;">
        <h2 style="margin:0 0 8px;font-size:20px;color:#111827;font-weight:700;">
          Díky za zprávu, ${name}! 🙌
        </h2>
        <p style="margin:0 0 16px;font-size:14px;color:${BRAND_MUTED};">
          Potvrzuji přijetí tvé zprávy. Brzy se ti ozvu zpět.
        </p>

        <p style="margin:0 0 6px;font-size:13px;color:${BRAND_MUTED};">
          <strong>Předmět:</strong> ${subject}
        </p>

        <div style="margin-top:8px;border-radius:12px;border:1px solid ${BRAND_BORDER};padding:12px 14px;font-size:14px;line-height:1.6;white-space:pre-line;color:#111827;">
          ${message}
        </div>

        <p style="margin-top:18px;font-size:13px;color:${BRAND_MUTED};">
          — S pozdravem,<br/>
          <strong>Jiří Veselý</strong><br/>
          <a href="${BRAND_URL}" style="color:${BRAND_PRIMARY};text-decoration:none;">${BRAND_URL}</a>
        </p>
      </div>

      <div style="text-align:center;margin-top:10px;">
        <p style="margin:0;font-size:11px;color:${BRAND_MUTED};">
          Tento e-mail byl odeslán automaticky z kontaktního formuláře.
        </p>
      </div>
    </div>

    <!-- jednoduchý tracking pixel i tady (volitelné) -->
    <img src="${TRACKING_PIXEL_URL}" alt="" width="1" height="1" style="display:block;opacity:0;" />
  </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    return NextResponse.json(
      { ok: false, error: "Email se nepodařilo odeslat." },
      { status: 500 }
    );
  }
}
