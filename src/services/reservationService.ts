export interface TimeSlot {
  id: string;
  startTime: string; // e.g. "12:00 PM"
  endTime?: string;
  available: boolean;
  remainingCapacity?: number;
  label?: string; // e.g. "Few tables left"
}

export interface ReservationQuery {
  locationId: string;
  date: string;
  guests: number;
}

export interface Reservation {
  id: string;
  locationId: string;
  date: string;
  time: string;
  guests: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'failed';
}

// MOCK IMPLEMENTATION
export const reservationService = {
  async getAvailability(query: ReservationQuery): Promise<{ lunch: TimeSlot[], dinner: TimeSlot[] }> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Simple mock logic:
    // If it's a weekday, plenty of slots. If weekend, fewer slots.
    const isWeekend = new Date(query.date).getDay() === 0 || new Date(query.date).getDay() === 6;
    
    return {
      lunch: [
        { id: 'l1', startTime: '12:00 PM', available: true, remainingCapacity: 4 },
        { id: 'l2', startTime: '12:30 PM', available: true, remainingCapacity: 10 },
        { id: 'l3', startTime: '1:00 PM', available: !isWeekend, remainingCapacity: isWeekend ? 0 : 2, label: isWeekend ? 'Unavailable' : 'Few tables left' },
        { id: 'l4', startTime: '1:30 PM', available: true, remainingCapacity: 8 },
        { id: 'l5', startTime: '2:00 PM', available: true, remainingCapacity: 12 },
      ],
      dinner: [
        { id: 'd1', startTime: '7:00 PM', available: true, remainingCapacity: 10 },
        { id: 'd2', startTime: '7:30 PM', available: !isWeekend, remainingCapacity: isWeekend ? 0 : 4 },
        { id: 'd3', startTime: '8:00 PM', available: false, remainingCapacity: 0, label: 'Unavailable' },
        { id: 'd4', startTime: '8:30 PM', available: true, remainingCapacity: 2, label: 'Few tables left' },
        { id: 'd5', startTime: '9:00 PM', available: true, remainingCapacity: 6 },
        { id: 'd6', startTime: '9:30 PM', available: true, remainingCapacity: 8 },
      ]
    };
  },

  async createReservation(data: Omit<Reservation, 'id' | 'status'>): Promise<Reservation> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      ...data,
      id: `RM-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      status: 'confirmed'
    };
  }
};
