import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useForm } from 'react-hook-form';
import { PageMeta } from '../components/seo/PageMeta';
import { Button } from '../components/ui/Button';
import { OUTLETS } from '../data/outlets';
import { Outlet } from '../types/outlet';
import { reservationService, TimeSlot, Reservation } from '../services/reservationService';
import { paymentService } from '../services/paymentService';
import { cn } from '../lib/utils';
import { Check, Calendar as CalendarIcon, Users, Clock, MapPin, ChevronLeft, ArrowRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

type Step = 'location' | 'date-guests' | 'time' | 'details' | 'payment' | 'confirmation';

export default function Reserve() {
  const [step, setStep] = useState<Step>('location');
  
  // Selection State
  const [locationId, setLocationId] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [guests, setGuests] = useState<number>(2);
  const [timeSlot, setTimeSlot] = useState<TimeSlot | null>(null);
  const [reservation, setReservation] = useState<Reservation | null>(null);

  // Data
  const [availability, setAvailability] = useState<{ lunch: TimeSlot[], dinner: TimeSlot[] } | null>(null);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [processing, setProcessing] = useState(false);

  const reservableOutlets = OUTLETS.filter(o => o.services.reservations);
  const selectedOutlet = OUTLETS.find(o => o.id === locationId);

  // Details Form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Initialize date to today
  useEffect(() => {
    const today = new Date();
    setDate(today.toISOString().split('T')[0]);
  }, []);

  const handleFetchAvailability = async (e: FormEvent) => {
    e.preventDefault();
    if (!date) return;
    setStep('time');
    setLoadingAvailability(true);
    try {
      const data = await reservationService.getAvailability({ locationId, date, guests });
      setAvailability(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAvailability(false);
    }
  };

  const handleDetailsSubmit = async (data: any) => {
    if (!timeSlot || !selectedOutlet) return;
    setStep('payment');
  };

  const handleMockPayment = async () => {
    setProcessing(true);
    try {
      const order = await paymentService.createPaymentOrder(500); // 500 deposit
      const success = await paymentService.processPayment(order.id);
      if (success) {
        // Finalize
        // Get form data (would normally be saved in state, but let's assume we saved it or pass it)
        const formEl = document.getElementById('details-form') as HTMLFormElement;
        const formData = new FormData(formEl);
        
        const finalReservation = await reservationService.createReservation({
          locationId,
          date,
          time: timeSlot!.startTime,
          guests,
          customerName: formData.get('name') as string || 'Guest',
          customerPhone: formData.get('phone') as string || '',
          customerEmail: formData.get('email') as string || '',
        });
        setReservation(finalReservation);
        setStep('confirmation');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  // Format Date safely
  const formattedDate = date ? new Intl.DateTimeFormat('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long'
  }).format(new Date(date)) : '';

  return (
    <>
      <PageMeta 
        title="Reserve a Table — Rinchen's Momo"
        description="Book your table at Rinchen's Momo. Authentic Himalayan momos in Kolkata."
      />
      
      <div className="bg-bg-dark text-text-inverse pt-24 pb-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Reserve a Table</h1>
          <p className="text-text-muted font-body">Book your spot for an authentic Sikkimese dining experience.</p>
        </div>
      </div>

      <div className="bg-bg-muted min-h-[60vh] py-12 px-6">
        <div className="max-w-2xl mx-auto bg-bg-card rounded-xl shadow-sm border border-border p-6 md:p-10">
          
          {step !== 'location' && step !== 'confirmation' && (
            <button 
              onClick={() => {
                if (step === 'payment') setStep('details');
                else if (step === 'details') setStep('time');
                else if (step === 'time') setStep('date-guests');
                else if (step === 'date-guests') setStep('location');
              }}
              className="flex items-center text-sm font-medium text-text-secondary hover:text-text-primary mb-8 transition-colors"
            >
              <ChevronLeft size={16} className="mr-1" /> Back
            </button>
          )}

          {/* STEP 1: LOCATION */}
          {step === 'location' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-display font-bold text-text-primary mb-6">Where would you like to dine?</h2>
              <div className="space-y-4">
                {reservableOutlets.map(outlet => (
                  <button
                    key={outlet.id}
                    onClick={() => {
                      setLocationId(outlet.id);
                      setStep('date-guests');
                    }}
                    className="w-full flex items-center justify-between p-5 rounded-lg border-2 border-border hover:border-brand-red transition-all text-left group"
                  >
                    <div>
                      <h3 className="font-display font-bold text-lg text-text-primary group-hover:text-brand-red transition-colors">{outlet.name}</h3>
                      <p className="text-text-secondary text-sm font-body mt-1">{outlet.address}</p>
                    </div>
                    <ArrowRight className="text-text-muted group-hover:text-brand-red transition-colors" />
                  </button>
                ))}
              </div>
              
              <div className="mt-10 p-5 bg-brand-yellow-pale/30 rounded-lg flex items-start">
                <Info size={20} className="text-brand-yellow-deep mr-3 shrink-0 mt-0.5" />
                <p className="text-sm text-text-secondary font-body">
                  Some outlets like Entally Market are delivery/takeaway only and do not support reservations. 
                  <Link to="/locations" className="text-brand-red font-bold hover:underline ml-1">View all locations &rarr;</Link>
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: DATE & GUESTS */}
          {step === 'date-guests' && (
            <form onSubmit={handleFetchAvailability} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-6 pb-6 border-b border-border">
                <p className="text-sm font-mono text-text-muted uppercase tracking-wider mb-2">Location</p>
                <p className="font-bold flex items-center text-text-primary"><MapPin size={18} className="mr-2 text-brand-red" /> {selectedOutlet?.name}</p>
              </div>

              <h2 className="text-2xl font-display font-bold text-text-primary mb-6">When are you joining us?</h2>
              
              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2 flex items-center">
                    <CalendarIcon size={16} className="mr-2" /> Date
                  </label>
                  <input 
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-bg-muted border-[1.5px] border-border rounded-md px-4 py-3 text-base font-body focus:outline-none focus:border-brand-red transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2 flex items-center">
                    <Users size={16} className="mr-2" /> Guests
                  </label>
                  <div className="flex items-center border-[1.5px] border-border rounded-md bg-bg-muted overflow-hidden">
                    <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} className="px-5 py-3 hover:bg-border transition-colors">-</button>
                    <div className="flex-grow text-center font-bold text-text-primary">{guests}</div>
                    <button type="button" onClick={() => setGuests(Math.min(12, guests + 1))} className="px-5 py-3 hover:bg-border transition-colors">+</button>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">Find a Table</Button>
            </form>
          )}

          {/* STEP 3: TIME SLOT */}
          {step === 'time' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-6 pb-6 border-b border-border flex justify-between items-center">
                <div>
                  <p className="text-sm font-mono text-text-muted uppercase tracking-wider mb-1">{selectedOutlet?.name}</p>
                  <p className="font-bold text-text-primary">{formattedDate} · {guests} Guests</p>
                </div>
              </div>

              <h2 className="text-2xl font-display font-bold text-text-primary mb-6">Choose a time</h2>

              {loadingAvailability ? (
                <div className="py-12 text-center animate-pulse">
                  <p className="text-text-secondary">Finding the best available tables...</p>
                </div>
              ) : availability ? (
                <div className="space-y-8">
                  <div>
                    <h3 className="font-display font-bold text-lg mb-4 flex items-center"><Clock size={18} className="mr-2" /> Lunch</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {availability.lunch.map(slot => (
                        <button
                          key={slot.id}
                          disabled={!slot.available}
                          onClick={() => {
                            setTimeSlot(slot);
                            setStep('details');
                          }}
                          className={cn(
                            "py-3 px-2 rounded-md border font-medium text-sm transition-colors",
                            slot.available 
                              ? "border-brand-red text-brand-red hover:bg-brand-red hover:text-white"
                              : "border-border bg-bg-muted text-text-muted cursor-not-allowed opacity-50"
                          )}
                        >
                          {slot.startTime}
                          {slot.label && <span className="block text-[10px] font-normal mt-0.5 opacity-80">{slot.label}</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg mb-4 flex items-center"><Clock size={18} className="mr-2" /> Dinner</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {availability.dinner.map(slot => (
                        <button
                          key={slot.id}
                          disabled={!slot.available}
                          onClick={() => {
                            setTimeSlot(slot);
                            setStep('details');
                          }}
                          className={cn(
                            "py-3 px-2 rounded-md border font-medium text-sm transition-colors",
                            slot.available 
                              ? "border-brand-red text-brand-red hover:bg-brand-red hover:text-white"
                              : "border-border bg-bg-muted text-text-muted cursor-not-allowed opacity-50"
                          )}
                        >
                          {slot.startTime}
                          {slot.label && <span className="block text-[10px] font-normal mt-0.5 opacity-80">{slot.label}</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-color-error">Could not load availability.</p>
              )}
            </div>
          )}

          {/* STEP 4: CUSTOMER DETAILS */}
          {step === 'details' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-6 p-5 bg-bg-muted rounded-lg border border-border">
                <p className="font-bold text-text-primary text-lg mb-1">{selectedOutlet?.name}</p>
                <p className="text-text-secondary">{formattedDate} at {timeSlot?.startTime}</p>
                <p className="text-text-secondary">{guests} Guests</p>
              </div>

              <h2 className="text-2xl font-display font-bold text-text-primary mb-6">Your Details</h2>
              <form id="details-form" onSubmit={handleSubmit(handleDetailsSubmit)} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Full Name</label>
                  <input 
                    {...register("name", { required: true })}
                    className="w-full bg-bg-muted border-[1.5px] border-border rounded-md px-4 py-3 text-base font-body focus:outline-none focus:border-brand-red"
                    placeholder="Jane Doe"
                  />
                  {errors.name && <span className="text-xs text-brand-red">Name is required</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Phone Number</label>
                  <input 
                    {...register("phone", { required: true })}
                    type="tel"
                    className="w-full bg-bg-muted border-[1.5px] border-border rounded-md px-4 py-3 text-base font-body focus:outline-none focus:border-brand-red"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Email</label>
                  <input 
                    {...register("email", { required: true })}
                    type="email"
                    className="w-full bg-bg-muted border-[1.5px] border-border rounded-md px-4 py-3 text-base font-body focus:outline-none focus:border-brand-red"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Special Requests (Optional)</label>
                  <textarea 
                    {...register("notes")}
                    className="w-full bg-bg-muted border-[1.5px] border-border rounded-md px-4 py-3 text-base font-body focus:outline-none focus:border-brand-red resize-none"
                    rows={2}
                    placeholder="Anniversary, dietary requirements..."
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">Continue to Payment</Button>
              </form>
            </div>
          )}

          {/* STEP 5: PAYMENT */}
          {step === 'payment' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
              <h2 className="text-2xl font-display font-bold text-text-primary mb-2">Secure Your Table</h2>
              <p className="text-text-secondary mb-8">A refundable deposit of ₹500 is required to hold your reservation.</p>
              
              <div className="bg-bg-muted rounded-lg p-6 mb-8 text-left border border-border">
                <p className="font-mono text-sm text-text-muted uppercase mb-4">Summary</p>
                <div className="flex justify-between font-bold text-text-primary mb-2">
                  <span>Reservation Deposit</span>
                  <span>₹500</span>
                </div>
                <p className="text-sm text-text-secondary">Fully refundable if cancelled up to 2 hours before the booking.</p>
              </div>

              <Button 
                onClick={handleMockPayment} 
                className="w-full mb-4 relative" 
                size="lg"
                disabled={processing}
              >
                {processing ? "Processing Payment..." : "Pay ₹500 & Confirm"}
              </Button>
              <p className="text-xs text-text-muted flex items-center justify-center">
                <Check size={12} className="mr-1" /> Secure connection. (Mock Development Mode)
              </p>
            </div>
          )}

          {/* STEP 6: CONFIRMATION */}
          {step === 'confirmation' && reservation && (
            <div className="animate-in zoom-in-95 duration-500 text-center py-6">
              <div className="w-16 h-16 bg-[#2D7A3A]/10 text-[#2D7A3A] rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={32} />
              </div>
              <h2 className="text-3xl font-display font-bold text-text-primary mb-2">Table Reserved</h2>
              <p className="text-text-secondary mb-8">We've sent a confirmation to your email and phone.</p>
              
              <div className="bg-bg-muted rounded-lg p-6 mb-8 text-left border border-border">
                <p className="font-mono text-sm text-brand-red font-medium mb-1">Booking ID</p>
                <p className="font-display font-bold text-xl text-text-primary mb-6">{reservation.id}</p>
                
                <div className="space-y-3 font-body text-text-primary">
                  <p className="flex justify-between">
                    <span className="text-text-secondary">Location</span>
                    <span className="font-medium text-right">{selectedOutlet?.name}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-text-secondary">Date</span>
                    <span className="font-medium text-right">{formattedDate}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-text-secondary">Time</span>
                    <span className="font-medium text-right">{reservation.time}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-text-secondary">Guests</span>
                    <span className="font-medium text-right">{reservation.guests}</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button href={`/locations`} variant="ghost" className="w-full">Get Directions &rarr;</Button>
                <Button href="/menu" variant="ghost" className="w-full">Explore Menu &rarr;</Button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
