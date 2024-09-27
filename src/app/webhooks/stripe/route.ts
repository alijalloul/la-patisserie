import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

console.log("fdsfssfegge");

export async function POST(req: NextRequest) {
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature") as string,
    process.env.STRIPE_WEBHOOK_SECRET as string
  );

  if (event.type === "charge.succeeded") {
    const charge = event.data.object;

    await db.order.create({
      data: {
        userId: "test",
        pricePaidInCents: parseInt(charge.metadata.total),
        productsIdQuantity: charge.metadata.products,
      },
    });
  }

  return new NextResponse();
}
