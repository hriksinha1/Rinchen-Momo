import React from 'react';
import { MapPin, Clock, Phone, ExternalLink } from 'lucide-react';
import { Outlet } from '../../types/outlet';
import { useOutletStatus } from '../../hooks/useOutletStatus';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

interface OutletCardProps extends React.HTMLAttributes<HTMLDivElement> {
  outlet: Outlet;
  className?: string;
  style?: React.CSSProperties;
  'data-reveal'?: boolean;
  key?: React.Key;
}

export const OutletCard = ({ outlet, className, style, 'data-reveal': dataReveal, ...props }: OutletCardProps) => {
  const { isOpen, statusText } = useOutletStatus(outlet.hours);

  return (
    <div 
      className={cn("bg-bg-card rounded-lg border border-border shadow-sm flex flex-col h-full overflow-hidden", className)}
      style={style}
      data-reveal={dataReveal}
      {...props}
    >
      {outlet.images && outlet.images.length > 0 && (
        <div className="w-full h-48 sm:h-64 relative bg-bg-muted">
          <img 
            src={outlet.images[0]} 
            alt={`${outlet.name} storefront`} 
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-2xl font-display font-bold text-text-primary mb-2">{outlet.name}</h3>
          <span className="inline-flex items-center px-2.5 py-1 rounded-sm bg-bg-muted text-text-secondary text-xs font-mono font-medium uppercase tracking-wider">
            {outlet.type === 'qsr' ? 'Quick Service' : 'Dine-In'}
            {outlet.services.takeaway && ' · Takeaway'}
            {outlet.services.delivery && ' · Delivery'}
          </span>
        </div>
      </div>

      <div className="space-y-4 mb-8 flex-grow">
        <div className="flex gap-3 text-text-secondary font-body">
          <MapPin size={20} className="shrink-0 text-text-muted" />
          <p className="text-base leading-relaxed">{outlet.address}</p>
        </div>
        
        <div className="flex gap-3 text-text-secondary font-body">
          <Clock size={20} className="shrink-0 text-text-muted" />
          <div className="flex items-center gap-2">
            <span className={cn("w-2 h-2 rounded-full", isOpen ? "bg-color-success" : "bg-color-error")} style={{ backgroundColor: isOpen ? '#2D7A3A' : '#D4281E' }} />
            <span className={isOpen ? "text-[#2D7A3A] font-medium" : "text-brand-red font-medium"}>
              {isOpen ? 'Open now' : 'Closed'}
            </span>
            <span className="text-text-muted hidden sm:inline">— {statusText}</span>
          </div>
        </div>

        {outlet.phone && (
          <div className="flex gap-3 text-text-secondary font-body">
            <Phone size={20} className="shrink-0 text-text-muted" />
            <a href={`tel:${outlet.phone}`} className="hover:text-brand-yellow transition-colors">{outlet.phone}</a>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 pt-6 border-t border-border">
        <div className="flex flex-col sm:flex-row gap-3">
          {outlet.services.reservations ? (
            <Button href="/reserve" variant="primary" className="w-full sm:w-auto flex-grow">
              Reserve a Table
            </Button>
          ) : (
            <Button href="/menu" variant="primary" className="w-full sm:w-auto flex-grow">
              Explore Menu
            </Button>
          )}
          <Button 
            href={outlet.googleMapsUrl}
            variant="ghost"
            className="w-full sm:w-auto"
          >
            Directions <ExternalLink size={16} className="ml-2 opacity-50" />
          </Button>
        </div>
        
        {outlet.services.deliveryPlatforms.length > 0 && (
          <div className="pt-4 mt-2 border-t border-border/50 text-sm">
            <span className="text-text-secondary mr-2">Order online via:</span>
            {outlet.services.deliveryPlatforms.map((platform, i) => (
              <span key={platform.name}>
                <a href={platform.url} className="text-text-primary font-medium hover:text-brand-red transition-colors">
                  {platform.name}
                </a>
                {i < outlet.services.deliveryPlatforms.length - 1 && <span className="mx-2 text-text-muted">·</span>}
              </span>
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
};
