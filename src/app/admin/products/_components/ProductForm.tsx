"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@prisma/client";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { addProduct, editProduct } from "../../_actions/products";

const ProductForm = ({ product }: { product?: Product | null }) => {
  const [error, action] = useFormState(
    product == null ? addProduct : editProduct.bind(null, product.id),
    {}
  );
  const [priceInCents, setPriceInCents] = useState(product?.priceInCents);
  const [image, setImage] = useState<string | null>(product?.image || null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0];
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      setImage(imageUrl);
    }
  };

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          defaultValue={product?.name}
        />
        {error.name && <ErrorMessage error={error.name} />}
      </div>

      <div className="space-y-2">
        <Label htmlFor="priceInCents">Price In Cents</Label>
        <Input
          type="number"
          id="priceInCents"
          name="priceInCents"
          required
          value={priceInCents}
          onChange={(e) => setPriceInCents(Number(e.target.value))}
          defaultValue={product?.priceInCents}
        />
        {error.priceInCents && <ErrorMessage error={error.priceInCents} />}
      </div>

      <div className="text-muted-foreground">
        {`${((priceInCents || 0) / 100).toLocaleString()} $`}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          required
          defaultValue={product?.description}
        />
        {error.description && <ErrorMessage error={error.description} />}
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input
          type="file"
          id="image"
          name="image"
          required={product == null}
          onChange={handleImageUpload}
        />
        {image != null && (
          <div className="relative h-[400px] aspect-square">
            <Image
              sizes="800px"
              src={image}
              alt="Product Image"
              fill
              className="rounded-xl w-fit object-cover"
            />
          </div>
        )}
        {error.image && <ErrorMessage error={error.image} />}
      </div>


      <SubmitButton />
    </form>
  );
};

export default ProductForm;

const ErrorMessage = ({ error }: { error: string[] }) => {
  return <div className="text-destructive">{error}</div>;
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
};
