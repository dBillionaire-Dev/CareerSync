import { useState, useEffect } from 'react';

interface UserProfileHeaderProps {
  showBanner?: boolean;
  isDemo?: boolean;
}

const DEFAULT_DEMO_AVATAR = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face';
const DEFAULT_DEMO_BANNER = 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1200&h=400&fit=crop';

export const UserProfileHeader = ({ showBanner = true, isDemo = false }: UserProfileHeaderProps) => {
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);

  useEffect(() => {
    if (isDemo) {
      setUsername('Demo User');
      setAvatar(DEFAULT_DEMO_AVATAR);
      setBanner(DEFAULT_DEMO_BANNER);
    } else {
      const storedUsername = localStorage.getItem('username');
      const storedAvatar = localStorage.getItem('userAvatar');
      const storedBanner = localStorage.getItem('userBanner');
      if (storedUsername) setUsername(storedUsername);
      if (storedAvatar) setAvatar(storedAvatar);
      if (storedBanner) setBanner(storedBanner);
    }
  }, [isDemo]);

  // Listen for storage changes to update in real-time
  useEffect(() => {
    if (isDemo) return;
    
    const handleStorageChange = () => {
      const storedAvatar = localStorage.getItem('userAvatar');
      const storedBanner = localStorage.getItem('userBanner');
      const storedUsername = localStorage.getItem('username');
      if (storedAvatar) setAvatar(storedAvatar);
      if (storedBanner) setBanner(storedBanner);
      if (storedUsername) setUsername(storedUsername);
    };

    window.addEventListener('storage', handleStorageChange);
    // Also listen for custom event for same-tab updates
    window.addEventListener('profileUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('profileUpdated', handleStorageChange);
    };
  }, [isDemo]);

  return (
    <div className="relative">
      {/* Banner */}
      {showBanner && (
        <div className="relative w-full h-32 md:h-40 rounded-xl overflow-hidden mb-4">
          {banner ? (
            <img src={banner} alt="Profile banner" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-primary/30 via-primary/20 to-stage-interviewing/30" />
          )}
        </div>
      )}

      {/* User Info */}
      <div className={`flex items-center gap-4 ${showBanner ? '-mt-12 ml-4' : ''}`}>
        <div className="relative">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-background overflow-hidden bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
            {avatar ? (
              <img src={avatar} alt="Profile avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl font-bold text-primary">
                {username?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            )}
          </div>
        </div>
        <div className={showBanner ? 'mt-8' : ''}>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Hi, {username || 'there'}!
          </h1>
          <p className="text-muted-foreground text-sm">Welcome back to your dashboard</p>
        </div>
      </div>
    </div>
  );
};
