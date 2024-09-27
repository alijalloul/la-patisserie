"use client";

import React, { FormEvent, useState } from "react";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

const StripeCheckout = ({ clientSecret }: { clientSecret: string }) => {
  return (
    <Elements options={{ clientSecret }} stripe={stripePromise}>
      <Form />
    </Elements>
  );
};

export default StripeCheckout;

const Form = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (stripe == null || elements == null) return;
    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`,
        },
      })
      .then(({ error }) => {
        if (error.type === "card_error" || error.type === "validation_error") {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Unkown error occured");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      <PaymentElement />
      <Button
        onClick={(e) => handleSubmit(e)}
        disabled={isLoading || !stripe || !elements}
        size="lg"
        className="bg-[#0570de] hover:bg-[#2893ff] w-full"
      >
        {isLoading ? "Purchasing..." : "Purchase"}
      </Button>

      {errorMessage && <p className=" text-destructive">{errorMessage}</p>}
    </>
  );
};
