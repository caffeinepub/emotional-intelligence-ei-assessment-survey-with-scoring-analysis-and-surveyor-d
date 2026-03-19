import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Camera } from "lucide-react";
import { useState } from "react";
import AgeGroupSelector from "../components/food/AgeGroupSelector";
import FoodCard from "../components/food/FoodCard";
import FoodDetailsDialog from "../components/food/FoodDetailsDialog";
import FoodScanner from "../components/food/FoodScanner";
import {
  type AgeGroup,
  ageGroupRecommendations,
} from "../content/foodRecommendations";
import { foods } from "../content/foods";
import type { Food } from "../content/foods";

export default function FoodPage() {
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup>("youth");

  const recommendedFoods = ageGroupRecommendations[selectedAgeGroup]
    .map((foodName) => foods.find((f) => f.name === foodName)!)
    .filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Nutrition Guide
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover the nutritional value of foods and plan your athlete diet
        </p>
      </div>

      <Tabs defaultValue="browse" className="space-y-6">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="browse" className="gap-2">
            <BookOpen className="w-4 h-4" />
            Browse Foods
          </TabsTrigger>
          <TabsTrigger value="scan" className="gap-2">
            <Camera className="w-4 h-4" />
            Scan Food
          </TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Recommended by Age Group</CardTitle>
              <CardDescription>
                Select your age group to see personalized food recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <AgeGroupSelector
                selectedAgeGroup={selectedAgeGroup}
                onAgeGroupChange={setSelectedAgeGroup}
              />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {recommendedFoods.map((food) => (
                  <FoodCard
                    key={food.name}
                    food={food}
                    onClick={() => setSelectedFood(food)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>All Foods</CardTitle>
              <CardDescription>
                Click on any food to view detailed nutritional information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {foods.map((food) => (
                  <FoodCard
                    key={food.name}
                    food={food}
                    onClick={() => setSelectedFood(food)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scan">
          <FoodScanner onFoodDetected={setSelectedFood} />
        </TabsContent>
      </Tabs>

      <FoodDetailsDialog
        food={selectedFood}
        open={!!selectedFood}
        onOpenChange={(open) => !open && setSelectedFood(null)}
      />
    </div>
  );
}
