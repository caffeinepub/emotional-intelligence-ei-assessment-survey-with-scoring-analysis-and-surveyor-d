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
    id: "messi-getafe-2007",
    title: "Messi Solo Goal vs Getafe — Copa del Rey 2007",
    description:
      "Often called the best goal ever scored, Messi collected the ball in his own half and dribbled past six defenders before slotting home — a carbon copy of Maradona's goal of the century.",
    videoId: "gAZHVYAkKIY",
    watchUrl: "https://www.youtube.com/watch?v=gAZHVYAkKIY",
    category: "goals",
  },
  {
    id: "van-basten-euro-1988",
    title: "Van Basten Volley — Euro 1988 Final",
    description:
      "Marco van Basten's impossible volley from an extreme angle in the European Championship final remains one of the greatest goals in football history.",
    videoId: "6eMCIHkFXWU",
    watchUrl: "https://www.youtube.com/watch?v=6eMCIHkFXWU",
    category: "goals",
  },
  {
    id: "bergkamp-newcastle-2002",
    title: "Bergkamp vs Newcastle — Premier League 2002",
    description:
      "Dennis Bergkamp's first touch and instantaneous turn past the defender before finishing is still described as the greatest Premier League goal ever.",
    videoId: "VDX7GlQ1QSU",
    watchUrl: "https://www.youtube.com/watch?v=VDX7GlQ1QSU",
    category: "goals",
  },
  {
    id: "puskas-wonder-goal-1962",
    title: "Puskás Volley — Real Madrid vs Atletico 1959",
    description:
      "Ferenc Puskás demonstrates his legendary left foot with a thunderous volley. The Puskás Award was named in his honour for goals exactly like this.",
    videoId: "5b0CZiEAVlI",
    watchUrl: "https://www.youtube.com/watch?v=5b0CZiEAVlI",
    category: "goals",
  },
  // Skills
  {
    id: "george-best-skills",
    title: "George Best — The Greatest Dribbler",
    description:
      "George Best's mesmerising dribbles, flicks, and feints for Manchester United that earned him the nickname 'The Fifth Beatle' and made him a global superstar.",
    videoId: "riC8RaEHG40",
    watchUrl: "https://www.youtube.com/watch?v=riC8RaEHG40",
    category: "skills",
  },
  {
    id: "jay-jay-okocha",
    title: "Jay-Jay Okocha — Africa's Wizard",
    description:
      "Okocha's jaw-dropping skill moves, elasticos, and nutmegs from his time at PSG, Bolton and Nigeria. So good they named him twice.",
    videoId: "xBN8IgKXVIo",
    watchUrl: "https://www.youtube.com/watch?v=xBN8IgKXVIo",
    category: "skills",
  },
  {
    id: "robinho-skills",
    title: "Robinho — Brazilian Flair & Magic",
    description:
      "Robinho's breathtaking footwork and audacious flicks at Real Madrid and Manchester City. Pure Brazilian flair at its finest.",
    videoId: "5iFMkCBenVM",
    watchUrl: "https://www.youtube.com/watch?v=5iFMkCBenVM",
    category: "skills",
  },
  {
    id: "quaresma-trivela",
    title: "Ricardo Quaresma — The Trivela Master",
    description:
      "Quaresma's trademark outside-of-the-boot trivela shots and crosses that baffled goalkeepers and delighted fans worldwide.",
    videoId: "Cd0wuqMUlcQ",
    watchUrl: "https://www.youtube.com/watch?v=Cd0wuqMUlcQ",
    category: "skills",
  },
  // Saves
  {
    id: "gordon-banks-pele-1970",
    title: "Gordon Banks Save vs Pelé — World Cup 1970",
    description:
      "Pelé called it the greatest save he ever saw. Banks somehow got down to scoop Pelé's downward header over the bar in what is universally described as the save of the century.",
    videoId: "JFKEMF4MDQY",
    watchUrl: "https://www.youtube.com/watch?v=JFKEMF4MDQY",
    category: "saves",
  },
  {
    id: "schmeichel-best-saves",
    title: "Peter Schmeichel — The Great Dane",
    description:
      "Peter Schmeichel's most spectacular stops for Manchester United and Denmark — the spread-eagle saves that defined an era and made him the best goalkeeper of his generation.",
    videoId: "NQ0UFpVJMcA",
    watchUrl: "https://www.youtube.com/watch?v=NQ0UFpVJMcA",
    category: "saves",
  },
  {
    id: "yashin-saves",
    title: "Lev Yashin — The Black Spider",
    description:
      "Lev Yashin, the only goalkeeper to win the Ballon d'Or, making extraordinary saves in an era where football was raw and unforgiving.",
    videoId: "EFdY7lHBCMk",
    watchUrl: "https://www.youtube.com/watch?v=EFdY7lHBCMk",
    category: "saves",
  },
  // Iconic
  {
    id: "liverpool-istanbul-2005",
    title: "The Istanbul Miracle — UCL Final 2005",
    description:
      "Liverpool were 3-0 down at half-time against AC Milan. What happened in the second half is the greatest comeback in Champions League history. Six minutes changed everything.",
    videoId: "0b83rH0GRNY",
    watchUrl: "https://www.youtube.com/watch?v=0b83rH0GRNY",
    category: "iconic",
  },
  {
    id: "maradona-hand-of-god-1986",
    title: "Maradona — Hand of God & Goal of Century 1986",
    description:
      "The two most iconic moments from one player in a single match. First the controversial 'Hand of God', then the greatest goal ever scored — in five minutes, Maradona made history.",
    videoId: "sQZcHCuGg-Y",
    watchUrl: "https://www.youtube.com/watch?v=sQZcHCuGg-Y",
    category: "iconic",
  },
  {
    id: "treble-1999-united",
    title: "Man Utd Treble — UCL Final 1999",
    description:
      "1-0 down in injury time against Bayern Munich. Then Sheringham. Then Solskjaer. The most dramatic Champions League final finish ever — the Treble was won.",
    videoId: "bNKy4Xs0e6A",
    watchUrl: "https://www.youtube.com/watch?v=bNKy4Xs0e6A",
    category: "iconic",
  },
  {
    id: "leicester-title-2016",
    title: "Leicester City Win the Premier League 2016",
    description:
      "5000/1 outsiders, Leicester City defied every prediction to win the Premier League in the most extraordinary title win the sport has ever seen.",
    videoId: "qdMiWVIRoHY",
    watchUrl: "https://www.youtube.com/watch?v=qdMiWVIRoHY",
    category: "iconic",
  },
];
