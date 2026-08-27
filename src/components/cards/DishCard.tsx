import React from 'react';
import { ArrowRight } from 'lucide-react';
import { MenuItem } from '../../types/menu';
import { Tag } from '../ui/Tag';
import { cn } from '../../lib/utils';
import { Link } from 'react-router-dom';
import { OptimizedImage } from '../ui/OptimizedImage';

interface DishCardProps extends React.HTMLAttributes<HTMLDivElement> {
  item: MenuItem;
  className?: string;
  style?: React.CSSProperties;
  'data-reveal'?: boolean;
  key?: React.Key;
}

export const DishCard = ({ item, className, style, 'data-reveal': dataReveal, ...props }: DishCardProps) => {
  return (
    <div 
      className={cn(
        "group flex flex-col bg-bg-card rounded-lg border border-border shadow-sm transition-all duration-300 ease-out hover:shadow-hover hover:-translate-y-0.5 overflow-hidden",
        className
      )}
      style={style}
      data-reveal={dataReveal}
      {...props}
    >
      {/* Image Container 4:3 */}
      <div className="relative w-full pt-[75%] bg-gradient-to-br from-brand-yellow-pale to-bg-muted overflow-hidden">
        <OptimizedImage
          src={item.image}
          alt={item.imageAlt || item.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          style={{ objectPosition: item.imagePosition || 'center' }}
          loading="lazy"
          width={400}
          height={300}
        />
      </div>
      <div className="p-4 md:p-5 flex flex-col flex-grow">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <Tag type={item.dietary} />
          {item.bestseller && <Tag type="bestseller" />}
          {item.spiceLevel && item.spiceLevel > 1 && <Tag type="spicy" />}
        </div>

        {/* Content */}
        <h3 className="text-xl font-display font-bold text-text-primary mb-2 line-clamp-1">{item.name}</h3>
        <p className="text-sm font-body text-text-secondary line-clamp-2 mb-4 flex-grow">{item.description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
          <span className="font-mono text-lg font-medium text-text-primary">
            {item.price ? `₹${item.price}` : 'Ask in-store'}
          </span>
          
          <Link 
            to="/outlets"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-body font-bold rounded-[24px] bg-transparent border border-text-primary/10 text-text-primary transition-colors duration-180 hover:bg-black/5 hover:border-text-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
          >
            Order <ArrowRight size={16} className="ml-1.5 transition-transform duration-180 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};
