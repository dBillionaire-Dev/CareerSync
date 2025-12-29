import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Job, JobStage, stageLabels } from '@/types/job';
import { KanbanColumn } from './KanbanColumn';
import { KanbanCard } from './KanbanCard';
import { jobsApi } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface KanbanBoardProps {
  jobs: Job[];
  onJobUpdate?: (jobId: string, stage: JobStage) => void;
  onEdit: (job: Job) => void;
  onView: (job: Job) => void;
  onDelete: (job: Job) => void;
}

const kanbanStages: JobStage[] = ['applying', 'interviewing', 'offer', 'rejected'];

export const KanbanBoard = ({ jobs, onJobUpdate, onEdit, onView, onDelete }: KanbanBoardProps) => {
  const { toast } = useToast();
  const [activeJob, setActiveJob] = useState<Job | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const getJobsByStage = (stage: JobStage) => jobs.filter((job) => job.stage === stage);

  const handleDragStart = (event: DragStartEvent) => {
    const job = jobs.find((j) => j.id === event.active.id);
    if (job) setActiveJob(job);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveJob(null);

    if (!over) return;

    const jobId = active.id as string;
    const newStage = over.id as JobStage;
    const job = jobs.find((j) => j.id === jobId);

    if (!job || job.stage === newStage) return;

    // Optimistic update
    onJobUpdate?.(jobId, newStage);

    try {
      await jobsApi.update(jobId, { stage: newStage });
      toast({
        title: 'Status updated',
        description: `${job.company} moved to ${stageLabels[newStage]}`,
      });
    } catch (error) {
      // Revert on error
      onJobUpdate?.(jobId, job.stage);
      toast({
        title: 'Update failed',
        description: 'Could not update job status. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 overflow-x-auto pb-4">
        {kanbanStages.map((stage) => (
          <KanbanColumn key={stage} stage={stage} jobs={getJobsByStage(stage)}>
            <SortableContext
              items={getJobsByStage(stage).map((j) => j.id)}
              strategy={verticalListSortingStrategy}
            >
              {getJobsByStage(stage).map((job) => (
                <KanbanCard
                  key={job.id}
                  job={job}
                  onEdit={() => onEdit(job)}
                  onView={() => onView(job)}
                  onDelete={() => onDelete(job)}
                />
              ))}
            </SortableContext>
          </KanbanColumn>
        ))}
      </div>

      <DragOverlay>
        {activeJob ? (
          <KanbanCard job={activeJob} isDragging />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
