import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Brain,
  Dumbbell,
  Target,
  Trophy,
  Utensils,
  Zap,
} from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="relative mb-12 rounded-2xl overflow-hidden">
        <img
          src="/assets/generated/football-hero.dim_1600x900.png"
          alt="Football Training"
          className="w-full h-64 md:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent flex items-end">
          <div className="p-8 w-full">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Elevate Your Game
            </h1>
            <p className="text-xl text-foreground/90 max-w-2xl">
              Master football knowledge, optimize your nutrition, and train like
              a pro
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card
          className="border-2 hover:border-primary transition-colors cursor-pointer"
          onClick={() => navigate({ to: "/quiz" })}
        >
          <CardHeader>
            <Brain className="w-12 h-12 text-primary mb-3" />
            <CardTitle className="text-2xl">Quiz</CardTitle>
            <CardDescription>
              Test your football knowledge with 50 challenging questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full gap-2">
              Start Quiz
              <ArrowRight className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>

        <Card
          className="border-2 hover:border-primary transition-colors cursor-pointer"
          onClick={() => navigate({ to: "/food" })}
        >
          <CardHeader>
            <Utensils className="w-12 h-12 text-primary mb-3" />
            <CardTitle className="text-2xl">Food</CardTitle>
            <CardDescription>
              Discover nutrition facts and plan your athlete diet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full gap-2">
              Explore Foods
              <ArrowRight className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>

        <Card
          className="border-2 hover:border-primary transition-colors cursor-pointer"
          onClick={() => navigate({ to: "/training" })}
        >
          <CardHeader>
            <Dumbbell className="w-12 h-12 text-primary mb-3" />
            <CardTitle className="text-2xl">Training</CardTitle>
            <CardDescription>
              Watch professional drills and exercises to improve your skills
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full gap-2">
              View Drills
              <ArrowRight className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <Trophy className="w-8 h-8 text-success mb-2" />
            <CardTitle className="text-lg">Compete & Learn</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Challenge yourself with football trivia and track your progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Target className="w-8 h-8 text-success mb-2" />
            <CardTitle className="text-lg">Fuel Your Body</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Learn about nutrition and make informed dietary choices
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Zap className="w-8 h-8 text-success mb-2" />
            <CardTitle className="text-lg">Train Smart</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Access professional training videos and improve your technique
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
