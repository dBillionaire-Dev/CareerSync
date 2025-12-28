import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StageBadge } from '@/components/StageBadge';
import { mockJobs } from '@/data/mockJobs';
import { TimelineEntry, Job } from '@/types/job';
import { Clock, FileText, MessageSquare, Gift, Calendar, User, Users, ExternalLink, ArrowRight, Search } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const timelineIcons: Record<TimelineEntry['type'], typeof Clock> = { interview: Users, followup: MessageSquare, offer: Gift, note: FileText, application: Calendar };
const timelineColors: Record<TimelineEntry['type'], string> = { interview: 'bg-stage-interviewing', followup: 'bg-stage-applying', offer: 'bg-stage-offer', note: 'bg-muted-foreground', application: 'bg-primary' };

const TimelineItem = ({ entry, job, isLast }: { entry: TimelineEntry; job: Job; isLast: boolean }) => {
  const Icon = timelineIcons[entry.type];
  return (
    <div className="relative flex gap-4">
      {!isLast && <div className="absolute left-5 top-12 w-0.5 h-[calc(100%-24px)] bg-border" />}
      <div className={cn('relative z-10 flex items-center justify-center w-10 h-10 rounded-full shrink-0', timelineColors[entry.type])}><Icon size={18} className="text-primary-foreground" /></div>
      <Card className="flex-1 border-border/50 hover:border-primary/20 transition-colors">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div><h4 className="font-semibold">{entry.title}</h4><div className="flex items-center gap-2 mt-1"><span className="text-sm text-muted-foreground">{entry.type.toUpperCase()} • {format(new Date(entry.date), 'MMM d, yyyy')} • {job.company} — {job.role}</span></div></div>
            <StageBadge stage={job.stage} className="text-[10px] px-2 py-0" />
          </div>
          {entry.description && <p className="text-sm text-muted-foreground mb-3">{entry.description}</p>}
          {entry.resumeLink && <a href={entry.resumeLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-primary hover:underline text-sm">Open link <ArrowRight size={14} /></a>}
        </CardContent>
      </Card>
    </div>
  );
};

const Timeline = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const timelineItems = useMemo(() => {
    const items: { entry: TimelineEntry; job: Job }[] = [];
    mockJobs.forEach((job) => { job.timeline.forEach((entry) => { items.push({ entry, job }); }); });
    return items.sort((a, b) => new Date(b.entry.date).getTime() - new Date(a.entry.date).getTime());
  }, []);

  const filteredItems = useMemo(() => {
    if (!searchQuery) return timelineItems;
    const q = searchQuery.toLowerCase();
    return timelineItems.filter(({ job }) => job.company.toLowerCase().includes(q) || job.role.toLowerCase().includes(q));
  }, [timelineItems, searchQuery]);

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div><h1 className="text-3xl font-bold tracking-tight">Timeline</h1><p className="text-muted-foreground mt-1">Track all your job search activities</p></div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <Input placeholder="Filter by company or role..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Timeline List */}
        <div className="lg:col-span-2 space-y-6">
          {filteredItems.length > 0 ? filteredItems.map((item, index) => <TimelineItem key={`${item.job.id}-${item.entry.id}`} entry={item.entry} job={item.job} isLast={index === filteredItems.length - 1} />) : (
            <Card className="p-12 text-center border-border/50"><div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center"><Clock size={24} className="text-muted-foreground" /></div><h3 className="font-semibold text-lg mb-2">No timeline entries</h3><p className="text-muted-foreground">{searchQuery ? 'Try a different search' : 'Add entries to your job applications'}</p></Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="border-border/50">
            <CardHeader><CardTitle>Timeline tips</CardTitle><CardDescription>Suggested entry types</CardDescription></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2"><span className="w-2 h-2 rounded-full bg-stage-interviewing mt-2" /><span className="text-sm"><strong>Interview</strong> — date, panel names, focus areas</span></div>
              <div className="flex items-start gap-2"><span className="w-2 h-2 rounded-full bg-stage-applying mt-2" /><span className="text-sm"><strong>Recruiter</strong> — email, phone, LinkedIn</span></div>
              <div className="flex items-start gap-2"><span className="w-2 h-2 rounded-full bg-stage-offer mt-2" /><span className="text-sm"><strong>Resume/Cover letter</strong> — attach links</span></div>
              <div className="flex items-start gap-2"><span className="w-2 h-2 rounded-full bg-muted-foreground mt-2" /><span className="text-sm"><strong>Notes</strong> — negotiation prep and follow-up reminders</span></div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader><CardTitle>Quick action</CardTitle><CardDescription>Add an entry to a job</CardDescription></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Open a job and click <strong>Add entry</strong>.</p>
              <Link to="/dashboard/jobs"><Button variant="outline" className="w-full">Open jobs <ArrowRight size={16} className="ml-2" /></Button></Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
