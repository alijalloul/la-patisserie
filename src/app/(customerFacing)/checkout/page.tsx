import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import StripePopUp from "./_components/StripePopUp";
import CheckoutForm from "./_components/CheckoutForm";
import ProductsList from "./_components/ProductsList";

const page = () => {
  return (
    <Carousel opts={{ watchDrag: false }}>
      <CarouselContent>
        <CarouselItem>
          <CheckoutForm />
        </CarouselItem>

        <CarouselItem>
          <div className="flex justify-between items-center w-full">
            <ProductsList>
              <StripePopUp />
            </ProductsList>
          </div>
        </CarouselItem>
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default page;
