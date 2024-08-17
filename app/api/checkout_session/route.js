import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const formatAmountForStripe = (amount) => {
  return Math.round(amount * 100); // Convert to smallest currency unit (cents for USD)
};

export async function GET(req) {
  const searchparams = req.nextUrl.searchParams;
  const session_id = searchparams.get("session_id");

  try {
    // Retrieve the Stripe Checkout session
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
    return NextResponse.json(checkoutSession);
  } catch (error) {
    console.error("Error retrieving checkout session", error);
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { plan } = await req.json(); // Expecting a 'plan' to be sent from the frontend

    // Define different pricing options
    let priceData;
    switch (plan) {
      case "annual":
        priceData = {
          currency: "usd",
          product_data: {
            name: "Pro Annual Subscription",
          },
          unit_amount: formatAmountForStripe(3.99), // $3.99 per month, billed annually
          recurring: {
            interval: "year",
            interval_count: 1,
          },
        };
        break;

      case "monthly":
        priceData = {
          currency: "usd",
          product_data: {
            name: "Pro Monthly Subscription",
          },
          unit_amount: formatAmountForStripe(8.99), // $8.99 per month
          recurring: {
            interval: "month",
            interval_count: 1,
          },
        };
        break;

      default:
        throw new Error("Invalid plan selected");
    }

    // Create the Stripe Checkout session
    const params = {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: priceData,
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get(
      "origin"
    )}/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.get(
      "origin"
    )}/result?session_id={CHECKOUT_SESSION_ID}`,
  };

    const checkoutSession = await stripe.checkout.sessions.create(params);

    return NextResponse.json(checkoutSession, {
      status: 200,
    });
  } catch (error) {
    console.error("Error creating Stripe Checkout session", error);
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 500 }
    );
  }
}
