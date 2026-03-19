import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import TrainingVideoCard from "../components/training/TrainingVideoCard";
import { trainingCategories } from "../content/trainingVideos";
import { useActor } from "../hooks/useActor";

export default function TrainingPage() {
  const [activeCategory, setActiveCategory] = useState("ball-control");
  const { actor } = useActor();

  const handleCategoryChange = async (categoryId: string) => {
    setActiveCategory(categoryId);
    if (actor) {
      try {
        await actor.logTrainingSession(categoryId);
      } catch {
        // silently ignore
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4 text-3xl">
          🏋️
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-3">
          Training Drills
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Master your skills with professional football drills and exercises
          from top YouTube channels
        </p>
      </div>

      <Tabs value={activeCategory} onValueChange={handleCategoryChange}>
        <TabsList className="grid w-full grid-cols-4 mb-8">
          {trainingCategories.map((cat) => (
            <TabsTrigger
              key={cat.id}
              value={cat.id}
              className="gap-1 text-sm"
              data-ocid={`training.${cat.id.replace("-", "_")}_tab`}
            >
              <span>{cat.emoji}</span>
              <span className="hidden sm:inline">{cat.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {trainingCategories.map((cat) => (
          <TabsContent key={cat.id} value={cat.id}>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <span>{cat.emoji}</span>
                {cat.label} Drills
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                {cat.videos.length} videos
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {cat.videos.map((video) => (
                <TrainingVideoCard key={video.embedUrl} video={video} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
