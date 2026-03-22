import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  Brain,
  Clapperboard,
  Dumbbell,
  Heart,
  Home,
  Utensils,
} from "lucide-react";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const navigate = useNavigate();
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
      navigate({ to: "/" });
    } else {
      try {
        await login();
      } catch (error: any) {
        if (error.message === "User is already authenticated") {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate({ to: "/" })}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img
                src="/assets/generated/footballer-app-logo.dim_512x512.png"
                alt="Footballer App"
                className="w-10 h-10 rounded-xl shadow-md"
              />
              <div className="text-left">
                <h1 className="text-xl font-bold text-foreground">
                  Footballer Pro
                </h1>
                <p className="text-xs text-muted-foreground">
                  Train. Eat. Excel.
                </p>
              </div>
            </button>

            <nav className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate({ to: "/" })}
                className="gap-2"
                data-ocid="nav.home_link"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate({ to: "/quiz" })}
                className="gap-2"
                data-ocid="nav.quiz_link"
              >
                <Brain className="w-4 h-4" />
                <span className="hidden sm:inline">Quiz</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate({ to: "/food" })}
                className="gap-2"
                data-ocid="nav.food_link"
              >
                <Utensils className="w-4 h-4" />
                <span className="hidden sm:inline">Food</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate({ to: "/training" })}
                className="gap-2"
                data-ocid="nav.training_link"
              >
                <Dumbbell className="w-4 h-4" />
                <span className="hidden sm:inline">Training</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate({ to: "/clips" })}
                className="gap-2"
                data-ocid="nav.clips_link"
              >
                <Clapperboard className="w-4 h-4" />
                <span className="hidden sm:inline">Clips</span>
              </Button>

              <Button
                onClick={handleAuth}
                disabled={isLoggingIn}
                variant={isAuthenticated ? "outline" : "default"}
                size="sm"
                className="ml-2"
                data-ocid="nav.auth_button"
              >
                {isLoggingIn
                  ? "Logging in..."
                  : isAuthenticated
                    ? "Logout"
                    : "Login"}
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-card/30 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            © {new Date().getFullYear()}. Built with{" "}
            <Heart className="w-4 h-4 text-success fill-success" /> using{" "}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "footballer-app")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
