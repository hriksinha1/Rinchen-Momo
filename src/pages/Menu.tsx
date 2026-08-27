import { useState, useMemo } from 'react';
import { PageMeta } from '../components/seo/PageMeta';
import { DishCard } from '../components/cards/DishCard';
import { MENU_ITEMS, MENU_CATEGORIES } from '../data/menu';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { cn } from '../lib/utils';
import { Search, X } from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function Menu() {
  useScrollReveal();
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0].slug);
  const [filterVeg, setFilterVeg] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll to category handler
  const handleCategoryClick = (slug: string) => {
    setActiveCategory(slug);
    const element = document.getElementById(`category-${slug}`);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 180; // Offset for sticky navs
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Group items
  const { groupedItems, hasSearchResults } = useMemo(() => {
    let items = filterVeg ? MENU_ITEMS.filter(i => i.dietary === 'veg') : MENU_ITEMS;
    
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(i => 
        i.name.toLowerCase().includes(q) || 
        i.description.toLowerCase().includes(q) ||
        i.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    const grouped = {} as Record<string, typeof MENU_ITEMS>;
    let hasResults = false;
    
    MENU_CATEGORIES.forEach(cat => {
      grouped[cat.slug] = items.filter(item => item.category === cat.slug);
      if (grouped[cat.slug].length > 0) hasResults = true;
    });
    
    return { groupedItems: grouped, hasSearchResults: hasResults };
  }, [filterVeg, searchQuery]);

  return (
    <>
      <PageMeta 
        title="Menu — Rinchen's Momo Kolkata"
        description="Momos, soups, starters, and Himalayan mains. View the full Rinchen's Momo menu with prices."
      />
      
      {/* Page Header */}
      <div className="bg-bg-dark pt-16 pb-24 px-6 md:px-12 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-inverse mb-6">Our Menu</h1>
        <p className="text-lg text-text-inverse/80 font-body max-w-2xl mx-auto mb-8">
          Authentic flavours from the Himalayas, crafted fresh every day.
        </p>
        
        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-text-muted" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search momos, chicken, spicy..."
            className="w-full bg-bg-base text-text-primary rounded-full py-4 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-brand-yellow font-body text-lg border-0 shadow-sm"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-4 flex items-center text-text-muted hover:text-text-primary transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Sticky Category Nav */}
      <div className="sticky top-[var(--nav-height-scrolled)] z-40 bg-bg-base/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex overflow-x-auto no-scrollbar w-full md:w-auto pb-1 gap-6">
            {MENU_CATEGORIES.map(cat => (
              <button
                key={cat.slug}
                onClick={() => handleCategoryClick(cat.slug)}
                className={cn(
                  "font-body font-bold text-sm whitespace-nowrap transition-colors relative pb-1",
                  activeCategory === cat.slug && !searchQuery ? "text-brand-red" : "text-text-secondary hover:text-text-primary"
                )}
              >
                {cat.label}
                {activeCategory === cat.slug && !searchQuery && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-red rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-sm font-body font-bold text-text-secondary">Veg Only</span>
            <button 
              onClick={() => setFilterVeg(!filterVeg)}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2",
                filterVeg ? "bg-[#2D7A3A]" : "bg-border-strong"
              )}
            >
              <span 
                className={cn(
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                  filterVeg ? "translate-x-6" : "translate-x-1"
                )} 
              />
            </button>
          </div>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 pb-32">
        {hasSearchResults ? (
          MENU_CATEGORIES.map(category => {
            const items = groupedItems[category.slug];
            if (!items || items.length === 0) return null;

            return (
              <section 
                key={category.slug} 
                id={`category-${category.slug}`}
                className="mb-20 scroll-mt-48"
              >
                <div className="border-b border-border mb-8 pb-4" data-reveal>
                  <h2 className="text-3xl font-display font-bold text-text-primary uppercase tracking-tight">
                    {category.label}
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item, i) => (
                    <DishCard 
                      key={item.id} 
                      item={item} 
                      data-reveal 
                      style={{ animationDelay: `${(i % 3) * 60}ms` }} 
                    />
                  ))}
                </div>
              </section>
            );
          })
        ) : (
          <div className="text-center py-20 px-6 max-w-md mx-auto">
            <Search className="h-12 w-12 text-border-strong mx-auto mb-6" />
            <h2 className="text-2xl font-display font-bold text-text-primary mb-3">No dishes found</h2>
            <p className="text-text-secondary font-body mb-8">
              We couldn't find any items matching "{searchQuery}"{filterVeg ? " with vegetarian filter applied" : ""}.
            </p>
            <Button onClick={() => { setSearchQuery(''); setFilterVeg(false); }} variant="ghost">
              Clear all filters
            </Button>
          </div>
        )}
        
        {/* Reservation CTA */}
        <div className="mt-20 border-t border-border pt-20 text-center">
          <p className="font-mono text-sm font-medium text-brand-red tracking-[0.1em] uppercase mb-4" data-reveal>
            Planning to dine in?
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-text-primary mb-8" data-reveal>
            Book your table today.
          </h2>
          <Button href="/reserve" size="lg" data-reveal>Reserve a Table &rarr;</Button>
        </div>
      </div>
    </>
  );
}
