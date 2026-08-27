import { useState, useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ANNOUNCEMENT } from '../../config/announcements';

export const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (ANNOUNCEMENT.active) {
      const dismissed = localStorage.getItem('announcement_dismissed');
      if (dismissed !== ANNOUNCEMENT.message) {
        setIsVisible(true);
      }
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('announcement_dismissed', ANNOUNCEMENT.message);
  };

  if (!isVisible) return null;

  return (
    <div className="bg-brand-yellow-pale text-text-primary py-2 px-4 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-center md:justify-between text-sm font-body">
        <div className="flex-1 text-center md:text-left flex items-center justify-center md:justify-start gap-3">
          <span>{ANNOUNCEMENT.message}</span>
          {ANNOUNCEMENT.href && (
            <Link to={ANNOUNCEMENT.href} className="inline-flex items-center font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-black/20 rounded">
              Learn more <ArrowRight size={14} className="ml-1" />
            </Link>
          )}
        </div>
        <button 
          onClick={handleDismiss} 
          className="hidden md:flex w-11 h-11 items-center justify-center hover:bg-black/10 focus:bg-black/10 focus:outline-none focus:ring-2 focus:ring-black/20 rounded-full transition-colors ml-4 shrink-0" 
          aria-label="Dismiss announcement"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
