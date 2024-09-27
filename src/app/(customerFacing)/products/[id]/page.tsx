import db from "@/db/db";
import Image from "next/image";
import OrderCard from "./_components/OrderCard";
import NutritionalFactsCard from "./_components/NutritionalFactsCard";
import { Product } from "@prisma/client";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
  const product: Product | null = await db.product.findUnique({
    where: { id },
  });

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="mt-20 flex flex-col lg:flex-row justify-between items-center">
      <div className="flex w-full">
        <div className="relative w-full lg:w-[400px] aspect-[5/6] rounded-lg rounded-r-none overflow-hidden">
          <Image
            sizes="800px"
            src={`data:image/jpeg;base64,${product.image}`}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <NutritionalFactsCard product={product} />
      </div>

      <OrderCard product={product} />
    </div>
  );
};

export default Page;
