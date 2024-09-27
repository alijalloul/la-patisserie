import { Product } from "@prisma/client";
import React, { Suspense } from "react";
import { ProductCardBeta, ProductCardSkeletonBeta } from "./ProductCardBeta";

type ProductGridProps = {
  productsFetcher: () => Promise<Product[]>;
  title: string;
};

const ProductGridBeta = ({ productsFetcher, title }: ProductGridProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">{title}</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Suspense
          fallback={
            <>
              <ProductCardSkeletonBeta />
              <ProductCardSkeletonBeta />
              <ProductCardSkeletonBeta />
              <ProductCardSkeletonBeta />
            </>
          }
        >
          <ProductSuspense productsFetcher={productsFetcher} />
        </Suspense>
      </div>
    </div>
  );
};

const ProductSuspense = async ({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>;
}) => {
  const products = await productsFetcher();

  return products.map((product) => (
    <ProductCardBeta key={product.id} product={product} />
  ));
};
export default ProductGridBeta;
