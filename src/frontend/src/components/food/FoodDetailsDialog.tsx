import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Food } from "../../content/foods";

interface FoodDetailsDialogProps {
  food: Food | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FoodDetailsDialog({
  food,
  open,
  onOpenChange,
}: FoodDetailsDialogProps) {
  if (!food) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">{food.name}</DialogTitle>
          <DialogDescription>Nutritional Information</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="aspect-video rounded-lg overflow-hidden bg-muted">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-base px-3 py-1">
              {food.calories} calories
            </Badge>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-foreground">Benefits</h3>
            <p className="text-muted-foreground leading-relaxed">
              {food.benefits}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
