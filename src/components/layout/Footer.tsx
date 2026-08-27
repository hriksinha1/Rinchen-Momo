import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../../config/site';

export const Footer = () => {
  return (
    <footer className="bg-bg-dark text-text-inverse py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-display font-bold mb-4">{SITE_CONFIG.name.toUpperCase()}</h2>
            <p className="text-text-muted font-body max-w-xs">{SITE_CONFIG.tagline}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-mono font-medium text-text-muted uppercase mb-4 tracking-wider">Outlets</h3>
            <ul className="flex flex-col gap-3 font-body">
              <li><Link to="/outlets#entally" className="hover:text-brand-yellow transition-colors">Entally</Link></li>
              <li><Link to="/outlets#kalighat" className="hover:text-brand-yellow transition-colors">Kalighat</Link></li>
              <li><Link to="/outlets" className="hover:text-brand-yellow transition-colors">Hours & Directions</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-mono font-medium text-text-muted uppercase mb-4 tracking-wider">Quick Links</h3>
            <ul className="flex flex-col gap-3 font-body">
              <li><Link to="/" className="hover:text-brand-yellow transition-colors">Home</Link></li>
              <li><Link to="/menu" className="hover:text-brand-yellow transition-colors">Menu</Link></li>
              <li><Link to="/story" className="hover:text-brand-yellow transition-colors">Story</Link></li>
              <li><Link to="/catering" className="hover:text-brand-yellow transition-colors">Catering</Link></li>
              <li><Link to="/contact" className="hover:text-brand-yellow transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-mono font-medium text-text-muted uppercase mb-4 tracking-wider">Connect</h3>
            <ul className="flex flex-col gap-3 font-body">
              <li><a href={SITE_CONFIG.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors">Instagram</a></li>
              {SITE_CONFIG.youtube && <li><a href={SITE_CONFIG.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors">YouTube</a></li>}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-body text-text-muted">
          <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-text-inverse transition-colors">Privacy</Link>
            <Link to="#" className="hover:text-text-inverse transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
