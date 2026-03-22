import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, Play, Youtube } from "lucide-react";
import { useState } from "react";
import type { TrainingVideo } from "../../content/trainingVideos";

interface TrainingVideoCardProps {
  video: TrainingVideo;
}

export default function TrainingVideoCard({ video }: TrainingVideoCardProps) {
  const [playing, setPlaying] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg leading-snug">{video.title}</CardTitle>
          <Badge
            variant="secondary"
            className="shrink-0 flex items-center gap-1"
          >
            <Youtube className="w-3 h-3" />
            {video.channel}
          </Badge>
        </div>
        <CardDescription>{video.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <div className="aspect-video rounded-lg overflow-hidden bg-muted">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <button
              type="button"
              className="relative w-full h-full cursor-pointer group p-0 border-0 bg-transparent"
              onClick={() => setPlaying(true)}
              onKeyDown={(e) => e.key === "Enter" && setPlaying(true)}
              aria-label={`Play ${video.title}`}
            >
              <img
                src={thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                </div>
              </div>
            </button>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-2"
          onClick={() => window.open(video.watchUrl, "_blank")}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Watch on YouTube
        </Button>
      </CardContent>
    </Card>
  );
}
