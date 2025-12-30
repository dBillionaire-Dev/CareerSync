import { useMemo } from 'react';
import { differenceInDays } from 'date-fns';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface ContactFollowUpFlagProps {
  lastContactedAt?: string;
  className?: string;
}

export const ContactFollowUpFlag = ({ lastContactedAt, className }: ContactFollowUpFlagProps) => {
  const status = useMemo(() => {
    if (!lastContactedAt) {
      return { type: 'warning', message: 'Never contacted', icon: AlertCircle };
    }

    const daysSinceContact = differenceInDays(new Date(), new Date(lastContactedAt));

    if (daysSinceContact >= 7) {
      return { 
        type: 'danger', 
        message: `${daysSinceContact} days since last contact - follow up needed!`, 
        icon: AlertCircle 
      };
    } else if (daysSinceContact >= 5) {
      return { 
        type: 'warning', 
        message: `${daysSinceContact} days since last contact`, 
        icon: Clock 
      };
    } else {
      return { 
        type: 'ok', 
        message: `Contacted ${daysSinceContact} day${daysSinceContact === 1 ? '' : 's'} ago`, 
        icon: CheckCircle 
      };
    }
  }, [lastContactedAt]);

  const StatusIcon = status.icon;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            'inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium cursor-help transition-colors',
            status.type === 'danger' && 'bg-destructive/10 text-destructive animate-pulse',
            status.type === 'warning' && 'bg-stage-applying/10 text-stage-applying',
            status.type === 'ok' && 'bg-stage-accepted/10 text-stage-accepted',
            className
          )}
        >
          <StatusIcon size={12} />
          <span className="hidden sm:inline">
            {status.type === 'danger' ? 'Follow Up!' : status.type === 'warning' ? 'Soon' : 'OK'}
          </span>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{status.message}</p>
      </TooltipContent>
    </Tooltip>
  );
};
