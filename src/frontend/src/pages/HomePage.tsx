import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Brain,
  Dumbbell,
  HelpCircle,
  Salad,
  Trophy,
  Video,
} from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { icon: HelpCircle, label: "Quiz Questions", value: "50" },
  { icon: Salad, label: "Foods Tracked", value: "30+" },
  { icon: Video, label: "Training Videos", value: "20+" },
  { icon: Trophy, label: "FIFA Trivia", value: "100%" },
];

const sections = [
  {
    to: "/quiz" as const,
    icon: Brain,
    emoji: "🧠",
    title: "FIFA Quiz",
    description:
      "Test your football knowledge with 50 challenging FIFA trivia questions. Answer fast, score big.",
    cta: "Start Quiz",
    gradient: "from-emerald-600 to-green-500",
    bgClass: "from-[oklch(0.52_0.2_145)] to-[oklch(0.38_0.15_160)]",
    ocid: "home.quiz.primary_button",
  },
  {
    to: "/food" as const,
    icon: Salad,
    emoji: "🥗",
    title: "Nutrition Guide",
    description:
      "Discover calories and benefits of athlete foods. Get age-specific diet plans for peak performance.",
    cta: "Explore Foods",
    gradient: "from-lime-500 to-emerald-600",
    bgClass: "from-[oklch(0.62_0.2_125)] to-[oklch(0.52_0.2_145)]",
    ocid: "home.food.primary_button",
  },
  {
    to: "/training" as const,
    icon: Dumbbell,
    emoji: "🏋️",
    title: "Training Hub",
    description:
      "Watch professional drills from All Attack & Unisport. Improve ball control, shooting, and more.",
    cta: "View Drills",
    gradient: "from-green-700 to-teal-600",
    bgClass: "from-[oklch(0.42_0.18_165)] to-[oklch(0.52_0.2_145)]",
    ocid: "home.training.primary_button",
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="page-bg min-h-screen">
      {/* Hero */}
      <div className="relative h-80 md:h-[500px] overflow-hidden">
        <img
          src="/assets/generated/football-hero.dim_1600x900.jpg"
          alt="Football Hero"
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-5">
              <span className="text-sm font-semibold text-white/90 tracking-wide uppercase">
                Footballer Hub
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4 leading-none tracking-tight">
              Elevate Your
              <span className="block gradient-gold-text">Game</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-xl mx-auto font-body">
              Master football knowledge, optimize your nutrition, and train like
              a pro
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-primary shadow-glow">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {stats.map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="flex items-center gap-3 py-4 px-5 border-r border-white/20 last:border-r-0"
              >
                <Icon className="w-6 h-6 text-primary-foreground/70 flex-shrink-0" />
                <div>
                  <div className="text-xl font-display font-bold text-primary-foreground">
                    {value}
                  </div>
                  <div className="text-xs text-primary-foreground/70 font-body">
                    {label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Section cards */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {sections.map(
            (
              { to, icon: Icon, emoji, title, description, cta, bgClass, ocid },
              i,
            ) => (
              <motion.div
                key={to}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.15 * i + 0.3,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-glow transition-all duration-300 cursor-pointer"
                onClick={() => navigate({ to })}
              >
                {/* Card gradient header */}
                <div
                  className={`relative h-32 bg-gradient-to-br ${bgClass} flex items-center justify-center`}
                >
                  <span className="text-5xl drop-shadow-md group-hover:scale-110 transition-transform duration-300">
                    {emoji}
                  </span>
                  <div className="absolute inset-0 bg-black/10" />
                </div>
                {/* Card body */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-display font-bold">{title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-5 font-body leading-relaxed">
                    {description}
                  </p>
                  <Button
                    className="w-full gap-2 font-semibold"
                    data-ocid={ocid}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate({ to });
                    }}
                  >
                    {cta}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ),
          )}
        </div>

        {/* Feature row */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "🏆",
              title: "Compete & Learn",
              desc: "Challenge yourself with football trivia and track your knowledge over time",
            },
            {
              icon: "⚡",
              title: "Fuel Your Body",
              desc: "Discover optimal nutrition for your age group and training intensity",
            },
            {
              icon: "🎯",
              title: "Train Smart",
              desc: "Access professional training videos and sharpen your technique every session",
            },
          ].map(({ icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + 0.1 * i, duration: 0.5 }}
              className="bg-card rounded-xl border border-border p-5 flex gap-4 items-start"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl flex-shrink-0">
                {icon}
              </div>
              <div>
                <h4 className="font-display font-semibold mb-1">{title}</h4>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center">
        <p className="text-sm text-muted-foreground font-body">
          © {new Date().getFullYear()}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
