import { Item } from "@/app/types/dataTypes";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface StripeProduct {
  id: string;
  name: string;
  active: boolean;
}

async function getActiveProducts() {
  const stripeProducts = await stripe.products.list();
  const activeProducts = stripeProducts.data.filter(
    (item: StripeProduct) => item.active === true,
  );
  return activeProducts;
}

export async function POST(request: NextRequest) {
  try {
    const { products, userId } = await request.json();
    const checkoutProducts: Item[] = products;
    const activeProducts = await getActiveProducts();

    const checkoutStripeProducts: Stripe.Checkout.SessionCreateParams.LineItem[] =
      []; // Type défini ici

    for (const product of checkoutProducts) {
      const stripeProduct = activeProducts.find(
        (stripeProduct: StripeProduct) =>
          stripeProduct.name.toLowerCase() === product.title.toLowerCase(),
      );

      if (stripeProduct) {
        if (
          product.tempQuantity &&
          product.tempQuantity <= (product.stock ?? 0)
        ) {
          // Vérifier si default_price est défini et est une chaîne
          if (typeof stripeProduct.default_price === "string") {
            checkoutStripeProducts.push({
              price: stripeProduct.default_price, // On passe l'ID du prix
              quantity: product.tempQuantity,
            });
          } else {
            console.error(`Prix non défini pour : ${product.title}`);
            return NextResponse.json(
              {
                error: `Prix non défini pour ${product.title}`,
              },
              { status: 400 },
            );
          }
        } else {
          console.log(`Stock insuffisant pour : ${product.title}`);
          return NextResponse.json(
            {
              error: `Stock insuffisant pour ${product.title}`,
            },
            { status: 400 },
          );
        }
      } else {
        // Créer le produit s'il n'existe pas
        const unitAmount = Math.round((product.price || 0) * 100);
        const prod = await stripe.products.create({
          name: product.title,
          default_price_data: {
            unit_amount: unitAmount,
            currency: "eur",
          },
          images: [product.imageUrls[0]],
        });

        // Assurez-vous que prod.default_price est une chaîne
        if (typeof prod.default_price === "string") {
          checkoutStripeProducts.push({
            price: prod.default_price, // On passe l'ID du prix
            quantity: product.tempQuantity,
          });
        } else {
          console.error(
            `Prix non défini pour le produit créé : ${product.title}`,
          );
          return NextResponse.json(
            {
              error: `Erreur lors de la création du produit : ${product.title}`,
            },
            { status: 500 },
          );
        }
      }
    }

    // Création de la session de paiement
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const productIds = products.map((product: Item) => product.id);
    const quantity = products.map((product: Item) => product.tempQuantity);
    console.log("Quantité:", quantity);
    console.log("Product IDs:", productIds);

    const session = await stripe.checkout.sessions.create({
      line_items: checkoutStripeProducts,
      mode: "payment",
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel?session_id={CHECKOUT_SESSION_ID}`,
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["FR"],
      },
      metadata: {
        product_id: JSON.stringify(productIds),
        user_id: userId,
        quantity: JSON.stringify(quantity),
      },
    });

    console.log("Metadata sent:", {
      product_ids: JSON.stringify(productIds),
      user_id: userId,
      quantity: JSON.stringify(quantity),
    });

    // Retourner l'URL pour rediriger l'utilisateur vers Stripe Checkout
    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error("Erreur lors de la création de la session :", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la session" },
      { status: 500 },
    );
  }
}
