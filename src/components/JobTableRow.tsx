import { Job } from '@/types/job';
import { StageBadge } from './StageBadge';
import { InterestStars } from './InterestStars';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Eye, Trash2, Mail } from 'lucide-react';
import { format } from 'date-fns';
import { TableCell, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface JobTableRowProps {
  job: Job;
  onEdit?: (job: Job) => void;
  onView?: (job: Job) => void;
  onDelete?: (job: Job) => void;
  onFollowUp?: (job: Job) => void;
  compact?: boolean;
}

const followUpStatus = (job: Job): 'Sent' | 'Pending' | 'None' => {
  const hasFollowup = job.timeline.some((t) => t.type === 'followup');
  if (hasFollowup) return 'Sent';
  if (['applying', 'interviewing'].includes(job.stage)) return 'Pending';
  return 'None';
};

const followUpColors: Record<string, string> = {
  Sent: 'bg-stage-offer/10 text-stage-offer border-stage-offer/30',
  Pending: 'bg-stage-withdrawn/10 text-stage-withdrawn border-stage-withdrawn/30',
  None: 'bg-muted text-muted-foreground border-border',
};

export function JobTableRow({ job, onEdit, onView, onDelete, onFollowUp }: JobTableRowProps) {
  const status = followUpStatus(job);

  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-stage-offer" />
          <span className="font-medium">{job.company}</span>
        </div>
      </TableCell>
      <TableCell>{job.role}</TableCell>
      <TableCell>
        <StageBadge stage={job.stage} />
      </TableCell>
      <TableCell>
        <InterestStars score={job.interestScore} />
      </TableCell>
      <TableCell className="capitalize">{job.locationType}</TableCell>
      <TableCell>
        <Badge variant="outline" className={cn('text-xs', followUpColors[status])}>
          {status}
        </Badge>
      </TableCell>
      <TableCell className="text-muted-foreground">
        {format(new Date(job.updatedAt), 'MMM d, yyyy')}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-primary"
            onClick={() => onEdit?.(job)}
            title="Edit"
          >
            <Pencil size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-primary"
            onClick={() => onView?.(job)}
            title="View"
          >
            <Eye size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-stage-interviewing"
            onClick={() => onFollowUp?.(job)}
            title="Schedule Follow-up"
          >
            <Mail size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => onDelete?.(job)}
            title="Delete"
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}