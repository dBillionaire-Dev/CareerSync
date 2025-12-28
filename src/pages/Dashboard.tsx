import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Clock, CheckCircle2, Ghost, Plus, ArrowRight } from 'lucide-react';
import { mockJobs } from '@/data/mockJobs';
import { StageBadge } from '@/components/StageBadge';
import { JobStage, stageLabels } from '@/types/job';
import { format } from 'date-fns';

const stageChartColors: Record<JobStage, string> = {
  tagged: '#71717a', applying: '#0ea5e9', interviewing: '#f59e0b', offer: '#22c55e',
  accepted: '#22c55e', withdrawn: '#f59e0b', rejected: '#ef4444', ghosting: '#8b5cf6',
};

const Dashboard = () => {
  const stats = useMemo(() => {
    const activeJobs = mockJobs.filter((j) => !j.isArchived);
    const stages = activeJobs.reduce((acc, job) => { acc[job.stage] = (acc[job.stage] || 0) + 1; return acc; }, {} as Record<JobStage, number>);
    const ghostingRate = activeJobs.length > 0 ? Math.round(((stages.ghosting || 0) / activeJobs.length) * 100) : 0;
    return { total: activeJobs.length, interviewing: stages.interviewing || 0, offers: (stages.offer || 0) + (stages.accepted || 0), ghostingRate, stages };
  }, []);

  const recentJobs = mockJobs.filter((j) => !j.isArchived).slice(0, 5);

  return (
    <div className="p-6 lg:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">A quick glance at your current workload</p>
        </div>
        <Link to="/dashboard/jobs/new">
          <Button className="gradient-hero text-primary-foreground font-semibold shadow-glow hover:opacity-90">
            <Plus size={18} className="mr-2" /> New job
          </Button>
        </Link>
      </div>

      {/* Pipeline Snapshot */}
      <Card className="border-border/50">
        <CardHeader><CardTitle>Pipeline snapshot</CardTitle><CardDescription>A quick glance at your current workload</CardDescription></CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 rounded-lg bg-muted/50"><p className="text-sm text-muted-foreground">Active jobs</p><p className="text-3xl font-bold">{stats.total}</p></div>
            <div className="p-4 rounded-lg bg-muted/50"><p className="text-sm text-muted-foreground">Interviewing</p><p className="text-3xl font-bold">{stats.interviewing}</p></div>
            <div className="p-4 rounded-lg bg-muted/50"><p className="text-sm text-muted-foreground">Offers</p><p className="text-3xl font-bold">{stats.offers}</p></div>
            <div className="p-4 rounded-lg bg-muted/50"><p className="text-sm text-muted-foreground">Ghosting rate</p><p className="text-3xl font-bold">{stats.ghostingRate}%</p></div>
          </div>
        </CardContent>
      </Card>

      {/* Next Actions & Quick Links */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50">
          <CardHeader><CardTitle>Next actions</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary" /><span className="text-sm">Send follow-ups on pending applications</span></div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary" /><span className="text-sm">Update stages after interviews</span></div>
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary" /><span className="text-sm">Archive jobs that are unresponsive</span></div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardHeader><CardTitle>Quick links</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Link to="/dashboard/jobs"><Button variant="outline">Manage jobs</Button></Link>
            <Link to="/dashboard/analytics"><Button variant="outline">Analytics</Button></Link>
            <Link to="/dashboard/timeline"><Button variant="outline">Timeline</Button></Link>
          </CardContent>
        </Card>
      </div>

      {/* Recently Updated */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <div><CardTitle>Recently updated</CardTitle><CardDescription>Jump back into what changed most recently</CardDescription></div>
          <Link to="/dashboard/jobs"><Button variant="ghost" size="sm" className="text-primary">View All <ArrowRight size={16} className="ml-1" /></Button></Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border/50"><th className="text-left py-2 font-medium text-muted-foreground">Company</th><th className="text-left py-2 font-medium text-muted-foreground">Role</th><th className="text-left py-2 font-medium text-muted-foreground">Stage</th><th className="text-left py-2 font-medium text-muted-foreground">Updated</th></tr></thead>
              <tbody>
                {recentJobs.map((job) => (
                  <tr key={job.id} className="border-b border-border/30 hover:bg-muted/50"><td className="py-3 font-medium">{job.company}</td><td className="py-3 text-muted-foreground">{job.role}</td><td className="py-3"><StageBadge stage={job.stage} /></td><td className="py-3 text-muted-foreground">{format(new Date(job.updatedAt), 'MMM d, yyyy')}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Stage Breakdown */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <div><CardTitle>Stage breakdown</CardTitle><CardDescription>Counts by pipeline stage</CardDescription></div>
          <Link to="/dashboard/analytics"><Button variant="ghost" size="sm" className="text-primary">Open analytics <ArrowRight size={16} className="ml-1" /></Button></Link>
        </CardHeader>
        <CardContent className="space-y-4">
          {(Object.keys(stageLabels) as JobStage[]).map((stage) => {
            const count = stats.stages[stage] || 0;
            const percentage = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
            return (
              <div key={stage} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: stageChartColors[stage] }} /><span>{stageLabels[stage]}</span></div>
                  <span className="text-muted-foreground">{count} ({percentage}%)</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden"><div className="h-full rounded-full transition-all" style={{ width: `${percentage}%`, backgroundColor: stageChartColors[stage] }} /></div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
