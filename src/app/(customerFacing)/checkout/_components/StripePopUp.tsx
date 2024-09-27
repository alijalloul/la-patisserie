"use client";

import React, { useEffect, useState } from "react";
import StripeCheckout from "./StripeCheckout";
import { RootState } from "@/app/store/store";
import { selectTotalProductsPriceInCents } from "@/app/store/selectors";
import { useSelector } from "react-redux";

const StripePopUp = () => {
  const [clientSecret, setClientSecret] = useState(null);

  const totalProductsPriceInCents = useSelector(
    selectTotalProductsPriceInCents
  );
  const productsIdQuantity = useSelector(
    (state: RootState) => state.cart.cart
  ).map((item) => ({
    id: item.id,
    quantity: item.quantity,
  }));

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            totalProductsPriceInCents: totalProductsPriceInCents,
            productsIdQuantity: productsIdQuantity,
          }),
        });

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };

    fetchPaymentIntent();
  }, []);

  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  return <StripeCheckout clientSecret={clientSecret} />;
};

export default StripePopUp;
