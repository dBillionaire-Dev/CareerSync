import { JobStage, stageLabels, stageColors } from '@/types/job';
import { cn } from '@/lib/utils';

interface StageBadgeProps {
  stage: JobStage;
  className?: string;
}

export const StageBadge = ({ stage, className }: StageBadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-all duration-200',
        stageColors[stage],
        className
      )}
    >
      {stageLabels[stage]}
    </span>
  );
};
