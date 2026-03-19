import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Camera } from "lucide-react";
import { motion } from "motion/react";
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
    <div className="page-bg min-h-screen">
      {/* Banner */}
      <div className="relative h-48 overflow-hidden">
        <img
          src="/assets/generated/food-banner.dim_800x400.jpg"
          alt="Food & Nutrition"
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-display font-bold text-white drop-shadow-md">
              Nutrition Guide
            </h1>
            <p className="text-white/80 mt-1 font-body">
              Fuel your body for peak performance
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-11">
            <TabsTrigger
              value="browse"
              className="gap-2"
              data-ocid="food.browse.tab"
            >
              <BookOpen className="w-4 h-4" />
              Browse Foods
            </TabsTrigger>
            <TabsTrigger
              value="scan"
              className="gap-2"
              data-ocid="food.scan.tab"
            >
              <Camera className="w-4 h-4" />
              Scan Food
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-8">
            <Card className="border-border shadow-xs">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl">
                    🎯
                  </div>
                  <div>
                    <CardTitle className="font-display">
                      Recommended by Age Group
                    </CardTitle>
                    <CardDescription>
                      Select your age group for personalized recommendations
                    </CardDescription>
                  </div>
                </div>
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

            <Card className="border-border shadow-xs">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl">
                    🥦
                  </div>
                  <div>
                    <CardTitle className="font-display">All Foods</CardTitle>
                    <CardDescription>
                      Click any food for detailed nutritional information
                    </CardDescription>
                  </div>
                </div>
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
    </div>
  );
}
