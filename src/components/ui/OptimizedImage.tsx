import { useState } from 'react';
import { cn } from '../../lib/utils';
import { ImageOff } from 'lucide-react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  wrapperClassName?: string;
}

export const OptimizedImage = ({
  src,
  alt,
  className,
  wrapperClassName,
  fallbackSrc = "https://images.unsplash.com/photo-1541592102781-ef1a53018237?q=80&w=800&auto=format&fit=crop", // Warm neutral fallback texture
  ...props
}: OptimizedImageProps) => {
  const [error, setError] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-bg-muted flex items-center justify-center", wrapperClassName, className)}>
      {!error ? (
        <img
          src={src}
          alt={alt}
          onError={() => setError(true)}
          className={cn("w-full h-full object-cover transition-opacity duration-300", className)}
          loading="lazy"
          {...props}
        />
      ) : (
        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-[#F9F7F4] text-text-muted p-4 text-center">
          {/* Authentic-looking fallback */}
          <ImageOff size={24} className="mb-2 opacity-40" />
          <span className="font-mono text-[10px] tracking-widest uppercase opacity-60">Image Unavailable</span>
        </div>
      )}
    </div>
  );
};
