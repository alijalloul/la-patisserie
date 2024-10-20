// CartSlide.tsx
"use client";

import { addProduct, decrementProduct } from "@/app/store/cartSlice";
import {
  selectTotalProducts,
  selectTotalProductsPriceInCents,
} from "@/app/store/selectors";
import { RootState } from "@/app/store/store";
import { CartItemType } from "@/app/store/types";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

const CartSlide = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const totalProducts = useSelector(selectTotalProducts);
  const totalProductsPirceInCents = useSelector(
    selectTotalProductsPriceInCents
  );

  return (
    <Sheet>
      <SheetTrigger className="relative group -m-2 flex items-center p-2">
        <ShoppingCart className="w-6 aspect-square flex-shrink-0 text-gray-400 group-hover:text-gray-500" />

        <div className="font-mono w-4 h-4 flex justify-center items-center absolute bg-gray-800 text-white text-[10px] right-0 bottom-0 p-1 rounded-full group-hover:bg-gray-700">
          {totalProducts}
        </div>
      </SheetTrigger>

      <SheetContent className="w-1/3 flex flex-col border-4  sm:w-full">
        <SheetHeader className="space-y-2.5">
          <SheetTitle>Cart ({totalProducts})</SheetTitle>
        </SheetHeader>

        {cartItems.length > 0 ? (
          <div className="w-full flex flex-col flex-grow overflow-auto justify-center">
            <div className="pr-5 flex flex-col flex-grow overflow-y-auto scrollbar-thin">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className=" flex flex-col">
              <p className="font-bold text-xl mb-4">{`Total: $${(
                totalProductsPirceInCents / 100
              ).toLocaleString()}`}</p>

              <SheetClose
                asChild
                className="text-center w-full p-2 rounded-lg bg-sky-500 text-white hover:bg-sky-400"
              >
                <Link href="/checkout">Proceed to Checkout</Link>
              </SheetClose>
            </div>
          </div>
        ) : (
          <p>No items</p>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSlide;

const CartItem = ({ item }: { item: CartItemType }) => {
  const dispatch = useDispatch();

  return (
    <div key={item.id} className="">
      <div className="flex justify-between items-center my-4">
        <div className=" flex">
          <div className="flex flex-shrink-0 relative mr-2 w-20 aspect-square rounded-lg overflow-hidden">
            <Image
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
          <div className="flex justify-between items-center border rounded-lg w-full overflow-hidden">
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
