import { PageMeta } from '../components/seo/PageMeta';
import { OutletCard } from '../components/cards/OutletCard';
import { OUTLETS } from '../data/outlets';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Outlets() {
  useScrollReveal();

  return (
    <>
      <PageMeta 
        title="Outlets — Rinchen's Momo Entally & Kalighat"
        description="Find Rinchen's Momo near you. Two outlets in Kolkata — Entally and Lake Market, Kalighat. Hours, directions, and ordering."
      />
      
      <div className="bg-bg-dark pt-16 pb-24 px-6 md:px-12 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-inverse mb-6">Our Outlets</h1>
        <p className="text-lg text-text-inverse/80 font-body max-w-2xl mx-auto">
          Dine-in or order delivery. Find the closest Rinchen's Momo to you.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-24 pb-32">
        {OUTLETS.map((outlet, i) => (
          <div 
            key={outlet.id} 
            id={outlet.id} 
            className="flex flex-col lg:flex-row gap-8 lg:gap-12 scroll-mt-24"
            data-reveal
          >
            <div className="w-full lg:w-3/5">
              <OutletCard outlet={outlet} className="h-full border-none shadow-lg bg-white" />
            </div>
            
            <div className="w-full lg:w-2/5 aspect-[4/3] lg:aspect-auto bg-bg-muted rounded-lg overflow-hidden relative shadow-sm">
              <iframe
                src={outlet.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', inset: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map showing ${outlet.name}`}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
