import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Session ID manquant" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      return NextResponse.json({ success: true, message: "Paiement réussi" });
    } else {
      return res
        .status(200)
        .json({ success: false, error: "Payment not completed" });
    }
  } catch (err) {
    console.error("Erreur lors de la récupération de la session:", err);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de la session Stripe" },
      { status: 500 },
    );
  }
}
