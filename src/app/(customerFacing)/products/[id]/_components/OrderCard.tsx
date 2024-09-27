"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import React, { useState } from "react";

const OrderCard = ({ product }: { product: Product }) => {
  const [orderCount, setOrderCount] = useState(1);

  return (
    <div className="flex flex-shrink-0 flex-col justify-between w-full lg:w-[400px] lg:aspect-[5/6] border-[1px] rounded-lg p-10">
      <div>
        <h2 className="text-4xl">{product?.name}</h2>
        <h2 className="text-xl">{`${(
          product?.priceInCents / 100
        ).toLocaleString()} $`}</h2>
      </div>

      <div>
        <div className="flex justify-between items-center mb-5">
          <div className="flex justify-between items-center border-[1px] rounded-lg w-[48%] h-12 overflow-hidden">
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
              className="text-center w-16 border-l-[1px] border-r-[1px] focus-visible:outline-none px-2"
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

          <Button className="w-[48%] h-12">ADD</Button>
        </div>

        <h2>{product?.description}</h2>
      </div>

      <div></div>
    </div>
  );
};

export default OrderCard;
