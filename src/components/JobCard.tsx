import { Job } from '@/types/job';
import { StageBadge } from './StageBadge';
import { InterestStars } from './InterestStars';
import { LocationBadge } from './LocationBadge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, DollarSign, Calendar, Pencil, Eye, Trash2, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface JobCardProps {
  job: Job;
  onClick?: () => void;
  onEdit?: () => void;
  onView?: () => void;
  onDelete?: () => void;
  onFollowUp?: () => void;
  className?: string;
}

export const JobCard = ({ job, onClick, onEdit, onView, onDelete, onFollowUp, className }: JobCardProps) => {
  return (
    <Card
      onClick={onClick}
      className={cn(
        'group p-5 cursor-pointer transition-all duration-300 h-full flex flex-col',
        'hover:shadow-lg hover:border-primary/20 hover:-translate-y-0.5',
        'bg-card border-border/50',
        className
      )}
    >
      <div className="flex items-start justify-between gap-4 flex-1">
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center font-bold text-primary text-sm shrink-0">
              {job.company.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                {job.role}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{job.company}</p>
            </div>
          </div>
          
          <LocationBadge type={job.locationType} location={job.location} className="mb-3" />
          
          <div className="flex items-center gap-2 flex-wrap mt-auto">
            <StageBadge stage={job.stage} />
            <InterestStars score={job.interestScore} />
            
            {job.salary && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <DollarSign size={12} />
                {job.salary}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2 shrink-0">
          {/* Quick action buttons */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-primary"
              onClick={(e) => { e.stopPropagation(); onEdit?.(); }}
              title="Edit"
            >
              <Pencil size={14} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-primary"
              onClick={(e) => { e.stopPropagation(); onView?.(); }}
              title="View"
            >
              <Eye size={14} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-stage-interviewing"
              onClick={(e) => { e.stopPropagation(); onFollowUp?.(); }}
              title="Schedule Follow-up"
            >
              <Mail size={14} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
              title="Delete"
            >
              <Trash2 size={14} />
            </Button>
          </div>

          {job.url && (
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-primary"
            >
              <ExternalLink size={16} />
            </a>
          )}
          
          {job.appliedAt && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar size={12} />
              {format(new Date(job.appliedAt), 'MMM d')}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};