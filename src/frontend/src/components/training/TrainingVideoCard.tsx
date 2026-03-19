import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, ExternalLink, Youtube } from "lucide-react";
import { useState } from "react";
import type { TrainingVideo } from "../../content/trainingVideos";

interface TrainingVideoCardProps {
  video: TrainingVideo;
}

export default function TrainingVideoCard({ video }: TrainingVideoCardProps) {
  const [hasError, setHasError] = useState(false);

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
      <CardContent className="pt-0">
        {!hasError ? (
          <div className="aspect-video rounded-lg overflow-hidden bg-muted">
            <iframe
              src={video.embedUrl}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
              onError={() => setHasError(true)}
            />
          </div>
        ) : (
          <div className="space-y-3">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Unable to load video. Watch on YouTube instead.
              </AlertDescription>
            </Alert>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.open(video.fallbackUrl, "_blank")}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Watch on YouTube
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
