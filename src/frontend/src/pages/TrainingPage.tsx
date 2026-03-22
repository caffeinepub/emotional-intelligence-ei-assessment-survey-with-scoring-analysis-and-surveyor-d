import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "motion/react";
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
    <div className="page-bg min-h-screen">
      {/* Banner */}
      <div className="relative h-48 overflow-hidden">
        <img
          src="/assets/generated/training-banner.dim_800x400.jpg"
          alt="Training Drills"
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
              Training Hub
            </h1>
            <p className="text-white/80 mt-1 font-body">
              Pro drills from All Attack & Unisport
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <Tabs value={activeCategory} onValueChange={handleCategoryChange}>
          <div className="mb-8 overflow-x-auto">
            <TabsList className="grid w-full grid-cols-4">
              {trainingCategories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="gap-1.5 text-sm font-semibold"
                  data-ocid={`training.${cat.id.replace("-", "_")}_tab`}
                >
                  <span>{cat.emoji}</span>
                  <span className="hidden sm:inline">{cat.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {trainingCategories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl">
                    {cat.emoji}
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold">
                      {cat.label} Drills
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {cat.videos.length} videos available
                    </p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {cat.videos.map((video) => (
                    <TrainingVideoCard key={video.videoId} video={video} />
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
