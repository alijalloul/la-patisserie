"use server";

import db from "@/db/db";
import { revalidatePath } from "next/cache";
import {
  notFound,
  redirect,
} from "next/navigation";
import sharp from "sharp";
import { z } from "zod";

const compressBase64Image = async (arrayBuffer: ArrayBuffer) => {
  if (arrayBuffer) {

    const imageBuffer = Buffer.from(arrayBuffer);

    const compressedBuffer = await sharp(imageBuffer)
      .resize({ width: 512 })
      .jpeg({ quality: 50 })
      .toBuffer();

    const compressedBase64 = compressedBuffer.toString("base64");
    

    return `data:image/jpeg;base64,${compressedBase64}`;
  } else {
    return "";
  }
};

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().min(1),
  image: z.instanceof(File),
});

export const addProduct = async (
  prevState: unknown,
  formData: FormData
) => {
  const result = addSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  // Read the image file as a buffer
  const arrayBuffer =
    await data.image.arrayBuffer();
  const base64Image =
    await compressBase64Image(arrayBuffer)


  await db.product.create({
    data: {
      isAvailableForPurchase: false,
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      image: base64Image,
    },
  });

  revalidatePath("/");
  revalidatePath("/products");

  redirect("/admin/products");
};

export const editProduct = async (
  id: string,
  prevState: unknown,
  formData: FormData
) => {
  const result = addSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const product = await db.product.findUnique({
    where: { id },
  });

  if (product == null) {
    return notFound();
  }

  let base64Image: string;
  if (data.image) {

    const arrayBuffer =
    await data.image.arrayBuffer();
  base64Image =
    await compressBase64Image(arrayBuffer)

  } else {
    base64Image = product.image; // Retain the old image if no new image is provided

  }

  await db.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      image: base64Image, // Update with binary data
    },
  });

  revalidatePath("/");
  revalidatePath("/products");

  redirect("/admin/products");
};

export const toggleProductAvailability = async (
  id: string,
  isAvailableForPurchase: boolean
) => {
  await db.product.update({
    where: { id },
    data: { isAvailableForPurchase },
  });

  revalidatePath("/");
  revalidatePath("/products");
};

export const deleteProduct = async (
  id: string,
  orders: boolean
) => {
  if (orders) {
    console.error("Product has orders");
  }
  try {
    const data = await db.product.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/products");
  } catch (error) {
    console.log(error);
  }
};
