"use client";

import { addProduct } from "@/app/store/cartSlice";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Product } from "@prisma/client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const AddCartButton = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
  const { toast, dismiss } = useToast();
  var toastId = "";

  return (
    <Button
      onClick={() => {
        toastId = toast({
          description: "Item Added",
        }).id;

        setTimeout(() => {
          dismiss(toastId);
        }, 1000);

        dispatch(addProduct(product));
      }}
      size="lg"
      className="w-[40%]"
    >
      Add Cart
    </Button>
  );
};

export default AddCartButton;
