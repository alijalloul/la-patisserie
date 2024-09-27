import ProductForm from "../../_components/ProductForm";
import db from "@/db/db";

const EditProductForm = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const product = await db.product.findUnique({ where: { id } });

  return (
    <>
      <div>
        <h1 className="text-4xl mb-4">Edit Product</h1>
      </div>

      <ProductForm product={product} />
    </>
  );
};

export default EditProductForm;
