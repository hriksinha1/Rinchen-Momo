import { MapPin, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const MobileBottomBar = () => {
  const location = useLocation();
  
  // Don't show on the outlets page itself to avoid redundancy
  if (location.pathname === '/outlets') return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[1000] bg-bg-base border-t border-border shadow-[0_-4px_24px_rgba(26,18,8,0.05)] pb-safe">
      <div className="flex">
        <Link to="/outlets" className="flex-1 flex items-center justify-center gap-2 py-4 font-body font-bold text-text-primary hover:bg-bg-muted transition-colors">
          <MapPin size={20} />
          <span>Find Outlet</span>
        </Link>
        <div className="w-px bg-border my-3" />
        <Link to="/outlets" className="flex-1 flex items-center justify-center gap-2 py-4 font-body font-bold text-brand-red hover:bg-red-50 transition-colors">
          <ShoppingBag size={20} />
          <span>Order Now</span>
        </Link>
      </div>
    </div>
  );
};
