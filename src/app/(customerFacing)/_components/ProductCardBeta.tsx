import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import AddCartButton from "./AddCartButton";

export const ProductCardBeta = ({ product }: { product: Product }) => {
  
  return (
    <Card key={product.id} className="flex flex-col">
      <div className=" text-center relative flex justify-center items-center w-full aspect-[5/6] overflow-hidden group">
        <Link
          className="relative h-full w-full"
          href={`/products/${product.id}`}
        >
          <Image
            sizes="800px"
            src={product.image}
            alt={product.name}
            fill
            className="object-cover hover:brightness-[.6] hover:scale-110 transition-all duration-400"
          />
        </Link>

        <p className="absolute drop-shadow-lg w-full text-white px-5 opacity-0 transition-all duration-300 group-hover:opacity-100 pointer-events-none">
          {product.description}
        </p>
      </div>

      <CardHeader className="flex-grow">
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>
          {`${(product.priceInCents / 100).toLocaleString()} $`}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between">
        <Button asChild variant="outline" size="lg" className="w-[40%]">
          <Link href={`/products/${product.id}`}>View</Link>
        </Button>

        <AddCartButton product={product} />
      </CardFooter>
    </Card>
  );
};

export const ProductCardSkeletonBeta = () => {
  return (
    <Card className=" overflow-hidden flex flex-col animate-pulse">
      <div className="relative w-full aspect-[5/6] bg-gray-300"></div>
      <CardHeader>
        <div className="w-3/4 h-6 rounded-full bg-gray-300"></div>

        <div className="w-1/2 h-4 rounded-full bg-gray-300"></div>
      </CardHeader>

      <CardFooter>
        <Button className="w-full" size="lg" disabled></Button>
      </CardFooter>
    </Card>
  );
};
