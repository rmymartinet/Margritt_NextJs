import prisma from "@/lib/prisma";
import { CustomerAddress } from "@/types/dataTypes";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

const WEBHOOK_SECRET = process.env.NEXT_STRIPE_WEBHOOK_SECRET!;

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
      if (process.env.NODE_ENV === "development") {
        console.log(`Invalid quantity for product ${productId}: ${quantity}`);
      }
      continue; // Ignore les quantités invalides
    }
    try {
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
        console.log(
          `Purchase recorded for product ${productId}, quantity ${quantity}`,
        );
      } else {
        console.log(
          `Product not found or price undefined for product ${productId}`,
        );
      }
    } catch (error) {
      console.error(
        `Error updating stock or recording purchase for product ${productId}:`,
        error,
      );
    }
  }
}

export async function POST(req: Request) {
  const body = await req.text();

  const sig = req.headers.get("stripe-signature")!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Webhook signature verification failed.", err.message);
    } else {
      console.error("Webhook signature verification failed.", err);
    }
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : "Unknown error"}`,
      { status: 400 },
    );
  }

  // Handle the event
  try {
    switch (event.type) {
      case "checkout.session.completed":
        const session = await stripe.checkout.sessions.retrieve(
          (event.data.object as Stripe.Checkout.Session).id,
          {
            expand: ["line_items"],
          },
        );
        const customerDetails = session.customer_details;

        if (customerDetails?.email) {
          // Vérifier et parser les métadonnées des produits
          const productIds = session.metadata?.product_id
            ? JSON.parse(session.metadata.product_id)
            : [];
          const quantities = session.metadata?.quantity
            ? JSON.parse(session.metadata.quantity)
            : [];

          const customerEmail = customerDetails?.email;
          const customerAddress: CustomerAddress =
            session.customer_details?.address || {};

          await updateStockAndRecordPurchase(
            productIds,
            quantities,
            customerEmail,
            customerAddress,
          );

          const user = await prisma.user.findUnique({
            where: { email: customerDetails.email },
          });

          if (!user) {
            await prisma.user.create({
              data: {
                email: customerDetails.email,
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
        break;

      default:
        if (process.env.NODE_ENV === "development") {
          console.log(`Unhandled event type ${event.type}`);
        }
    }
  } catch (error) {
    console.error("Error handling event", error);
    return new Response("Webhook Error", { status: 400 });
  }

  return new Response("Webhook received", { status: 200 });
}
