import React, { Suspense } from "react";
import db from "@/db/db";
import { cache } from "@/lib/cache";
import {
  ProductCardBeta,
  ProductCardSkeletonBeta,
} from "../_components/ProductCardBeta";

const page = () => {
  return (
    <div className="space-y-2">
      <h2 className="text-3xl font-bold">&nbsp;</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Suspense
          fallback={
            <>
              <ProductCardSkeletonBeta />
              <ProductCardSkeletonBeta />
              <ProductCardSkeletonBeta />
              <ProductCardSkeletonBeta />
              <ProductCardSkeletonBeta />
              <ProductCardSkeletonBeta />
              <ProductCardSkeletonBeta />
              <ProductCardSkeletonBeta />
            </>
          }
        >
          <ProductSuspense />
        </Suspense>
      </div>
    </div>
  );
};

export default page;

const getProducts = cache(() => {
  return db.product.findMany({ where: { isAvailableForPurchase: true } });
}, ["/products", "getProducts"]);

const ProductSuspense = async () => {
  const products = await getProducts();

  return products.map((product) => (
    <ProductCardBeta key={product.id} product={product} />
  ));
};
