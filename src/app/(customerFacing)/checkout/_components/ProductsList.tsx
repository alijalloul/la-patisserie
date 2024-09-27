"use client";

import { addProduct, decrementProduct } from "@/app/store/cartSlice";
import {
  selectTotalProducts,
  selectTotalProductsPriceInCents,
} from "@/app/store/selectors";
import { RootState } from "@/app/store/store";
import { CartItemType } from "@/app/store/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductsList = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const totalProducts = useSelector(selectTotalProducts);

  const totalProductsPirceInCents = useSelector(
    selectTotalProductsPriceInCents
  );

  return (
    <div className="flex justify-between items-center h-[80vh] w-full">
      <Card className="w-[40%] h-full">
        <CardHeader>
          <CardTitle>Shopping Cart</CardTitle>
        </CardHeader>

        <CardContent className="w-full flex flex-col min-sm:max-w-sm flex-grow max-h-[70vh]">
          {cartItems.length > 0 ? (
            <div className="w-full flex flex-col flex-grow justify-center overflow-auto">
              <div className="pr-10 flex flex-col flex-grow overflow-y-auto scrollbar-thin scrollbar-corner-rounded-md">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              <div className="font-bold text-xl flex flex-col">
                <p className="mb-4">{`Total: $${(
                  totalProductsPirceInCents / 100
                ).toLocaleString()}`}</p>
              </div>
            </div>
          ) : (
            <p>No items</p>
          )}
        </CardContent>
      </Card>

      <Card className="flex flex-col w-[55%] space-y-5 bg-slate-100 rounded-lg h-full p-16">
        <CardTitle>Order Summary</CardTitle>

        <CardContent className="flex flex-col justify-between flex-grow">
          <div className="flex flex-col space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <p>{`${item.name} x${item.quantity}`}</p>

                <p className="font-bold">{`$ ${(
                  (item.priceInCents * item.quantity) /
                  100
                ).toLocaleString()}`}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <p>Subtotal</p>

              <p className="font-bold">{`$${(
                totalProductsPirceInCents / 100
              ).toLocaleString()}`}</p>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <p>Delivery Fee</p>

              <p className="font-bold">$2</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="font-bold ">{`Total: $ ${(
              (totalProductsPirceInCents + 200) /
              100
            ).toLocaleString()}`}</p>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-sky-500 text-white hover:bg-sky-400 ">
                  Checkout
                </Button>
              </DialogTrigger>
              <DialogContent
                onInteractOutside={(e) => e.preventDefault()}
                className="sm:max-w-[425px]"
              >
                <DialogHeader>
                  <DialogTitle>Checkout</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                {children}
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const CartItem = ({ item }: { item: CartItemType }) => {
  const dispatch = useDispatch();

  return (
    <div key={item.id} className="">
      <div className="flex justify-between items-center my-4">
        <div className=" flex">
          <div className="flex flex-shrink-0 relative mr-2 w-20 aspect-square rounded-lg overflow-hidden">
            <Image
              sizes="800px"
              src={item.image}
              alt={item.id}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <p className="font-bold">{item.name}</p>
            <p className="opacity-70">{`$ ${(
              item.priceInCents / 100
            ).toLocaleString()}`}</p>
          </div>
        </div>

        <div className="flex flex-col w-[30%]">
          <div className="flex justify-between items-center border-[1px] rounded-lg w-full overflow-hidden">
            <Button
              variant="outline"
              size="sm"
              className="border-0 text-xl"
              onClick={() => {
                dispatch(decrementProduct(item.id));
              }}
            >
              -
            </Button>
            <p>{item.quantity}</p>
            <Button
              variant="outline"
              size="sm"
              className="border-0 text-xl"
              onClick={() => {
                dispatch(addProduct(item));
              }}
            >
              +
            </Button>
          </div>
        </div>
      </div>

      <Separator />
    </div>
  );
};

export default ProductsList;
