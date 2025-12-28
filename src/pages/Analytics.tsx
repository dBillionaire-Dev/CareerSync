import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import { TrendingUp, PieChartIcon, Activity, Target } from 'lucide-react';
import { mockJobs } from '@/data/mockJobs';
import { JobStage, stageLabels } from '@/types/job';

const stageChartColors: Record<JobStage, string> = {
  tagged: '#71717a',
  applying: '#0ea5e9',
  interviewing: '#8b5cf6',
  offer: '#22c55e',
  accepted: '#16a34a',
  withdrawn: '#f59e0b',
  rejected: '#ef4444',
  ghosting: '#737373',
};

const Analytics = () => {
  const stageData = useMemo(() => {
    const activeJobs = mockJobs.filter((j) => !j.isArchived);
    const stages = activeJobs.reduce((acc, job) => {
      acc[job.stage] = (acc[job.stage] || 0) + 1;
      return acc;
    }, {} as Record<JobStage, number>);

    return Object.entries(stages).map(([stage, count]) => ({
      name: stageLabels[stage as JobStage],
      value: count,
      fill: stageChartColors[stage as JobStage],
    }));
  }, []);

  const locationData = useMemo(() => {
    const activeJobs = mockJobs.filter((j) => !j.isArchived);
    const locations = activeJobs.reduce((acc, job) => {
      acc[job.locationType] = (acc[job.locationType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const colors = { remote: '#0ea5e9', hybrid: '#8b5cf6', onsite: '#f59e0b' };
    const labels = { remote: 'Remote', hybrid: 'Hybrid', onsite: 'On-site' };

    return Object.entries(locations).map(([type, count]) => ({
      name: labels[type as keyof typeof labels],
      value: count,
      fill: colors[type as keyof typeof colors],
    }));
  }, []);

  const monthlyData = useMemo(() => {
    // Simulated monthly data
    return [
      { month: 'Sep', applications: 12, interviews: 4, offers: 0 },
      { month: 'Oct', applications: 18, interviews: 6, offers: 1 },
      { month: 'Nov', applications: 15, interviews: 5, offers: 1 },
      { month: 'Dec', applications: 22, interviews: 8, offers: 2 },
      { month: 'Jan', applications: 8, interviews: 3, offers: 1 },
    ];
  }, []);

  const interestData = useMemo(() => {
    const activeJobs = mockJobs.filter((j) => !j.isArchived);
    const interests = activeJobs.reduce((acc, job) => {
      const key = `${job.interestScore} Stars`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(interests)
      .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
      .map(([name, value]) => ({ name, value }));
  }, []);

  const stats = useMemo(() => {
    const activeJobs = mockJobs.filter((j) => !j.isArchived);
    const total = activeJobs.length;
    const ghosting = activeJobs.filter((j) => j.stage === 'ghosting').length;
    const offers = activeJobs.filter((j) => j.stage === 'offer' || j.stage === 'accepted').length;
    const interviewing = activeJobs.filter((j) => j.stage === 'interviewing').length;

    return {
      responseRate: total > 0 ? Math.round(((total - ghosting) / total) * 100) : 0,
      interviewRate: total > 0 ? Math.round((interviewing / total) * 100) : 0,
      offerRate: total > 0 ? Math.round((offers / total) * 100) : 0,
      ghostingRate: total > 0 ? Math.round((ghosting / total) * 100) : 0,
    };
  }, []);

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Visualize your job search progress and trends
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Response Rate</p>
                <p className="text-3xl font-bold text-primary">{stats.responseRate}%</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <Activity className="text-primary" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Interview Rate</p>
                <p className="text-3xl font-bold text-stage-interviewing">{stats.interviewRate}%</p>
              </div>
              <div className="p-3 rounded-xl bg-stage-interviewing/10">
                <Target className="text-stage-interviewing" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Offer Rate</p>
                <p className="text-3xl font-bold text-stage-offer">{stats.offerRate}%</p>
              </div>
              <div className="p-3 rounded-xl bg-stage-offer/10">
                <TrendingUp className="text-stage-offer" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ghosting Rate</p>
                <p className="text-3xl font-bold text-stage-ghosting">{stats.ghostingRate}%</p>
              </div>
              <div className="p-3 rounded-xl bg-stage-ghosting/10">
                <PieChartIcon className="text-stage-ghosting" size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Stage Distribution */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon size={20} className="text-primary" />
              Applications by Stage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={false}
                >
                  {stageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Location Distribution */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target size={20} className="text-primary" />
              By Location Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={locationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {locationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trend */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp size={20} className="text-primary" />
            Monthly Activity Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="applications"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: '#8b5cf6' }}
              />
              <Line
                type="monotone"
                dataKey="interviews"
                stroke="#0ea5e9"
                strokeWidth={2}
                dot={{ fill: '#0ea5e9' }}
              />
              <Line
                type="monotone"
                dataKey="offers"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ fill: '#22c55e' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
