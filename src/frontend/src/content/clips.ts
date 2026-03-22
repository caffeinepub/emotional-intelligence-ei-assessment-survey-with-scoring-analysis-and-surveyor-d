export interface FootballClip {
  id: string;
  title: string;
  description: string;
  videoId: string;
  watchUrl: string;
  category: "goals" | "skills" | "saves" | "iconic";
}

export const clipCategories = [
  { id: "goals", label: "Goals", emoji: "⚽" },
  { id: "skills", label: "Skills", emoji: "🪄" },
  { id: "saves", label: "Saves", emoji: "🧤" },
  { id: "iconic", label: "Iconic Moments", emoji: "🏆" },
];

export const footballClips: FootballClip[] = [
  // Goals
  {
    id: "ronaldo-bicycle-kick",
    title: "Ronaldo's Bicycle Kick — Champions League 2018",
    description:
      "Cristiano Ronaldo's stunning overhead kick vs Juventus — one of the greatest goals in Champions League history.",
    videoId: "TBhA3NyUxU4",
    watchUrl: "https://www.youtube.com/watch?v=TBhA3NyUxU4",
    category: "goals",
  },
  {
    id: "messi-puskas-2012",
    title: "Messi's Puskas Award Goal vs Athletic Bilbao 2012",
    description:
      "Lionel Messi weaves past five defenders before slotting home — the Puskas Award winner for 2012.",
    videoId: "YkqbJjNYdBo",
    watchUrl: "https://www.youtube.com/watch?v=YkqbJjNYdBo",
    category: "goals",
  },
  {
    id: "zlatan-england-2012",
    title: "Zlatan Ibrahimović's Bicycle Kick vs England 2012",
    description:
      "From 30 yards out, Zlatan launched into the air for arguably the best overhead kick in international football.",
    videoId: "_grFgJNjnm8",
    watchUrl: "https://www.youtube.com/watch?v=_grFgJNjnm8",
    category: "goals",
  },
  {
    id: "roberto-carlos-freekick",
    title: "Roberto Carlos Free-Kick vs France 1997",
    description:
      "The impossible free-kick. Roberto Carlos bent the ball in a trajectory that defied physics and stunned the world.",
    videoId: "y72n5XPWLzY",
    watchUrl: "https://www.youtube.com/watch?v=y72n5XPWLzY",
    category: "goals",
  },
  // Skills
  {
    id: "ronaldinho-freestyle",
    title: "Ronaldinho — Greatest Skills & Tricks",
    description:
      "The magician at his best. Ronaldinho's elasticos, flicks, and no-look passes that made defenders look silly.",
    videoId: "dR45DCjHoGs",
    watchUrl: "https://www.youtube.com/watch?v=dR45DCjHoGs",
    category: "skills",
  },
  {
    id: "neymar-skills",
    title: "Neymar — Best Dribbles & Nutmegs",
    description:
      "Neymar's most ridiculous dribbles, stepovers, and nutmegs in one breathtaking highlight reel.",
    videoId: "Z9Zn8bnJFvw",
    watchUrl: "https://www.youtube.com/watch?v=Z9Zn8bnJFvw",
    category: "skills",
  },
  {
    id: "messi-dribbles",
    title: "Messi — Impossible Dribbles",
    description:
      "Lionel Messi beats multiple defenders with pure genius that left the world speechless time after time.",
    videoId: "j9Ih8VBR-JM",
    watchUrl: "https://www.youtube.com/watch?v=j9Ih8VBR-JM",
    category: "skills",
  },
  {
    id: "mbappe-skills",
    title: "Mbappé — Explosive Speed & Skills",
    description:
      "Kylian Mbappé's blistering pace and silky skill moves that terrorise defenders across Europe.",
    videoId: "bk6nfT1plAU",
    watchUrl: "https://www.youtube.com/watch?v=bk6nfT1plAU",
    category: "skills",
  },
  // Saves
  {
    id: "gordon-banks-save",
    title: "Gordon Banks — Save of the Century vs Pelé (1970)",
    description:
      "Pelé called it the greatest save he ever saw. Gordon Banks clawed Pelé's header off the line at the 1970 World Cup.",
    videoId: "R3yhFBqGBug",
    watchUrl: "https://www.youtube.com/watch?v=R3yhFBqGBug",
    category: "saves",
  },
  {
    id: "neuer-saves",
    title: "Manuel Neuer — Best Sweeper-Keeper Moments",
    description:
      "Manuel Neuer revolutionised modern goalkeeping. Watch his most extraordinary saves and sweeping interventions.",
    videoId: "WN8fHJL2MxU",
    watchUrl: "https://www.youtube.com/watch?v=WN8fHJL2MxU",
    category: "saves",
  },
  {
    id: "alisson-saves",
    title: "Alisson Becker — World-Class Saves Compilation",
    description:
      "Liverpool's Brazilian stopper with his finest reflexes, diving stops, and commanding displays between the posts.",
    videoId: "gqm1lBfpPxk",
    watchUrl: "https://www.youtube.com/watch?v=gqm1lBfpPxk",
    category: "saves",
  },
  // Iconic
  {
    id: "maradona-goal-century",
    title: "Maradona's Goal of the Century — World Cup 1986",
    description:
      "Following the infamous Hand of God, Maradona scored the greatest goal in football history minutes later against England.",
    videoId: "XbFuBRmxjEg",
    watchUrl: "https://www.youtube.com/watch?v=XbFuBRmxjEg",
    category: "iconic",
  },
  {
    id: "messi-world-cup-2022",
    title: "Messi's World Cup Triumph — Argentina vs France 2022",
    description:
      "The most dramatic World Cup Final in modern history. Messi lifts the trophy he dreamed of his entire career.",
    videoId: "CpQu_LFpABU",
    watchUrl: "https://www.youtube.com/watch?v=CpQu_LFpABU",
    category: "iconic",
  },
  {
    id: "istanbul-2005",
    title: "The Istanbul Miracle — Liverpool vs AC Milan UCL 2005",
    description:
      "Liverpool came back from 3-0 down at half-time to lift the Champions League trophy in the greatest comeback ever.",
    videoId: "jJDn7t1y8WA",
    watchUrl: "https://www.youtube.com/watch?v=jJDn7t1y8WA",
    category: "iconic",
  },
  {
    id: "messi-goal-vs-nigeria",
    title: "Messi's World Cup 2014 Group Stage Wonder Goal",
    description:
      "Lionel Messi's silky dribble and finish against Nigeria at the 2014 World Cup that showed the world he was on a mission.",
    videoId: "6YgBCBNFpOE",
    watchUrl: "https://www.youtube.com/watch?v=6YgBCBNFpOE",
    category: "iconic",
  },
];
