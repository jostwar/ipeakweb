import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

const isValidEmail = (email: string) => email.includes("@");

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload;

  if (
    !body?.name ||
    body.name.trim().length < 2 ||
    !body.email ||
    !isValidEmail(body.email) ||
    !body.message ||
    body.message.trim().length < 10
  ) {
    return NextResponse.json(
      { error: "Completa los campos requeridos con información válida." },
      { status: 400 },
    );
  }

  const payload = {
    name: body.name.trim(),
    email: body.email.trim(),
    company: body.company?.trim() || "No especificada",
    message: body.message.trim(),
  };

  const resendKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM_EMAIL;
  const resendTo = process.env.CONTACT_TO_EMAIL;

  if (resendKey && resendFrom && resendTo) {
    const { Resend } = await import("resend");
    const resend = new Resend(resendKey);
    await resend.emails.send({
      from: resendFrom,
      to: resendTo,
      subject: `Nuevo lead iPeak: ${payload.name}`,
      html: `
        <h2>Nuevo lead</h2>
        <p><strong>Nombre:</strong> ${payload.name}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Empresa:</strong> ${payload.company}</p>
        <p><strong>Mensaje:</strong> ${payload.message}</p>
      `,
    });
  } else {
    console.log("Nuevo lead (demo):", payload);
  }

  return NextResponse.json({ ok: true });
}
