export interface BrandImageSource {
  id: string;
  sourceUrl: string;
  resolvedUrl?: string;
  sourceType?: "google" | "restaurant" | "social" | "other";
  imageUrl?: string;
  title?: string;
  description?: string;
  usageStatus: "restaurant-owned" | "licensed" | "reference-only" | "unknown";
}

export const GOOGLE_SOURCES: Record<string, BrandImageSource> = {
  source01: {
    id: "source01",
    sourceUrl: "https://share.google/gEb6jJW3P0VSUugKS",
    sourceType: "google",
    usageStatus: "reference-only",
    description: "Google shared link 1"
  },
  source02: {
    id: "source02",
    sourceUrl: "https://share.google/ILaRM18Kb3e2VrDlv",
    sourceType: "google",
    usageStatus: "reference-only",
    description: "Google shared link 2"
  },
  source03: {
    id: "source03",
    sourceUrl: "https://share.google/blFfuSZpFfJcyCMUB",
    sourceType: "google",
    usageStatus: "reference-only",
    description: "Google shared link 3"
  }
};

export interface BrandImage {
  id: string;
  src: string;
  alt: string;
  aspectRatio?: string;
  focalPoint?: string;
  source?: string;
  sourceType?: "official" | "licensed" | "google-reference" | "placeholder";
  usageStatus?: "approved" | "temporary" | "reference-only";
}

export const BRAND_IMAGES: Record<string, BrandImage> = {
  // Hero Images
  heroHome: {
    id: "heroHome",
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2400&auto=format&fit=crop",
    alt: "Rinchen's Momo signature dishes and atmospheric setting",
    source: GOOGLE_SOURCES.source01.sourceUrl,
    sourceType: "google-reference",
    usageStatus: "reference-only",
    focalPoint: "center"
  },
  heroStory: {
    id: "heroStory",
    src: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2400&auto=format&fit=crop",
    alt: "Himalayan origin setting",
    sourceType: "placeholder",
    usageStatus: "temporary",
    focalPoint: "center"
  },

  // Story Sequence
  storyOrigin: {
    id: "storyOrigin",
    src: "https://images.unsplash.com/photo-1544365558-35aa4afcf11f?q=80&w=1200&auto=format&fit=crop",
    alt: "Origin landscape",
    sourceType: "placeholder",
    usageStatus: "temporary"
  },
  storyMemory: {
    id: "storyMemory",
    src: "https://images.unsplash.com/photo-1551181216-9bbafe88dc84?q=80&w=1200&auto=format&fit=crop",
    alt: "Warm home setting",
    sourceType: "placeholder",
    usageStatus: "temporary"
  },
  storyFood: {
    id: "storyFood",
    src: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=1200&auto=format&fit=crop",
    alt: "Signature dumplings on table",
    sourceType: "placeholder",
    usageStatus: "temporary"
  },
  storyCraft: {
    id: "storyCraft",
    src: "https://images.unsplash.com/photo-1541592102781-ef1a53018237?q=80&w=1200&auto=format&fit=crop",
    alt: "Chef crafting momos",
    sourceType: "placeholder",
    usageStatus: "temporary"
  },
  storyFounder: {
    id: "storyFounder",
    src: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1200&auto=format&fit=crop",
    alt: "Founder preparing food",
    source: GOOGLE_SOURCES.source02.sourceUrl,
    sourceType: "google-reference",
    usageStatus: "reference-only" // Fallback until actual image provided
  },
  storyTable: {
    id: "storyTable",
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
    alt: "Restaurant table setting",
    sourceType: "placeholder",
    usageStatus: "temporary"
  },

  // Menu Replacements
  menuRoseMomo: {
    id: "menuRoseMomo",
    src: "https://images.unsplash.com/photo-1541592102781-ef1a53018237?q=80&w=800&auto=format&fit=crop", // placeholder
    alt: "Rose Momos",
    sourceType: "placeholder",
    usageStatus: "temporary"
  }
};
