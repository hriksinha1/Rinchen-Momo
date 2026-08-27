import { PageMeta } from '../components/seo/PageMeta';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Button } from '../components/ui/Button';
import { ReservationWidget } from '../components/reservation/ReservationWidget';

const StoryHero = () => {
  return (
    <section className="relative min-h-[80svh] flex items-center justify-center overflow-hidden bg-bg-dark -mt-[var(--nav-height)]">
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/50 to-bg-dark/80 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2400&auto=format&fit=crop" 
          alt="Himalayan Mountains" 
          className="w-full h-full object-cover object-center animate-in fade-in duration-1000"
        />
      </div>
      <div className="relative z-20 max-w-4xl mx-auto px-6 w-full flex flex-col items-center text-center mt-[var(--nav-height)]" data-reveal>
        <p className="font-mono text-sm md:text-base font-medium text-brand-yellow tracking-[0.1em] uppercase mb-8">
          Our Story
        </p>
        <h1 className="text-[clamp(40px,8vw,80px)] leading-[1.1] font-display font-bold text-text-inverse mb-8">
          Before the momo,<br/>there was home.
        </h1>
      </div>
    </section>
  );
};

const TheBeginning = () => {
  return (
    <section className="py-24 md:py-40 bg-bg-base px-6">
      <div className="max-w-4xl mx-auto text-center" data-reveal>
        <h2 className="text-3xl md:text-5xl font-display font-light text-text-primary leading-tight mb-12">
          Every great dish starts with a memory. For us, it was the memory of food shared in the cold, crisp air of the Himalayas.
        </h2>
        <div className="w-16 h-px bg-brand-red mx-auto mb-12" />
        <p className="text-lg md:text-xl text-text-secondary font-body leading-relaxed max-w-3xl mx-auto">
          Rinchen's Momo wasn't conceived in a boardroom or planned as a business. It started as a deeply personal attempt to recreate the exact taste of home—the authentic, unadulterated momos of Sikkim—right here in the bustling heat of Kolkata.
        </p>
      </div>
    </section>
  );
};

const TheFounder = () => {
  return (
    <section className="py-24 md:py-32 bg-bg-muted overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        <div className="w-full lg:w-1/2 order-2 lg:order-1" data-reveal>
          <p className="font-mono text-sm font-medium text-brand-red tracking-[0.1em] uppercase mb-6">
            The Founder
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-8">
            Obsession becomes a recipe.
          </h2>
          <p className="text-lg text-text-secondary font-body mb-6 leading-relaxed">
            As a content creator exploring the vibrant food scene of Kolkata, Rinchen noticed something was missing. Despite the city's love for street food, finding a truly authentic Sikkimese momo—one made without shortcuts, artificial colors, or commercial fillers—was surprisingly difficult.
          </p>
          <p className="text-lg text-text-secondary font-body mb-8 leading-relaxed">
            So, he started making them himself. Sourcing ingredients, refining the dough, and adjusting the steam time. He gave them away to friends, neighbors, and anyone who would try them. The feedback was unanimous: "You need to sell these."
          </p>
          <blockquote className="border-l-2 border-brand-yellow pl-6 py-2 mt-8">
            <p className="text-xl md:text-2xl font-display italic text-text-primary leading-snug">
              "I didn't want to just open a restaurant. I wanted to share the exact momo I grew up eating."
            </p>
            <footer className="mt-4 font-mono text-sm text-text-muted uppercase tracking-wider">— Rinchen Wangdi Bhutia</footer>
          </blockquote>
        </div>
        <div className="w-full lg:w-1/2 order-1 lg:order-2" data-reveal>
          <div className="aspect-[4/5] bg-bg-card rounded-2xl overflow-hidden shadow-2xl relative">
            <img 
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1200&auto=format&fit=crop" 
              alt="Founder of Rinchen's Momo" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Philosophy = () => {
  return (
    <section className="py-32 md:py-40 bg-bg-dark text-text-inverse text-center px-6">
      <div className="max-w-6xl mx-auto" data-reveal>
        <p className="font-mono text-sm font-medium text-brand-yellow tracking-[0.1em] uppercase mb-8">
          Food Philosophy
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-20">
          No shortcuts. No dyes.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 text-left">
          <div className="flex flex-col items-start">
            <h3 className="text-3xl font-display font-bold mb-4 text-brand-yellow">Natural Color</h3>
            <p className="text-text-inverse/80 font-body text-lg leading-relaxed">Our signature pink momos get their color from fresh beetroot extract. The green ones from spinach. Nature provides the best palette, and we refuse to compromise.</p>
          </div>
          <div className="flex flex-col items-start">
            <h3 className="text-3xl font-display font-bold mb-4 text-brand-yellow">Hand-Folded</h3>
            <p className="text-text-inverse/80 font-body text-lg leading-relaxed">Machines make momos fast. Hands make them right. Every momo we serve has been individually folded by our chefs, ensuring the perfect texture in every bite.</p>
          </div>
          <div className="flex flex-col items-start">
            <h3 className="text-3xl font-display font-bold mb-4 text-brand-yellow">The Right Steam</h3>
            <p className="text-text-inverse/80 font-body text-lg leading-relaxed">We steam our momos in traditional bamboo, ensuring the wrapper achieves the perfect delicate chew without becoming soggy. It's a precise craft.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Timeline = () => {
  const journey = [
    { year: "2023", title: "The Home Kitchen", desc: "Experimenting with recipes and giving away momos to neighbors." },
    { year: "Late 2023", title: "The Cloud Kitchen", desc: "Overwhelming demand forces the move into a professional cloud kitchen setup." },
    { year: "2024", title: "Entally Opens", desc: "Our first physical outlet opens its doors, establishing a real connection with Kolkata." },
    { year: "2025", title: "Lake Market", desc: "Expanding our footprint to bring authentic momos to more neighborhoods." }
  ];

  return (
    <section className="py-32 md:py-40 bg-bg-base px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-24" data-reveal>
          <p className="font-mono text-sm font-medium text-brand-red tracking-[0.1em] uppercase mb-6">
            The Evolution
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary">The Journey</h2>
        </div>
        
        <div className="space-y-20 md:space-y-32">
          {journey.map((step, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-6 md:gap-16 items-start" data-reveal>
              <div className="md:w-1/3 md:text-right pt-2">
                <span className="text-5xl md:text-6xl font-display font-bold text-brand-red/10">{step.year}</span>
              </div>
              <div className="md:w-2/3 md:border-l-2 md:border-border md:pl-10 pb-4">
                <h3 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-4">{step.title}</h3>
                <p className="text-xl text-text-secondary font-body leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Today = () => {
  return (
    <section className="py-32 md:py-40 bg-bg-muted px-6">
      <div className="max-w-7xl mx-auto text-center" data-reveal>
        <p className="font-mono text-sm font-medium text-brand-red tracking-[0.1em] uppercase mb-6">
          Present Day
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-text-primary mb-16">
          This is Rinchen's Momo today.
        </h2>
        <div className="aspect-[16/9] md:aspect-[21/9] max-w-6xl mx-auto rounded-3xl overflow-hidden mb-20 shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2400&auto=format&fit=crop" 
            alt="Vibrant restaurant atmosphere" 
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-xl md:text-2xl text-text-secondary font-body max-w-4xl mx-auto mb-20 leading-relaxed">
          Today, we serve thousands of momos a week. But the core remains unchanged: authentic Sikkimese recipes, fresh ingredients, and a commitment to doing things the long, hard, right way. 
        </p>
      </div>
    </section>
  );
};

const StoryReservationCTA = () => {
  return (
    <>
      <section className="pt-32 bg-bg-base overflow-hidden border-t border-border">
        <div className="text-center max-w-3xl mx-auto px-6" data-reveal>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6">
            Be part of the story.
          </h2>
          <p className="text-xl text-text-secondary font-body">
            Come visit us and taste the difference for yourself.
          </p>
        </div>
      </section>
      <ReservationWidget />
    </>
  );
};

export default function Story() {
  useScrollReveal();

  return (
    <>
      <PageMeta 
        title="Our Story — Rinchen's Momo"
        description="From a home kitchen experiment to Kolkata's favourite momo destination. Read the story behind Rinchen's Momo."
      />
      <StoryHero />
      <TheBeginning />
      <TheFounder />
      <Philosophy />
      <Timeline />
      <Today />
      <StoryReservationCTA />
    </>
  );
}
