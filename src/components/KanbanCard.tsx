import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Job } from '@/types/job';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InterestStars } from './InterestStars';
import { Pencil, Eye, Trash2, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KanbanCardProps {
  job: Job;
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void;
  isDragging?: boolean;
}

export const KanbanCard = ({ job, onEdit, onView, onDelete, isDragging }: KanbanCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: job.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        'p-3 cursor-grab active:cursor-grabbing group transition-all',
        'hover:border-primary/30 bg-card border-border/50',
        (isDragging || isSortableDragging) && 'opacity-50 shadow-lg rotate-2'
      )}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start gap-2">
        <GripVertical size={14} className="text-muted-foreground mt-1 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center font-bold text-primary text-xs shrink-0">
              {job.company.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-sm truncate">{job.role}</p>
              <p className="text-xs text-muted-foreground truncate">{job.company}</p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <InterestStars score={job.interestScore} size="sm" />
            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => { e.stopPropagation(); onEdit?.(); }}
              >
                <Pencil size={12} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => { e.stopPropagation(); onView?.(); }}
              >
                <Eye size={12} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 hover:text-destructive"
                onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
              >
                <Trash2 size={12} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
