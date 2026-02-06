import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface LikertScaleProps {
  questionNumber: number;
  statement: string;
  value: number | null;
  onChange: (value: number) => void;
}

export default function LikertScale({ questionNumber, statement, value, onChange }: LikertScaleProps) {
  const options = [1, 2, 3, 4, 5];

  return (
    <div className="space-y-3 p-4 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors">
      <div className="flex gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
          {questionNumber}
        </div>
        <Label className="text-base font-normal leading-relaxed flex-1 cursor-pointer">
          {statement}
        </Label>
      </div>
      
      <div className="flex gap-2 ml-11">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              'flex-1 h-12 rounded-lg border-2 font-semibold text-lg transition-all',
              'hover:border-primary/50 hover:bg-primary/5',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
              value === option
                ? 'border-primary bg-primary text-primary-foreground shadow-md scale-105'
                : 'border-border bg-background text-foreground'
            )}
            aria-label={`Rate ${option} out of 5`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
