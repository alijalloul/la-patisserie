import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@prisma/client";
import React from "react";

const NutritionalFactsCard = ({ product }: { product: Product }) => {
  return (
    <Card className="w-[400px] aspect-[5/6] rounded-l-none">
      <CardHeader>
        <CardTitle>Nutritional Facts</CardTitle>

        <CardDescription>
          <p>6 servings per container</p>

          <div className="flex justify-between items-center">
            <p>Serving Size</p>
            <p>1 piece</p>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex justify-between items-center mb-5 border-b-4 border-b-black">
          <CardTitle>Calories</CardTitle>

          <CardTitle>850</CardTitle>
        </div>
        <NutritionFact name="Total Fat" weight="22" percent="20" />

        <CardContent className="pr-0 pb-0">
          <NutritionFact name="Saturated Fat" weight="22" percent="20" />
          <NutritionFact name="Trans Fat" weight="0" percent="0" />
        </CardContent>

        <NutritionFact name="Cholesterol" weight="0" percent="0" />
        <NutritionFact name="Sodium" weight="2" percent="5" />
        <NutritionFact name="Total Carbohydrate" weight="25" percent="100" />

        <CardContent className="pr-0 pb-0">
          <NutritionFact name="Dietary Fiber" weight="2" percent="10" />
          <NutritionFact name="Total Sugar" weight="23" percent="100" />
        </CardContent>

        <NutritionFact name="Protine" weight="5" percent="2" />
      </CardContent>
    </Card>
  );
};

export default NutritionalFactsCard;

const NutritionFact = ({
  name,
  weight,
  percent,
}: {
  name: string;
  weight: string;
  percent: string;
}) => {
  return (
    <div className="flex justify-between items-center border-y-[1px]">
      <p>{`${name} ${weight}g`}</p>

      <p>{`${percent}%`}</p>
    </div>
  );
};
