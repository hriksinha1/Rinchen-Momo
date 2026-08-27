import { PageMeta } from '../components/seo/PageMeta';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Button } from '../components/ui/Button';
import { useForm } from 'react-hook-form';

type FormData = {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  guestCount: string;
  date: string;
  message: string;
};

export default function Catering() {
  useScrollReveal();
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // In a real app, this would post to an endpoint
    console.log("Form data", data);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <>
      <PageMeta 
        title="Catering & Bulk Orders — Rinchen's Momo"
        description="Momos for events, office meals, and celebrations in Kolkata. Inquire about catering today."
      />
      
      {/* Hero Banner */}
      <div className="w-full h-[40vh] min-h-[300px] relative overflow-hidden bg-bg-dark">
        <div className="absolute inset-0 bg-bg-dark/40 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2400&auto=format&fit=crop" 
          alt="Catering spread of food"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Col: Info */}
          <div className="w-full lg:w-5/12" data-reveal>
            <p className="font-mono text-sm font-medium text-brand-red tracking-[0.1em] uppercase mb-4">
              Events & Bulk Orders
            </p>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-6">
              Bring the Himalayas to your event.
            </h1>
            <p className="text-lg text-text-secondary font-body mb-10 leading-relaxed">
              Whether it's an office lunch, a birthday celebration, or a casual get-together, Rinchen's Momo offers bulk ordering and catering packages to suit your needs.
            </p>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-display font-bold text-text-primary mb-2">Corporate Orders</h3>
                <p className="text-text-secondary font-body">Individual meal boxes or buffet-style setups for office lunches and team building.</p>
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-text-primary mb-2">Private Events</h3>
                <p className="text-text-secondary font-body">Birthdays, house parties, and celebrations. We can provide ready-to-eat platters.</p>
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-text-primary mb-2">Notice Period</h3>
                <p className="text-text-secondary font-body">Please allow at least 48 hours notice for orders exceeding 100 momos to ensure our hand-folded quality.</p>
              </div>
            </div>
          </div>

          {/* Right Col: Form */}
          <div className="w-full lg:w-7/12" data-reveal>
            <div className="bg-bg-card rounded-xl border border-border shadow-md p-6 md:p-10">
              <h2 className="text-2xl font-display font-bold text-text-primary mb-6">Request a Quote</h2>
              
              {isSubmitSuccessful ? (
                <div className="bg-brand-yellow-pale text-text-primary p-6 rounded-lg text-center">
                  <div className="w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Request Sent</h3>
                  <p>Thank you for your interest! We'll get back to you within 24 hours to discuss your event.</p>
                  <Button onClick={() => window.location.reload()} variant="ghost" className="mt-6">Send another request</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-sm font-medium text-text-primary">Name</label>
                      <input 
                        {...register("name", { required: true })}
                        id="name"
                        className="w-full bg-bg-muted border-[1.5px] border-border rounded-md px-4 py-3 text-base font-body focus:outline-none focus:border-brand-red transition-colors"
                        placeholder="Your name"
                      />
                      {errors.name && <span className="text-xs text-brand-red">Name is required</span>}
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-sm font-medium text-text-primary">Phone</label>
                      <input 
                        {...register("phone", { required: true })}
                        id="phone"
                        type="tel"
                        className="w-full bg-bg-muted border-[1.5px] border-border rounded-md px-4 py-3 text-base font-body focus:outline-none focus:border-brand-red transition-colors"
                        placeholder="Phone number"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-text-primary">Email</label>
                    <input 
                      {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                      id="email"
                      type="email"
                      className="w-full bg-bg-muted border-[1.5px] border-border rounded-md px-4 py-3 text-base font-body focus:outline-none focus:border-brand-red transition-colors"
                      placeholder="Email address"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="eventType" className="text-sm font-medium text-text-primary">Event Type</label>
                      <select 
                        {...register("eventType")}
                        id="eventType"
                        className="w-full bg-bg-muted border-[1.5px] border-border rounded-md px-4 py-3 text-base font-body focus:outline-none focus:border-brand-red transition-colors appearance-none"
                      >
                        <option value="corporate">Corporate / Office</option>
                        <option value="private">Private Party</option>
                        <option value="wedding">Wedding / Pre-wedding</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="date" className="text-sm font-medium text-text-primary">Date of Event</label>
                      <input 
                        {...register("date")}
                        id="date"
                        type="date"
                        className="w-full bg-bg-muted border-[1.5px] border-border rounded-md px-4 py-3 text-base font-body focus:outline-none focus:border-brand-red transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="guestCount" className="text-sm font-medium text-text-primary">Estimated Guest Count</label>
                    <input 
                      {...register("guestCount")}
                      id="guestCount"
                      type="number"
                      className="w-full bg-bg-muted border-[1.5px] border-border rounded-md px-4 py-3 text-base font-body focus:outline-none focus:border-brand-red transition-colors"
                      placeholder="E.g., 50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-sm font-medium text-text-primary">Additional Details</label>
                    <textarea 
                      {...register("message")}
                      id="message"
                      rows={4}
                      className="w-full bg-bg-muted border-[1.5px] border-border rounded-md px-4 py-3 text-base font-body focus:outline-none focus:border-brand-red transition-colors resize-none"
                      placeholder="Tell us about your requirements..."
                    ></textarea>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Submit Inquiry"}
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
