export interface TrainingVideo {
  title: string;
  channel: string;
  description: string;
  videoId: string;
  watchUrl: string;
}

export interface TrainingCategory {
  id: string;
  label: string;
  emoji: string;
  videos: TrainingVideo[];
}

export const trainingCategories: TrainingCategory[] = [
  {
    id: "ball-control",
    label: "Ball Control",
    emoji: "⚽",
    videos: [
      {
        title: "Ball Mastery Drills — 5 Exercises",
        channel: "Unisport",
        description:
          "Five essential ball mastery exercises to develop close control and a better first touch.",
        videoId: "n-FIWvjRHQI",
        watchUrl: "https://www.youtube.com/watch?v=n-FIWvjRHQI",
      },
      {
        title: "Ball Control Training Session",
        channel: "Unisport",
        description:
          "Professional ball control training to improve touch, feel and coordination with the ball.",
        videoId: "p7YMnj8YOHA",
        watchUrl: "https://www.youtube.com/watch?v=p7YMnj8YOHA",
      },
      {
        title: "1000 Touch Ball Control Workout",
        channel: "Skills4Lads",
        description:
          "The ultimate 1000-touch ball control routine — boost your first touch and confidence with the ball.",
        videoId: "Mk1FsFGQBkI",
        watchUrl: "https://www.youtube.com/watch?v=Mk1FsFGQBkI",
      },
    ],
  },
  {
    id: "passing",
    label: "Passing",
    emoji: "🎯",
    videos: [
      {
        title: "Passing Drills to Improve Accuracy",
        channel: "Unisport",
        description:
          "Sharpen your passing range and accuracy with these focused drills used by professional players.",
        videoId: "RBNBvDhtW5c",
        watchUrl: "https://www.youtube.com/watch?v=RBNBvDhtW5c",
      },
      {
        title: "Short & Quick Passing Technique",
        channel: "Unisport",
        description:
          "Master the art of short, quick passes to maintain possession and create space.",
        videoId: "kPmxSSfimE0",
        watchUrl: "https://www.youtube.com/watch?v=kPmxSSfimE0",
      },
    ],
  },
  {
    id: "shooting",
    label: "Shooting",
    emoji: "🚀",
    videos: [
      {
        title: "Shooting Drills to Score More Goals",
        channel: "Unisport",
        description:
          "Improve your finishing and composure in front of goal with these targeted shooting exercises.",
        videoId: "2UiS_JDnH1M",
        watchUrl: "https://www.youtube.com/watch?v=2UiS_JDnH1M",
      },
      {
        title: "How to Hit Powerful Shots",
        channel: "Unisport",
        description:
          "Generate maximum power in your shots with correct technique, body shape and follow-through.",
        videoId: "FTnV7JGO_6s",
        watchUrl: "https://www.youtube.com/watch?v=FTnV7JGO_6s",
      },
    ],
  },
  {
    id: "fitness",
    label: "Fitness",
    emoji: "💪",
    videos: [
      {
        title: "Football Fitness Conditioning",
        channel: "Unisport",
        description:
          "Build football-specific fitness, stamina and endurance with these on-pitch conditioning drills.",
        videoId: "KFGgkIqLbgU",
        watchUrl: "https://www.youtube.com/watch?v=KFGgkIqLbgU",
      },
      {
        title: "Speed & Agility Ladder Drills",
        channel: "Unisport",
        description:
          "Explosive agility ladder drills to boost sprint speed, footwork and match readiness.",
        videoId: "m2KlTKKk2cU",
        watchUrl: "https://www.youtube.com/watch?v=m2KlTKKk2cU",
      },
    ],
  },
];
