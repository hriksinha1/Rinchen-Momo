import { Outlet } from '../types/outlet';

export const OUTLETS: Outlet[] = [
  {
    id: 'entally',
    name: 'Entally Market',
    type: 'qsr',
    address: 'Entally Market, Kolkata, West Bengal',
    googleMapsUrl: '#',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.5020117075677!2d88.36838381503157!3d22.560321939106096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a027706d91a99ef%3A0x6b63c9b7df687008!2sEntally%20Market!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    phone: null,
    whatsappNumber: null,
    hours: [
      { day: 'mon', open: '13:00', close: '22:00' },
      { day: 'tue', open: '13:00', close: '22:00' },
      { day: 'wed', open: '13:00', close: '22:00' },
      { day: 'thu', open: '13:00', close: '22:00' },
      { day: 'fri', open: '13:00', close: '22:00' },
      { day: 'sat', open: '13:00', close: '22:00' },
      { day: 'sun', open: '13:00', close: '22:00' },
    ],
    services: {
      dineIn: false,
      takeaway: true,
      delivery: true,
      reservations: false,
      catering: true,
      deliveryPlatforms: [
        { name: 'Swiggy', url: '#' },
        { name: 'Zomato', url: '#' }
      ]
    },
    images: ['https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=800&auto=format&fit=crop'],
    coordinates: null
  },
  {
    id: 'kalighat',
    name: 'Lake Market, Kalighat',
    type: 'dine-in',
    address: '23A, Sardar Shankar Road, Lake Market, Kalighat, Kolkata 700029',
    googleMapsUrl: '#',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.2530932223067!2d88.35147851503099!3d22.532152841484086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02773d2a09dcad%3A0x86bd716766bb7e39!2sSardar%20Sankar%20Rd%2C%20Kolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    phone: null,
    whatsappNumber: null,
    hours: [
      { day: 'mon', open: '13:30', close: '23:00' },
      { day: 'tue', open: '13:30', close: '23:00' },
      { day: 'wed', open: '13:30', close: '23:00' },
      { day: 'thu', open: '13:30', close: '23:00' },
      { day: 'fri', open: '13:30', close: '23:00' },
      { day: 'sat', open: '13:30', close: '23:00' },
      { day: 'sun', open: '13:30', close: '23:00' },
    ],
    services: {
      dineIn: true,
      takeaway: true,
      delivery: true,
      reservations: true,
      catering: true,
      deliveryPlatforms: [
        { name: 'Swiggy', url: '#' },
        { name: 'Zomato', url: '#' }
      ]
    },
    images: ['https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800&auto=format&fit=crop'],
    coordinates: null
  }
];
