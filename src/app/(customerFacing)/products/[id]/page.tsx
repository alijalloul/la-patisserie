import db from "@/db/db";
import { Product } from "@prisma/client";
import Image from "next/image";
import NutritionalFactsCard from "./_components/NutritionalFactsCard";
import OrderCard from "./_components/OrderCard";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const product: Product | null = await db.product.findUnique({
    where: { id },
  });

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className=" flex justify-between items-center h-full sm:flex-col">
      <div className="flex w-[60%] sm:w-full sm:flex-col sm:mb-5">
        <div className="relative w-1/2 aspect-[5/6] rounded-l-lg overflow-hidden sm:w-full sm:rounded-t-lg sm:rounded-b-none ">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <NutritionalFactsCard
          product={product}
          className="aspect-[5/6] w-1/2 rounded-r-lg sm:w-full sm:rounded-t-none sm:rounded-b-lg "
        />
      </div>

      <OrderCard
        product={product}
        className="flex flex-shrink-0 flex-col justify-between w-[30%] aspect-[5/6] border rounded-lg p-10 sm:w-full"
      />
    </div>
  );
};

export default Page;
