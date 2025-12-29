import { useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Job } from '@/types/job';
import { FileText, Printer, Building2, Users, FileEdit, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { useReactToPrint } from 'react-to-print';

interface InterviewCheatSheetProps {
  job: Job;
}

export const InterviewCheatSheet = ({ job }: InterviewCheatSheetProps) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
  });

  const upcomingInterviews = job.timeline?.filter(
    (entry) => entry.type === 'interview' && new Date(entry.date) >= new Date()
  ) || [];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <FileText size={14} className="mr-2" />
          Cheat Sheet
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Interview Cheat Sheet
            <Button variant="outline" size="sm" onClick={() => handlePrint()}>
              <Printer size={14} className="mr-2" />
              Print
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div ref={printRef} className="space-y-6 p-4">
          {/* Header */}
          <div className="flex items-center gap-4 pb-4 border-b border-border/50">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center font-bold text-primary text-xl">
              {job.company.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold">{job.role}</h2>
              <p className="text-muted-foreground">{job.company}</p>
              <p className="text-sm text-muted-foreground">{job.location} • {job.locationType}</p>
            </div>
          </div>

          {/* Company Research */}
          <Card className="p-4 border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <Building2 size={18} className="text-primary" />
              <h3 className="font-semibold">Company Research</h3>
            </div>
            <div className="text-sm text-muted-foreground space-y-2">
              {job.companyResearch ? (
                <p className="whitespace-pre-wrap">{job.companyResearch}</p>
              ) : (
                <p className="italic">No company research notes added yet. Add details about mission, values, and recent news.</p>
              )}
            </div>
          </Card>

          {/* STAR Stories */}
          <Card className="p-4 border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <FileEdit size={18} className="text-primary" />
              <h3 className="font-semibold">STAR Method Stories</h3>
            </div>
            <div className="text-sm text-muted-foreground">
              {job.starStories && job.starStories.length > 0 ? (
                <ul className="space-y-2">
                  {job.starStories.map((story, i) => (
                    <li key={i} className="p-2 bg-muted/50 rounded">
                      <strong>S:</strong> {story.situation}<br />
                      <strong>T:</strong> {story.task}<br />
                      <strong>A:</strong> {story.action}<br />
                      <strong>R:</strong> {story.result}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="italic">No STAR stories linked. Prepare examples from your experience!</p>
              )}
            </div>
          </Card>

          {/* Upcoming Interviews */}
          {upcomingInterviews.length > 0 && (
            <Card className="p-4 border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={18} className="text-primary" />
                <h3 className="font-semibold">Upcoming Interviews</h3>
              </div>
              <div className="space-y-2">
                {upcomingInterviews.map((interview) => (
                  <div key={interview.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <div>
                      <p className="font-medium text-sm">{interview.title}</p>
                      {interview.interviewers && (
                        <p className="text-xs text-muted-foreground">
                          With: {interview.interviewers.join(', ')}
                        </p>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(interview.date), 'MMM d, h:mm a')}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Contacts */}
          <Card className="p-4 border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <Users size={18} className="text-primary" />
              <h3 className="font-semibold">Key Contacts</h3>
            </div>
            <div className="text-sm text-muted-foreground">
              {job.contacts && job.contacts.length > 0 ? (
                <ul className="space-y-1">
                  {job.contacts.map((contact, i) => (
                    <li key={i}>
                      <strong>{contact.name}</strong> - {contact.role}
                      {contact.linkedinUrl && (
                        <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-primary ml-2">
                          LinkedIn
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="italic">No contacts added yet.</p>
              )}
            </div>
          </Card>

          {/* Job Description */}
          {job.description && (
            <Card className="p-4 border-border/50">
              <h3 className="font-semibold mb-3">Job Description</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{job.description}</p>
            </Card>
          )}

          {/* Notes */}
          {job.notes && (
            <Card className="p-4 border-border/50">
              <h3 className="font-semibold mb-3">Your Notes</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{job.notes}</p>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
