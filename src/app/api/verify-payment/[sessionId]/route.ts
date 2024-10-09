import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET(request: Request, { params }) {
  const { sessionId } = params; // Assurez-vous que cela récupère bien l'ID de session

  if (!sessionId) {
    return NextResponse.json(
      { error: "Session ID is required" },
      { status: 400 },
    );
  }

  try {
    // Récupérer la session de paiement de Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Vérifier si le paiement est réussi
    const paymentStatus = session.payment_status;

    if (paymentStatus === "paid") {
      // Mettre à jour la base de données pour marquer la commande comme payée

      const userId = session.metadata.user_id;
      const productIds = JSON.parse(session.metadata.product_id);
      const quantities = JSON.parse(session.metadata.quantity); // Assurez-vous que c'est un tableau

      console.log("Product IDs:", productIds);
      console.log("User ID:", userId);
      console.log("Quantités:", quantities);

      // Appel de la fonction pour mettre à jour le stock et enregistrer l'achat
      await updateStockAndRecordPurchase(userId, productIds, quantities);
      console.log("Stock mis à jour et achat enregistré");
    }

    return NextResponse.json({ success: true, paymentStatus });
  } catch (error) {
    console.error("Error retrieving session:", error);
    return NextResponse.json(
      { error: "Error retrieving session" },
      { status: 500 },
    );
  }
}

async function updateStockAndRecordPurchase(userId, productIds, quantities) {
  for (let i = 0; i < productIds.length; i++) {
    const productId = productIds[i];
    const quantity = quantities[i];

    // Vérifiez que quantity est un nombre valide
    if (typeof quantity !== "number" || quantity <= 0) {
      console.error(
        `Quantité invalide pour le produit ${productId}: ${quantity}`,
      );
      continue; // Ignorez cet itération si la quantité est invalide
    }

    // Mettre à jour le stock
    await prisma.originals.update({
      where: { id: productId },
      data: {
        stock: {
          decrement: quantity, // Décrémentez le stock
        },
      },
    });

    // Obtenir le prix du produit
    const product = await prisma.originals.findUnique({
      where: { id: productId },
    });

    console.log("Produit trouvé:", product.id);

    try {
      if (product) {
        // Vérification de l'existence du prix
        if (product.price === undefined) {
          throw new Error("Le prix du produit n'est pas défini.");
        }

        // Enregistrer l'achat de l'utilisateur (historique)
        await prisma.purchase.create({
          data: {
            clerkId: userId,
            originalId: productId,
            quantity: quantity,
            totalPrice: product.price * quantity,
          },
        });
      } else {
        console.error(`Produit non trouvé pour l'ID: ${productId}`);
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'achat:", error);
    }
  }
}
