"use client";

import { addProduct } from "@/app/store/cartSlice";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Product } from "@prisma/client";
import { useDispatch } from "react-redux";

const AddCartButton = ({
  product,
  quantity = 1,
}: {
  product: Product;
  quantity?: number;
}) => {
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

        dispatch(addProduct({ ...product, quantity: quantity }));
      }}
      size="lg"
      className="w-[40%]"
    >
      Add Cart
    </Button>
  );
};

export default AddCartButton;
