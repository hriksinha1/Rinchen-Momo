import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { OUTLETS } from '../../data/outlets';

export const ReservationWidget = () => {
  const navigate = useNavigate();
  const reservableOutlets = OUTLETS.filter(o => o.services.reservations);
  const [locationId, setLocationId] = useState(reservableOutlets[0]?.id || '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [guests, setGuests] = useState(2);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real app we might pass this state via context or query params
    // For now we just route to reserve
    navigate('/reserve');
  };

  if (reservableOutlets.length === 0) return null;

  return (
    <section className="py-20 md:py-32 section section--centered px-6" data-reveal>
      <div className="bg-bg-muted rounded-2xl p-8 md:p-12 border border-border shadow-sm flex flex-col items-center text-center container--narrow">
        <div className="mb-10 w-full flex flex-col items-center">
          <p className="font-mono text-sm font-medium text-brand-red tracking-[0.1em] uppercase mb-4">
            Dine With Us
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-text-primary mb-6">
            Come hungry. Stay awhile.
          </h2>
          <p className="text-text-secondary font-body text-lg max-w-md">
            Choose a location, pick a time, and we'll save you a seat.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full bg-bg-card p-6 md:p-8 rounded-xl border border-border shadow-sm space-y-5 text-left">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-text-primary">Location</label>
            <select 
              value={locationId} 
              onChange={e => setLocationId(e.target.value)}
              className="w-full bg-bg-muted border-[1.5px] border-border rounded-md px-4 py-3 text-base font-body focus:outline-none focus:border-brand-red appearance-none"
            >
              {reservableOutlets.map(o => (
                <option key={o.id} value={o.id}>{o.name}</option>
              ))}
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-primary">Date</label>
              <input 
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full bg-bg-muted border-[1.5px] border-border rounded-md px-4 py-3 text-base font-body focus:outline-none focus:border-brand-red"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-text-primary">Guests</label>
              <select
                value={guests}
                onChange={e => setGuests(parseInt(e.target.value))}
                className="w-full bg-bg-muted border-[1.5px] border-border rounded-md px-4 py-3 text-base font-body focus:outline-none focus:border-brand-red appearance-none"
              >
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </div>
          </div>

          <Button type="submit" className="w-full mt-2" size="lg">Find a Table</Button>
        </form>
      </div>
    </section>
  );
};
