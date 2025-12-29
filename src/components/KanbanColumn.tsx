import { useDroppable } from '@dnd-kit/core';
import { JobStage, stageLabels, stageColors } from '@/types/job';
import { Job } from '@/types/job';
import { cn } from '@/lib/utils';

interface KanbanColumnProps {
  stage: JobStage;
  jobs: Job[];
  children: React.ReactNode;
}

export const KanbanColumn = ({ stage, jobs, children }: KanbanColumnProps) => {
  const { isOver, setNodeRef } = useDroppable({ id: stage });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex flex-col min-h-[400px] rounded-xl border border-border/50 bg-muted/30 p-3 transition-colors',
        isOver && 'border-primary/50 bg-primary/5'
      )}
    >
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className={cn('px-2 py-1 rounded-md text-xs font-medium border', stageColors[stage])}>
            {stageLabels[stage]}
          </span>
          <span className="text-xs text-muted-foreground font-medium">
            {jobs.length}
          </span>
        </div>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto">
        {children}
        {jobs.length === 0 && (
          <div className="flex items-center justify-center h-24 text-sm text-muted-foreground border-2 border-dashed border-border/50 rounded-lg">
            Drop jobs here
          </div>
        )}
      </div>
    </div>
  );
};
