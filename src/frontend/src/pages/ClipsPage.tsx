import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Heart, Play } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { clipCategories, footballClips } from "../content/clips";
import { useFavoriteClips } from "../hooks/useFavoriteClips";

function ClipCard({
  clip,
  index,
  isFavorite,
  onToggleFavorite,
}: {
  clip: (typeof footballClips)[number];
  index: number;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}) {
  const [playing, setPlaying] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${clip.videoId}/hqdefault.jpg`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * index, duration: 0.45 }}
      className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
      data-ocid={`clips.item.${index + 1}`}
    >
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${clip.videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={clip.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        ) : (
          <button
            type="button"
            className="absolute inset-0 cursor-pointer group w-full h-full p-0 border-0 bg-transparent"
            onClick={() => setPlaying(true)}
            onKeyDown={(e) => e.key === "Enter" && setPlaying(true)}
            aria-label={`Play ${clip.title}`}
          >
            <img
              src={thumbnailUrl}
              alt={clip.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <Play className="w-7 h-7 text-white fill-white ml-1" />
              </div>
            </div>
          </button>
        )}
        {/* Favorite button overlay */}
        <button
          type="button"
          onClick={() => onToggleFavorite(clip.id)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-200 ${
            isFavorite
              ? "bg-red-500 text-white scale-110"
              : "bg-black/50 text-white/80 hover:bg-black/70"
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-all ${
              isFavorite ? "fill-white" : "fill-transparent"
            }`}
          />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-display font-bold text-base leading-snug mb-1">
          {clip.title}
        </h3>
        <p className="text-sm text-muted-foreground font-body leading-relaxed mb-3">
          {clip.description}
        </p>
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2"
          onClick={() => window.open(clip.watchUrl, "_blank")}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Watch on YouTube
        </Button>
      </div>
    </motion.div>
  );
}

export default function ClipsPage() {
  const [activeCategory, setActiveCategory] = useState("goals");
  const { favorites, toggleFavorite, isFavorite } = useFavoriteClips();

  const favoriteClips = footballClips.filter((c) => favorites.has(c.id));
  const allCategories = [
    { id: "favorites", label: "Favorites", emoji: "❤️" },
    ...clipCategories,
  ];

  const activeCat = allCategories.find((c) => c.id === activeCategory)!;

  const displayedClips =
    activeCategory === "favorites"
      ? favoriteClips
      : footballClips.filter((c) => c.category === activeCategory);

  return (
    <div className="page-bg min-h-screen">
      {/* Banner */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.28_0.22_265)] via-[oklch(0.32_0.2_250)] to-[oklch(0.22_0.25_280)]" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 left-8 text-6xl">🎦</div>
          <div className="absolute bottom-4 right-8 text-5xl">⚽</div>
          <div className="absolute top-8 right-24 text-4xl">🏆</div>
          <div className="absolute bottom-8 left-24 text-3xl">⭐</div>
        </div>
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-3 bg-white/20 text-white border-white/30 hover:bg-white/30">
              🎦 Highlight Reel
            </Badge>
            <h1 className="text-4xl font-display font-bold text-white drop-shadow-md">
              Football Highlights
            </h1>
            <p className="text-white/80 mt-1 font-body">
              Watch the most amazing plays in football history
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <div className="mb-8 overflow-x-auto">
            <TabsList className="grid w-full grid-cols-5">
              {allCategories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="gap-1.5 text-sm font-semibold relative"
                  data-ocid={`clips.${cat.id}_tab`}
                >
                  <span>{cat.emoji}</span>
                  <span className="hidden sm:inline">{cat.label}</span>
                  {cat.id === "favorites" && favorites.size > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
                      {favorites.size}
                    </span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {allCategories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl">
                    {activeCat.emoji}
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold">
                      {cat.label}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {displayedClips.length} clips
                      {cat.id === "favorites" ? " saved" : " available"}
                    </p>
                  </div>
                </div>
                {displayedClips.length === 0 ? (
                  <div className="text-center py-16 text-muted-foreground">
                    <Heart className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="font-display font-semibold text-lg">
                      No favorites yet
                    </p>
                    <p className="text-sm mt-1">
                      Tap the ❤️ on any clip to save it here
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {displayedClips.map((clip, i) => (
                      <ClipCard
                        key={clip.id}
                        clip={clip}
                        index={i}
                        isFavorite={isFavorite(clip.id)}
                        onToggleFavorite={toggleFavorite}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
