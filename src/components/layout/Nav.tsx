import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useNavScroll } from '../../hooks/useNavScroll';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { SITE_CONFIG } from '../../config/site';

const LINKS = [
  { label: 'Menu', href: '/menu' },
  { label: 'Locations', href: '/outlets' },
  { label: 'Story', href: '/story' },
  { label: 'Catering', href: '/catering' }
];

export const Nav = () => {
  const isScrolled = useNavScroll();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
          isScrolled ? "pt-2 md:pt-4 px-3 md:px-6" : "pt-4 md:pt-6 px-4 md:px-8"
        )}
      >
        <div
          className={cn(
            "max-w-[1280px] mx-auto w-full transition-all duration-300 flex items-center justify-between px-5 md:px-8 rounded-[24px] md:rounded-full",
            isScrolled
              ? "h-[64px] bg-bg-base/95 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-border/50"
              : "h-[72px] bg-bg-base/40 md:bg-transparent"
          )}
        >
          {/* LEFT: Logo */}
          <div className="flex-shrink-0 z-50">
            <Link to="/" className="text-xl md:text-2xl font-display font-bold tracking-tight text-text-primary flex items-center">
              {SITE_CONFIG.name.toUpperCase()}
              <span className="text-brand-red ml-1.5 text-xs opacity-90">●</span>
            </Link>
          </div>

          {/* CENTER: Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center justify-center gap-8 absolute left-1/2 -translate-x-1/2">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-[15px] font-medium font-body transition-colors relative py-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-sm",
                  location.pathname === link.href ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-brand-yellow transition-all duration-300 ease-out",
                  location.pathname === link.href ? "w-4" : "w-0 group-hover:w-4"
                )} />
              </Link>
            ))}
          </nav>

          {/* RIGHT: CTAs (Desktop) */}
          <div className="hidden lg:flex justify-end items-center gap-5">
            <Button href="/outlets" variant="text" size="sm" className="font-body text-[15px] font-medium group flex items-center text-text-primary">
              Order Online
              <span className="ml-1.5 transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
            </Button>
            <Button href="/reserve" size="sm" variant="primary" className="px-6 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all group">
              Reserve a Table <span className="ml-1.5 transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
            </Button>
          </div>

          {/* Mobile Nav Toggle */}
          <div className="flex lg:hidden justify-end items-center gap-4 z-50">
            <Button href="/reserve" size="sm" className="px-4 py-1.5 rounded-full text-sm group">
              Reserve <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
            </Button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 -mr-2 text-text-primary hover:bg-black/5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red"
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div id="mobile-menu" className="fixed inset-0 z-40 bg-bg-base flex flex-col pt-[120px] px-8" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          <nav className="flex flex-col gap-6 mb-12 mt-8">
            {LINKS.map((link, i) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="text-4xl font-display font-medium text-text-primary animate-in slide-in-from-bottom-4 fade-in hover:text-brand-red focus:outline-none focus:text-brand-red transition-colors flex items-center"
                style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
              >
                {link.label}
                {location.pathname === link.href && (
                  <span className="ml-4 h-2 w-2 rounded-full bg-brand-yellow" />
                )}
              </Link>
            ))}
          </nav>
          
          <div 
            className="flex flex-col gap-4 w-full animate-in slide-in-from-bottom-4 fade-in mt-auto mb-12"
            style={{ animationDelay: `${LINKS.length * 60}ms`, animationFillMode: 'both' }}
          >
            <Button href="/reserve" className="w-full text-lg rounded-full py-4 shadow-sm group" onClick={() => setIsOpen(false)}>
              Reserve a Table <span className="ml-1.5 transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
            </Button>
            <Button href="/outlets" variant="ghost" className="w-full text-lg rounded-full py-4 border border-border/50 hover:bg-black/5 group" onClick={() => setIsOpen(false)}>
              Order Online <span className="ml-1.5 transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
