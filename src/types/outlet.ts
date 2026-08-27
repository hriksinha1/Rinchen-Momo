export type OutletId = 'entally' | 'kalighat';
export type DayOfWeek = 'mon'|'tue'|'wed'|'thu'|'fri'|'sat'|'sun';

export interface OutletHours {
  day: DayOfWeek;
  open: string | null;
  close: string | null;
}

export interface OutletService {
  dineIn: boolean;
  takeaway: boolean;
  delivery: boolean;
  reservations: boolean;
  catering: boolean;
  deliveryPlatforms: {
    name: 'Swiggy' | 'Zomato';
    url: string;
  }[];
}

export interface Outlet {
  id: OutletId;
  name: string;
  type: 'qsr' | 'dine-in';
  address: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  phone: string | null;
  whatsappNumber: string | null;
  hours: OutletHours[];
  services: OutletService;
  images: string[];
  coordinates: {
    lat: number;
    lng: number;
  } | null;
}
