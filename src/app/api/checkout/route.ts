import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

type CheckoutPayload = {
  plan: "starter" | "growth" | "scale";
};

const getPriceId = (plan: CheckoutPayload["plan"]) => {
  if (plan === "starter") return process.env.STRIPE_PRICE_STARTER;
  if (plan === "growth") return process.env.STRIPE_PRICE_GROWTH;
  return process.env.STRIPE_PRICE_SCALE;
};

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "Stripe no está configurado." },
      { status: 500 },
    );
  }

  const body = (await request.json()) as CheckoutPayload;
  if (!body?.plan) {
    return NextResponse.json(
      { error: "Selecciona un plan válido." },
      { status: 400 },
    );
  }

  const priceId = getPriceId(body.plan);
  if (!priceId) {
    return NextResponse.json(
      { error: "Precio no configurado para el plan seleccionado." },
      { status: 500 },
    );
  }

  const stripe = new Stripe(secretKey, {
    apiVersion: "2026-01-28.clover",
  });

  const origin = request.headers.get("origin") || "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/gracias?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?canceled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "No se pudo crear la sesión de pago." },
      { status: 500 },
    );
  }
}
