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
          "sticky top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
          isScrolled 
            ? "bg-bg-base/95 backdrop-blur-md shadow-sm border-b border-border py-3 h-[var(--nav-height-scrolled)]" 
            : "bg-bg-base/90 backdrop-blur-sm py-5 h-[var(--nav-height)]"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-3 items-center h-full">
          
          {/* LEFT: Logo */}
          <div className="flex justify-start">
            <Link to="/" className="text-xl md:text-2xl font-display font-bold tracking-tight text-text-primary z-50">
              {SITE_CONFIG.name.toUpperCase()}
            </Link>
          </div>

          {/* CENTER: Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center justify-center gap-8">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-base font-medium font-body transition-colors relative pb-1 hover:text-brand-red focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-4 rounded-sm",
                  location.pathname === link.href ? "text-brand-red" : "text-text-primary"
                )}
              >
                {link.label}
                {location.pathname === link.href && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-red rounded-full animate-in fade-in" />
                )}
              </Link>
            ))}
          </nav>

          {/* RIGHT: CTAs (Desktop) */}
          <div className="hidden lg:flex justify-end items-center gap-4">
            <Button href="/reserve" size="sm" variant="primary">Reserve a Table &rarr;</Button>
            <Button href="/outlets" size="sm" variant="ghost">Order Online &rarr;</Button>
          </div>

          {/* Mobile Nav Toggle */}
          <div className="flex lg:hidden justify-end items-center gap-4 z-50">
            <Button href="/reserve" size="sm">Reserve &rarr;</Button>
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
        <div id="mobile-menu" className="fixed inset-0 z-40 bg-bg-dark/95 backdrop-blur-md flex flex-col items-center justify-center pt-20" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
          <nav className="flex flex-col items-center gap-8 mb-12">
            {LINKS.map((link, i) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="text-4xl font-display font-bold text-bg-base animate-in slide-in-from-bottom-4 fade-in hover:text-brand-yellow focus:outline-none focus:ring-4 focus:ring-brand-yellow rounded-lg px-4 py-2"
                style={{ animationDelay: `${i * 60}ms`, animationFillMode: 'both' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div 
            className="flex flex-col gap-4 w-full px-12 animate-in slide-in-from-bottom-4 fade-in"
            style={{ animationDelay: `${LINKS.length * 60}ms`, animationFillMode: 'both' }}
          >
            <Button href="/reserve" className="w-full text-lg" onClick={() => setIsOpen(false)}>Reserve a Table &rarr;</Button>
            <Button href="/outlets" variant="ghost" className="w-full text-lg border-border bg-black/10" onClick={() => setIsOpen(false)}>Order Online &rarr;</Button>
          </div>
        </div>
      )}
    </>
  );
};
