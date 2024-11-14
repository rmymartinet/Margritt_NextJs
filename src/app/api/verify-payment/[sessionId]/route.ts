import prisma from "@/lib/prisma";
import { upsertUser } from "@/lib/users";
import { CustomerAddress } from "@/types/dataTypes";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface Params {
  sessionId: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  const { sessionId } = params;

  console.log("Session ID:", sessionId);

  if (!sessionId) {
    return NextResponse.json(
      { error: "Session ID is required" },
      { status: 400 },
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paymentStatus = session.payment_status;

    if (paymentStatus !== "paid") {
      return NextResponse.json({
        success: false,
        message: "Payment not completed",
      });
    }

    // Récupérer les détails du client et de l'adresse
    const customerEmail = session.customer_details?.email;
    const customerAddress: CustomerAddress =
      session.customer_details?.address || {};

    if (!customerEmail) {
      return NextResponse.json(
        { error: "Customer email is required" },
        { status: 400 },
      );
    }

    // Vérifier et parser les métadonnées des produits
    const productIds = session.metadata?.product_id
      ? JSON.parse(session.metadata.product_id)
      : [];
    const quantities = session.metadata?.quantity
      ? JSON.parse(session.metadata.quantity)
      : [];

    await updateStockAndRecordPurchase(
      productIds,
      quantities,
      customerEmail,
      customerAddress,
    );

    const user = await prisma.user.findUnique({
      where: { email: customerEmail },
    });

    // Si l'utilisateur existe déjà, ne le mettez pas à jour
    if (user) {
      const updatedUser = await upsertUser({
        email: customerEmail,
        addressLine1: customerAddress.line1 ?? "",
        addressLine2: customerAddress.line2 ?? "",
        addressCity: customerAddress.city ?? "",
        addressState: customerAddress.state ?? "",
        addressPostalCode: customerAddress.postal_code ?? "",
        addressCountry: customerAddress.country ?? "",
      });

      return NextResponse.json({
        success: true,
        message: "Utilisateur trouvé",
        user: {
          email: updatedUser.email,
          addressLine1: updatedUser.addressLine1,
          addressLine2: updatedUser.addressLine2,
          addressCity: updatedUser.addressCity,
          addressState: updatedUser.addressState,
          addressPostalCode: updatedUser.addressPostalCode,
          addressCountry: updatedUser.addressCountry,
        },
      });
    }

    // Si l'utilisateur n'est pas trouvé, retourner une réponse sans erreur
    return NextResponse.json({
      success: true,
      message: "Utilisateur non trouvé, mode invité",
    });
  } catch (error) {
    console.error("Error processing the request:", error);
    return NextResponse.json(
      { error: "Error processing the request" },
      { status: 500 },
    );
  }
}

async function updateStockAndRecordPurchase(
  productIds: string[],
  quantities: number[],
  userEmail: string,
  customerAddress: CustomerAddress,
) {
  // Mise à jour du stock et enregistrement de l'achat
  for (let i = 0; i < productIds.length; i++) {
    const productId = productIds[i];
    const quantity = quantities[i];

    if (typeof quantity !== "number" || quantity <= 0) {
      continue; // Ignore les quantités invalides
    }

    // Mettre à jour le stock
    await prisma.prints.update({
      where: { id: productId },
      data: {
        stock: {
          decrement: quantity,
        },
      },
    });

    // Obtenir le prix du produit
    const product = await prisma.prints.findUnique({
      where: { id: productId },
    });

    if (product && product.price !== undefined) {
      // Enregistrer l'achat dans l'historique
      await prisma.purchase.create({
        data: {
          printsId: productId,
          quantity: quantity,
          totalPrice: product.price * quantity,
          email: userEmail,
          addressLine1: customerAddress.line1 ?? "",
          addressLine2: customerAddress.line2 ?? "",
          addressCity: customerAddress.city ?? "",
          addressState: customerAddress.state ?? "",
          addressPostalCode: customerAddress.postal_code ?? "",
          addressCountry: customerAddress.country ?? "",
        },
      });
    }
  }
}
