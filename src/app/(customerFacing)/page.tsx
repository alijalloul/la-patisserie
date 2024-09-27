import db from "@/db/db";
import { cache } from "@/lib/cache";
import ProductGridBeta from "./_components/ProductGridBeta";

const getPopularProducts = cache(
  () => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { orders: { _count: "desc" } },
      take: 4,
    });
  },
  ["/", "getPopularProducts"],
  { revalidate: 60 * 60 * 24 }
);

const getNewestProducts = cache(
  async () => {
    await wait(2000);

    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { createdAt: "desc" },
      take: 4,
    });
  },
  ["/", "getNewestProducts"],
  { revalidate: 60 * 60 * 24 }
);

function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
const page = () => {
  return (
    <main className="space-y-12">
      <ProductGridBeta productsFetcher={getNewestProducts} title="Newest" />
      <ProductGridBeta productsFetcher={getPopularProducts} title="Popular" />
    </main>
  );
};

export default page;
