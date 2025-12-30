import { useState, useEffect } from 'react';
import { Camera, ImageIcon } from 'lucide-react';

interface UserProfileHeaderProps {
  showBanner?: boolean;
}

export const UserProfileHeader = ({ showBanner = true }: UserProfileHeaderProps) => {
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedAvatar = localStorage.getItem('userAvatar');
    const storedBanner = localStorage.getItem('userBanner');
    if (storedUsername) setUsername(storedUsername);
    if (storedAvatar) setAvatar(storedAvatar);
    if (storedBanner) setBanner(storedBanner);
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatar(result);
        localStorage.setItem('userAvatar', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setBanner(result);
        localStorage.setItem('userBanner', result);
      };
      reader.readAsDataURL(file);
    }
  };

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
          <label className="absolute bottom-2 right-2 p-2 rounded-lg bg-background/80 backdrop-blur-sm cursor-pointer hover:bg-background transition-colors border border-border/50">
            <ImageIcon size={16} className="text-muted-foreground" />
            <input type="file" accept="image/*" className="hidden" onChange={handleBannerChange} />
          </label>
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
          <label className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-primary cursor-pointer hover:bg-primary/90 transition-colors shadow-lg">
            <Camera size={12} className="text-primary-foreground" />
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </label>
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
