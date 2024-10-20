"use client";

import AddCartButton from "@/app/(customerFacing)/_components/AddCartButton";
import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import { useState } from "react";

const OrderCard = ({
  product,
  className,
}: {
  product: Product;
  className: string;
}) => {
  const [orderCount, setOrderCount] = useState(1);

  return (
    <div className={className}>
      <div>
        <h2 className="text-4xl">{product?.name}</h2>
        <h2 className="text-xl">{`${(
          product?.priceInCents / 100
        ).toLocaleString()} $`}</h2>
      </div>

      <div>
        <div className="flex justify-between items-center mb-5">
          <div className="flex justify-between items-center border rounded-lg w-[45%] h-12 overflow-hidden">
            <Button
              variant="outline"
              className="border-0 text-xl"
              onClick={() => {
                orderCount > 1 && setOrderCount(orderCount - 1);
              }}
            >
              -
            </Button>
            <input
              type="number"
              className="text-center w-1/3 border-l border-r focus-visible:outline-none sm:px-0"
              value={orderCount}
              onChange={(e) => {
                setOrderCount(Number(e.target.value));
              }}
            />
            <Button
              variant="outline"
              className="border-0 text-xl"
              onClick={() => {
                setOrderCount(orderCount + 1);
              }}
            >
              +
            </Button>
          </div>

          <AddCartButton product={product} quantity={orderCount} />
        </div>

        <h2>{product?.description}</h2>
      </div>

      <div></div>
    </div>
  );
};

export default OrderCard;
