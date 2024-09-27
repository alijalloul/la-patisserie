import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const data = await req.json();

    const { totalProductsPriceInCents, productsIdQuantity } = data;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 50,
      currency: "usd",
      metadata: {
        total: totalProductsPriceInCents,
        products: JSON.stringify(productsIdQuantity),
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
