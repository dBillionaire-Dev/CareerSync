import { useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Job } from '@/types/job';
import { addDays, differenceInDays, parseISO } from 'date-fns';

interface FollowUpCalendarProps {
  jobs: Job[];
  onJobClick?: (jobId: string) => void;
}

export const FollowUpCalendar = ({ jobs, onJobClick }: FollowUpCalendarProps) => {
  const events = useMemo(() => {
    const calendarEvents: Array<{
      id: string;
      title: string;
      start: string;
      backgroundColor: string;
      borderColor: string;
      extendedProps: { jobId: string; type: string };
    }> = [];

    jobs.forEach((job) => {
      // Application date
      if (job.appliedAt) {
        calendarEvents.push({
          id: `applied-${job.id}`,
          title: `📤 Applied: ${job.company}`,
          start: job.appliedAt,
          backgroundColor: '#0ea5e9',
          borderColor: '#0ea5e9',
          extendedProps: { jobId: job.id, type: 'applied' },
        });

        // Auto follow-up reminder 7 days after application
        const followUpDate = addDays(parseISO(job.appliedAt), 7);
        if (differenceInDays(new Date(), followUpDate) <= 0 && job.stage === 'applying') {
          calendarEvents.push({
            id: `followup-${job.id}`,
            title: `📩 Follow up: ${job.company}`,
            start: followUpDate.toISOString(),
            backgroundColor: '#f59e0b',
            borderColor: '#f59e0b',
            extendedProps: { jobId: job.id, type: 'followup' },
          });
        }
      }

      // Manual follow-up date
      if (job.followUpDate) {
        calendarEvents.push({
          id: `manual-followup-${job.id}`,
          title: `🔔 Reminder: ${job.company}`,
          start: job.followUpDate,
          backgroundColor: '#8b5cf6',
          borderColor: '#8b5cf6',
          extendedProps: { jobId: job.id, type: 'reminder' },
        });
      }

      // Interview dates from timeline
      job.timeline?.forEach((entry) => {
        if (entry.type === 'interview') {
          calendarEvents.push({
            id: entry.id,
            title: `🎤 ${entry.title} - ${job.company}`,
            start: entry.date,
            backgroundColor: '#22c55e',
            borderColor: '#22c55e',
            extendedProps: { jobId: job.id, type: 'interview' },
          });
        }
      });
    });

    return calendarEvents;
  }, [jobs]);

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>Follow-up Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="calendar-wrapper">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={events}
            eventClick={(info) => {
              const jobId = info.event.extendedProps.jobId;
              if (jobId && onJobClick) {
                onJobClick(jobId);
              }
            }}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,dayGridWeek',
            }}
            height="auto"
            eventDisplay="block"
            eventTextColor="#fff"
            dayMaxEvents={3}
          />
        </div>
      </CardContent>
    </Card>
  );
};
