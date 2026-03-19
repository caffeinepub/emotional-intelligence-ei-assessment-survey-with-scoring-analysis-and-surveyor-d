import { Button } from "@/components/ui/button";
import { type AgeGroup, ageGroups } from "../../content/foodRecommendations";

interface AgeGroupSelectorProps {
  selectedAgeGroup: AgeGroup;
  onAgeGroupChange: (ageGroup: AgeGroup) => void;
}

export default function AgeGroupSelector({
  selectedAgeGroup,
  onAgeGroupChange,
}: AgeGroupSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        {(Object.keys(ageGroups) as AgeGroup[]).map((ageGroup) => {
          const info = ageGroups[ageGroup];
          const isSelected = selectedAgeGroup === ageGroup;

          return (
            <Button
              key={ageGroup}
              variant={isSelected ? "default" : "outline"}
              onClick={() => onAgeGroupChange(ageGroup)}
              className="h-auto flex-col items-start p-4 text-left"
            >
              <span className="font-semibold text-base">{info.label}</span>
              <span className="text-xs opacity-80">{info.ageRange}</span>
            </Button>
          );
        })}
      </div>
      <p className="text-sm text-muted-foreground text-center">
        {ageGroups[selectedAgeGroup].description}
      </p>
    </div>
  );
}
