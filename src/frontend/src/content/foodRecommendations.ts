export type AgeGroup = "youth" | "adult" | "senior";

export interface AgeGroupInfo {
  label: string;
  description: string;
  ageRange: string;
}

export const ageGroups: Record<AgeGroup, AgeGroupInfo> = {
  youth: {
    label: "Youth",
    description: "Growing athletes need extra nutrients",
    ageRange: "12-18 years",
  },
  adult: {
    label: "Adult",
    description: "Peak performance nutrition",
    ageRange: "19-35 years",
  },
  senior: {
    label: "Senior",
    description: "Maintain strength and mobility",
    ageRange: "36+ years",
  },
};

export const ageGroupRecommendations: Record<AgeGroup, string[]> = {
  youth: [
    "Banana",
    "Chicken Breast",
    "Sweet Potato",
    "Oatmeal",
    "Greek Yogurt",
    "Eggs",
    "Brown Rice",
    "Blueberries",
  ],
  adult: [
    "Chicken Breast",
    "Salmon",
    "Sweet Potato",
    "Quinoa",
    "Greek Yogurt",
    "Spinach",
    "Almonds",
    "Eggs",
  ],
  senior: [
    "Salmon",
    "Greek Yogurt",
    "Spinach",
    "Blueberries",
    "Almonds",
    "Oatmeal",
    "Sweet Potato",
    "Eggs",
  ],
};
