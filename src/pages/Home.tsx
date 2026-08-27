import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageMeta } from '../components/seo/PageMeta';
import { Button } from '../components/ui/Button';
import { DishCard } from '../components/cards/DishCard';
import { OutletCard } from '../components/cards/OutletCard';
import { MENU_ITEMS } from '../data/menu';
import { OUTLETS } from '../data/outlets';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { cn } from '../lib/utils';
import { useState } from 'react';
import { ReservationWidget } from '../components/reservation/ReservationWidget';

// 01. Hero
const Hero = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-bg-dark -mt-[var(--nav-height)]">
      {/* Background Image with animated scale */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/40 to-bg-dark/60 z-10" />
        <div 
          className="w-full h-full bg-brand-yellow-pale overflow-hidden"
          style={{ animation: 'heroScale var(--motion-hero) cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
        >
          <img 
            src="https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?q=80&w=2400&auto=format&fit=crop" 
            alt="Authentic Himalayan Momos" 
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      <div className="relative z-20 max-w-3xl mx-auto px-6 w-full flex flex-col items-center text-center mt-[var(--nav-height)]">
        <p className="font-mono text-sm md:text-base font-medium text-brand-yellow tracking-[0.1em] uppercase mb-8 animate-in fade-in duration-500">
          Kolkata's Momo Kitchen
        </p>
        <h1 className="text-[clamp(40px,8vw,72px)] leading-[1.1] font-display font-bold text-text-inverse mb-6 max-w-[700px] mx-auto">
          <span className="block animate-in slide-in-from-bottom-4 fade-in duration-500 delay-200 fill-mode-both">Some stories</span>
          <span className="block animate-in slide-in-from-bottom-4 fade-in duration-500 delay-[360ms] fill-mode-both text-brand-yellow">are folded by hand.</span>
        </h1>
        <p className="text-lg md:text-xl text-text-inverse/80 font-body mb-10 max-w-lg mx-auto animate-in fade-in duration-500 delay-[500ms] fill-mode-both">
          Recipes that travelled from home,<br/>and found a new table in Kolkata.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 w-full animate-in fade-in duration-500 delay-[700ms] fill-mode-both">
          <Button href="/reserve" size="lg" className="w-full sm:w-auto min-w-[200px]">Reserve a Table &rarr;</Button>
          <Button href="/menu" variant="ghost" size="lg" className="w-full sm:w-auto min-w-[200px] text-text-inverse border-border hover:bg-black/20 hover:border-text-inverse/30">Explore Menu &rarr;</Button>
        </div>
      </div>
      <style>{`
        @keyframes heroScale {
          0% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </section>
  );
};

// 02. The Hook
const TheHook = () => {
  return (
    <section className="py-24 md:py-32 bg-bg-base text-center px-6">
      <div className="max-w-3xl mx-auto" data-reveal>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-8 leading-tight">
          Every plate starts somewhere.
        </h2>
        <p className="text-xl md:text-2xl text-text-secondary font-body font-light leading-relaxed">
          The recipes we remember longest are usually the ones that feel like home.
        </p>
      </div>
    </section>
  );
};

// 03. Where the Story Begins
const OriginStory = () => {
  return (
    <section className="py-20 md:py-32 bg-bg-muted overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 lg:gap-24">
        <div className="w-full md:w-1/2" data-reveal>
          <p className="font-mono text-sm font-medium text-brand-red tracking-[0.1em] uppercase mb-6">
            01 / ORIGIN
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-8">
            Every plate starts somewhere.
          </h2>
          <p className="text-lg text-text-secondary font-body mb-8 leading-relaxed max-w-xl">
            For us, it started in Sikkim. Long before Kolkata tasted our momos, they were perfected in a home kitchen. The spices, the folds, and the patience required to make authentic Himalayan food were passed down, not taught in a culinary school.
          </p>
          <Button href="/story" variant="ghost">Read our full story &rarr;</Button>
        </div>
        <div className="w-full md:w-1/2 aspect-[4/5] bg-bg-card rounded-xl relative overflow-hidden shadow-lg" data-reveal>
          <img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop" 
            alt="Mountains of Sikkim"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

// 03.5 Memory / Home
const MemoryHome = () => {
  return (
    <section className="py-24 bg-bg-base text-center px-6">
      <div className="max-w-3xl mx-auto" data-reveal>
        <p className="font-mono text-sm font-medium text-brand-red tracking-[0.1em] uppercase mb-6">
          02 / MEMORY
        </p>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-text-primary mb-8 leading-tight">
          The recipes we remember longest are usually the ones that feel like home.
        </h2>
        <p className="text-xl md:text-2xl text-text-secondary font-body font-light leading-relaxed">
          It's about the feeling of family gathered around a steaming bamboo basket on a cold evening.
        </p>
      </div>
    </section>
  );
};

// 04. The Signature Momo
const SignatureMomo = () => {
  return (
    <section className="py-32 px-6 bg-bg-base text-center">
      <div className="max-w-4xl mx-auto mb-16" data-reveal>
        <p className="font-mono text-sm font-medium text-brand-red tracking-[0.1em] uppercase mb-6">
          The Signature
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary">
          The momo that started conversations.
        </h2>
      </div>
      <div className="max-w-6xl mx-auto aspect-square md:aspect-[21/9] rounded-2xl overflow-hidden relative shadow-lg" data-reveal>
        <img 
          src="https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?q=80&w=2400&auto=format&fit=crop" 
          alt="Freshly steamed momos"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-center pb-12 px-6">
          <p className="text-text-inverse font-body text-lg md:text-xl max-w-2xl text-center">
            Our Rose Momo. Naturally coloured with beetroot, folded entirely by hand, and steamed to order. No artificial dyes. Just honest ingredients.
          </p>
        </div>
      </div>
    </section>
  );
};

// 05. The Craft (Editorial Split)
const TheCraft = () => {
  return (
    <section className="py-20 md:py-32 bg-bg-dark text-text-inverse overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-20 text-center" data-reveal>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-yellow mb-6">The Craft</h2>
          <p className="text-lg md:text-xl text-text-inverse/80 max-w-2xl mx-auto font-body">Good things are folded by hand.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center mb-24">
          <div className="order-2 md:order-1" data-reveal>
            <span className="font-display text-6xl md:text-8xl text-brand-yellow opacity-20 block mb-4">01</span>
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">The Dough</h3>
            <p className="text-text-inverse/70 font-body text-lg leading-relaxed">We knead our dough fresh every morning. It must be thin enough to be translucent, but strong enough to hold the broth. Artificial softeners are never used.</p>
          </div>
          <div className="order-1 md:order-2 aspect-square bg-bg-muted/10 rounded-2xl overflow-hidden shadow-2xl" data-reveal>
            <img src="https://images.unsplash.com/photo-1556694795-b6423d3d5b28?q=80&w=1200&auto=format&fit=crop" alt="Preparing dough" className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-[2s]" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="aspect-square bg-bg-muted/10 rounded-2xl overflow-hidden shadow-2xl" data-reveal>
            <img src="https://images.unsplash.com/photo-1581184953963-d15972933db1?q=80&w=1200&auto=format&fit=crop" alt="Steaming momos" className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-[2s]" />
          </div>
          <div data-reveal>
            <span className="font-display text-6xl md:text-8xl text-brand-yellow opacity-20 block mb-4">02</span>
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">The Steam</h3>
            <p className="text-text-inverse/70 font-body text-lg leading-relaxed">Steamed in traditional bamboo baskets to infuse a subtle earthy aroma into the delicate wrapper. Perfect timing ensures the filling stays juicy.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// 06. The Founder Story
const FounderStory = () => {
  return (
    <section className="py-32 bg-bg-base overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        <div className="w-full lg:w-1/2 aspect-[4/5] bg-bg-muted rounded-2xl relative overflow-hidden shadow-lg" data-reveal>
          <img 
            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1200&auto=format&fit=crop" 
            alt="Founder cooking"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="w-full lg:w-1/2" data-reveal>
          <p className="font-mono text-sm font-medium text-brand-red tracking-[0.1em] uppercase mb-6">
            Behind every plate
          </p>
          <blockquote className="text-3xl md:text-4xl lg:text-5xl font-display font-light italic text-text-primary leading-tight mb-8">
            "Before Rinchen's Momo was a restaurant, it was an obsession in my home kitchen."
          </blockquote>
          <p className="text-lg text-text-secondary font-body mb-8 leading-relaxed max-w-xl">
            What started as a content creator's journey to perfect the Himalayan momo soon became a community phenomenon. By giving away hundreds of plates to neighbors and friends, the recipe was refined until it was ready for Kolkata's streets.
          </p>
          <Button href="/story" variant="ghost" className="-ml-4 text-lg">Read Rinchen's story &rarr;</Button>
        </div>
      </div>
    </section>
  );
};

// 07. Sikkim to Kolkata Full Bleed
const JourneyFullBleed = () => {
  return (
    <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2400&auto=format&fit=crop" 
          alt="Kolkata streets" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-20 text-center px-6" data-reveal>
        <h2 className="text-5xl md:text-7xl font-display font-bold text-text-inverse mb-6 leading-tight">
          Sikkim roots.<br/><span className="text-brand-yellow">Kolkata heart.</span>
        </h2>
      </div>
    </section>
  );
};

// 08. The Experience & Reservation
const TheExperience = () => {
  return (
    <>
      <section className="pt-32 bg-bg-base px-6 overflow-hidden">
        <div className="text-center max-w-3xl mx-auto" data-reveal>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6">
            The story is better around a table.
          </h2>
          <p className="text-xl text-text-secondary font-body">
            Come hungry. Leave with a story.
          </p>
        </div>
      </section>
      <ReservationWidget />
    </>
  );
};

// 09. Menu Discovery
const MenuDiscovery = () => {
  const [activeTab, setActiveTab] = useState('momos');
  const tabs = [
    { id: 'momos', label: 'Momos' },
    { id: 'soups', label: 'Soups' },
    { id: 'starters', label: 'Starters' },
    { id: 'mains', label: 'Mains & Rice' }
  ];

  const displayedItems = MENU_ITEMS.filter(item => item.category === activeTab).slice(0, 4);

  return (
    <section className="py-32 bg-bg-base">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16" data-reveal>
          <p className="font-mono text-sm font-medium text-brand-red tracking-[0.1em] uppercase mb-4">
            The Menu
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-12">Now, let's talk about the food.</h2>
          
          <div className="flex overflow-x-auto no-scrollbar pb-2 justify-start md:justify-center gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-6 py-2.5 rounded-full font-body font-bold text-sm whitespace-nowrap transition-colors",
                  activeTab === tab.id 
                    ? "bg-text-primary text-text-inverse" 
                    : "bg-bg-card border border-border text-text-secondary hover:border-text-primary"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[400px]">
          {displayedItems.map((item, i) => (
            <div key={`${activeTab}-${item.id}`} className="animate-in fade-in duration-300 fill-mode-both" style={{ animationDelay: `${i * 50}ms` }}>
              <DishCard item={item} />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center" data-reveal>
          <Button href="/menu" variant="ghost" size="lg">Explore the Full Menu &rarr;</Button>
        </div>
      </div>
    </section>
  );
};

// 10. Locations
const OutletsSection = () => {
  return (
    <section className="py-32 bg-bg-muted max-w-7xl mx-auto px-6 md:px-12">
      <div className="text-center mb-16" data-reveal>
        <p className="font-mono text-sm font-medium text-brand-red tracking-[0.1em] uppercase mb-4">
          Visit Us
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6">Find your table.</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {OUTLETS.map((outlet, i) => (
          <OutletCard key={outlet.id} outlet={outlet} data-reveal style={{ animationDelay: `${i * 100}ms` }} />
        ))}
      </div>
    </section>
  );
};

// 12. Community
const Community = () => {
  return (
    <section className="py-32 bg-bg-base text-center px-6">
      <div className="max-w-3xl mx-auto" data-reveal>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-8">
          Seen around Kolkata.
        </h2>
        <p className="text-lg md:text-xl text-text-secondary font-body mb-10">
          More than a meal. Join the community that helped build Rinchen's Momo from a kitchen experiment into Kolkata's favorite momo spot.
        </p>
        <Button href="https://instagram.com" variant="ghost" className="text-lg">Follow us on Instagram &rarr;</Button>
      </div>
    </section>
  );
};

// 13. Final Statement
const FinalStatement = () => {
  return (
    <section className="py-40 bg-bg-dark text-center px-6" data-reveal>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-display font-bold text-text-inverse mb-10 leading-tight">
          From Sikkim to Kolkata.<br/>
          <span className="text-brand-yellow">From one recipe to many tables.</span>
        </h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 w-full mt-16">
          <Button href="/reserve" variant="primary" size="lg" className="w-full sm:w-auto min-w-[200px]">Reserve a Table &rarr;</Button>
          <Button href="/menu" variant="ghost" size="lg" className="w-full sm:w-auto min-w-[200px] text-text-inverse border-border hover:bg-black/20 hover:border-text-inverse/30">Explore Menu &rarr;</Button>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  useScrollReveal();

  return (
    <>
      <PageMeta 
        title="Rinchen's Momo — Authentic Himalayan Momos in Kolkata"
        description="Hand-folded momos rooted in Sikkimese tradition. Order online or visit our outlets in Entally and Lake Market, Kolkata."
      />
      <Hero />
      <TheHook />
      <OriginStory />
      <MemoryHome />
      <SignatureMomo />
      <TheCraft />
      <FounderStory />
      <JourneyFullBleed />
      <TheExperience />
      <MenuDiscovery />
      <OutletsSection />
      <Community />
      <FinalStatement />
    </>
  );
}
