import { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, AlertCircle, Wifi } from 'lucide-react';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api';

type HealthStatus = 'checking' | 'healthy' | 'waking' | 'error';

export const ApiHealthCheck = () => {
  const [status, setStatus] = useState<HealthStatus>('checking');

  useEffect(() => {
    let mounted = true;
    let timeout: NodeJS.Timeout;

    const checkHealth = async () => {
      setStatus('checking');
      
      // Set waking status after 2 seconds if still checking
      timeout = setTimeout(() => {
        if (mounted) setStatus('waking');
      }, 2000);

      try {
        await api.get('/health');
        if (mounted) {
          clearTimeout(timeout);
          setStatus('healthy');
        }
      } catch (error) {
        if (mounted) {
          clearTimeout(timeout);
          setStatus('error');
        }
      }
    };

    checkHealth();

    return () => {
      mounted = false;
      clearTimeout(timeout);
    };
  }, []);

  const statusConfig = {
    checking: {
      icon: <Loader2 size={14} className="animate-spin" />,
      text: 'Connecting...',
      className: 'text-muted-foreground',
    },
    waking: {
      icon: <Loader2 size={14} className="animate-spin" />,
      text: 'Waking up server...',
      className: 'text-amber-500',
    },
    healthy: {
      icon: <CheckCircle2 size={14} />,
      text: 'Server Online',
      className: 'text-green-500',
    },
    error: {
      icon: <AlertCircle size={14} />,
      text: 'Server Offline',
      className: 'text-destructive',
    },
  };

  const config = statusConfig[status];

  return (
    <div className={cn('flex items-center gap-1.5 text-xs font-medium', config.className)}>
      <Wifi size={12} />
      {config.icon}
      <span>{config.text}</span>
    </div>
  );
};
