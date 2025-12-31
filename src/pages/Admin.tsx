import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { 
  Users, 
  MessageSquare, 
  BarChart3, 
  Lock, 
  Mail, 
  Eye, 
  Trash2, 
  TrendingUp,
  UserCheck,
  Briefcase,
  Clock,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for demo
const mockMessages = [
  { id: 1, name: 'John Doe', email: 'john@example.com', subject: 'Feature Request', message: 'Would love to see an AI resume builder...', date: '2024-01-15', read: false },
  { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', subject: 'Bug Report', message: 'The calendar is not loading properly...', date: '2024-01-14', read: true },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', subject: 'Pricing Question', message: 'Is there a team plan available?', date: '2024-01-13', read: true },
];

const mockUsers = [
  { id: 1, name: 'Alice Brown', email: 'alice@example.com', jobs: 12, lastActive: '2 hours ago', status: 'active' },
  { id: 2, name: 'Bob Wilson', email: 'bob@example.com', jobs: 8, lastActive: '1 day ago', status: 'active' },
  { id: 3, name: 'Carol Davis', email: 'carol@example.com', jobs: 25, lastActive: '5 mins ago', status: 'active' },
  { id: 4, name: 'David Lee', email: 'david@example.com', jobs: 3, lastActive: '1 week ago', status: 'inactive' },
];

const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo password - in production this would be a secure backend auth
    if (password === 'admin123') {
      localStorage.setItem('adminAuth', 'true');
      onLogin();
      toast({ title: 'Welcome, Admin', description: 'You are now logged in.' });
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Lock size={32} className="text-primary" />
          </div>
          <CardTitle className="text-2xl">Admin Access</CardTitle>
          <CardDescription>Enter the admin password to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
            <Button type="submit" className="w-full gradient-hero text-primary-foreground">
              Access Dashboard
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Demo password: admin123
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const AdminDashboard = () => {
  const [messages, setMessages] = useState(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState<typeof mockMessages[0] | null>(null);
  const { toast } = useToast();

  const openMessage = (msg: typeof mockMessages[0]) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      setMessages(msgs => msgs.map(m => m.id === msg.id ? { ...m, read: true } : m));
    }
  };

  const markAsRead = (id: number) => {
    setMessages(msgs => msgs.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const deleteMessage = (id: number) => {
    setMessages(msgs => msgs.filter(m => m.id !== id));
    setSelectedMessage(null);
    toast({ title: 'Message deleted' });
  };

  const stats = [
    { label: 'Total Users', value: '1,247', icon: Users, change: '+12%' },
    { label: 'Active Jobs', value: '8,432', icon: Briefcase, change: '+8%' },
    { label: 'Messages', value: messages.filter(m => !m.read).length.toString(), icon: MessageSquare, change: 'unread' },
    { label: 'Avg. Session', value: '24 min', icon: Clock, change: '+5%' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
              <Lock size={20} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">CareerSync Management</p>
            </div>
          </Link>
          <Button 
            variant="outline" 
            onClick={() => {
              localStorage.removeItem('adminAuth');
              window.location.reload();
            }}
          >
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-border/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <stat.icon size={24} className="text-primary" />
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm text-stage-offer">
                  <TrendingUp size={14} className="mr-1" />
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="messages" className="space-y-4">
          <TabsList>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare size={16} />
              Messages
              {messages.filter(m => !m.read).length > 0 && (
                <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {messages.filter(m => !m.read).length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users size={16} />
              Users
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 size={16} />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Contact Messages</CardTitle>
                <CardDescription>Messages received from the homepage contact form</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>From</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messages.map((msg) => (
                      <TableRow 
                        key={msg.id} 
                        className={`cursor-pointer hover:bg-muted/50 transition-colors ${!msg.read ? 'bg-primary/5' : ''}`}
                        onClick={() => openMessage(msg)}
                      >
                        <TableCell>
                          <div>
                            <p className="font-medium">{msg.name}</p>
                            <p className="text-sm text-muted-foreground">{msg.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="font-medium">{msg.subject}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">{msg.message}</p>
                        </TableCell>
                        <TableCell>{msg.date}</TableCell>
                        <TableCell>
                          <Badge variant={msg.read ? 'secondary' : 'default'}>
                            {msg.read ? 'Read' : 'New'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                            {!msg.read && (
                              <Button size="sm" variant="ghost" onClick={() => markAsRead(msg.id)}>
                                <Eye size={14} />
                              </Button>
                            )}
                            <Button size="sm" variant="ghost" className="text-destructive" onClick={() => deleteMessage(msg.id)}>
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
                <CardDescription>Manage and view user activity</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Jobs Tracked</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-medium text-primary">
                                {user.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{user.jobs}</TableCell>
                        <TableCell>{user.lastActive}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                            {user.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Platform Analytics</CardTitle>
                <CardDescription>Overview of platform usage and metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="p-6 rounded-lg border border-border bg-card">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-stage-offer/10 flex items-center justify-center">
                        <UserCheck size={24} className="text-stage-offer" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">847</p>
                        <p className="text-sm text-muted-foreground">New signups this month</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 rounded-lg border border-border bg-card">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Briefcase size={24} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">3,291</p>
                        <p className="text-sm text-muted-foreground">Jobs added this week</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 rounded-lg border border-border bg-card">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-stage-interviewing/10 flex items-center justify-center">
                        <TrendingUp size={24} className="text-stage-interviewing" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">68%</p>
                        <p className="text-sm text-muted-foreground">User retention rate</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Message Detail Dialog */}
        <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{selectedMessage?.subject}</DialogTitle>
              <DialogDescription>
                From: {selectedMessage?.name} ({selectedMessage?.email})
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Received: {selectedMessage?.date}
              </p>
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-foreground whitespace-pre-wrap">{selectedMessage?.message}</p>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                  Close
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => selectedMessage && deleteMessage(selectedMessage.id)}
                >
                  <Trash2 size={14} className="mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('adminAuth') === 'true';
  });

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return <AdminDashboard />;
};

export default Admin;
