export interface TrainingVideo {
  title: string;
  channel: string;
  description: string;
  embedUrl: string;
  fallbackUrl: string;
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
        title: "Ball Control Drills",
        channel: "All Attack",
        description:
          "Essential ball control exercises to master close control and first touch technique with the ball.",
        embedUrl: "https://www.youtube.com/embed/4L2PRo2Z3tY",
        fallbackUrl: "https://www.youtube.com/watch?v=4L2PRo2Z3tY",
      },
      {
        title: "Ball Mastery Session",
        channel: "Unisport",
        description:
          "Professional ball mastery drills to improve your touch, control and coordination on the pitch.",
        embedUrl: "https://www.youtube.com/embed/OPh6aVRIJYc",
        fallbackUrl: "https://www.youtube.com/watch?v=OPh6aVRIJYc",
      },
      {
        title: "Beginner Ball Control",
        channel: "Skills4Lads",
        description:
          "Perfect ball control for beginners — learn the fundamentals step by step.",
        embedUrl: "https://www.youtube.com/embed/TdMgCMFKFzQ",
        fallbackUrl: "https://www.youtube.com/watch?v=TdMgCMFKFzQ",
      },
    ],
  },
  {
    id: "passing",
    label: "Passing",
    emoji: "🎯",
    videos: [
      {
        title: "Passing Drills",
        channel: "All Attack",
        description:
          "Improve your passing accuracy, range and vision with these professional drills.",
        embedUrl: "https://www.youtube.com/embed/U3F_Q9nGq7M",
        fallbackUrl: "https://www.youtube.com/watch?v=U3F_Q9nGq7M",
      },
      {
        title: "Short Passing Technique",
        channel: "Unisport",
        description:
          "Master the art of short, quick passes to maintain possession and create chances.",
        embedUrl: "https://www.youtube.com/embed/r-gJxEn6DJU",
        fallbackUrl: "https://www.youtube.com/watch?v=r-gJxEn6DJU",
      },
    ],
  },
  {
    id: "shooting",
    label: "Shooting",
    emoji: "🚀",
    videos: [
      {
        title: "Shooting Drills",
        channel: "All Attack",
        description:
          "Enhance your finishing with these goal-scoring shooting drills and exercises.",
        embedUrl: "https://www.youtube.com/embed/jkWBFMXVBbk",
        fallbackUrl: "https://www.youtube.com/watch?v=jkWBFMXVBbk",
      },
      {
        title: "Power Shooting",
        channel: "Unisport",
        description:
          "Generate maximum power in your shots with proper technique and follow-through.",
        embedUrl: "https://www.youtube.com/embed/lkYlVLZ7FfA",
        fallbackUrl: "https://www.youtube.com/watch?v=lkYlVLZ7FfA",
      },
    ],
  },
  {
    id: "fitness",
    label: "Fitness",
    emoji: "💪",
    videos: [
      {
        title: "Football Fitness Training",
        channel: "All Attack",
        description:
          "Build football-specific fitness, stamina and endurance with these conditioning drills.",
        embedUrl: "https://www.youtube.com/embed/ml6cT4AZdqI",
        fallbackUrl: "https://www.youtube.com/watch?v=ml6cT4AZdqI",
      },
      {
        title: "Cardio Drills",
        channel: "Unisport",
        description:
          "Explosive cardio and speed drills to boost your match fitness and sprint endurance.",
        embedUrl: "https://www.youtube.com/embed/WMG8p4GkUkQ",
        fallbackUrl: "https://www.youtube.com/watch?v=WMG8p4GkUkQ",
      },
    ],
  },
];
