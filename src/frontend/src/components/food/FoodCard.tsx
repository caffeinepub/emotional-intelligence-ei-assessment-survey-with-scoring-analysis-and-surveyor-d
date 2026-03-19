import { Card, CardContent } from "@/components/ui/card";
import type { Food } from "../../content/foods";

interface FoodCardProps {
  food: Food;
  onClick: () => void;
}

export default function FoodCard({ food, onClick }: FoodCardProps) {
  return (
    <Card
      className="cursor-pointer hover:border-primary transition-all hover:shadow-lg"
      onClick={onClick}
    >
      <CardContent className="p-3">
        <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-muted">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-semibold text-sm text-center">{food.name}</h3>
        <p className="text-xs text-muted-foreground text-center">
          {food.calories} cal
        </p>
      </CardContent>
    </Card>
  );
}
