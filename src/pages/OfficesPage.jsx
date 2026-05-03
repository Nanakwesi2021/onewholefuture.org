import React, { useState, useEffect } from 'react';

const OfficesPage = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const offices = [
    {
      city: "Accra",
      region: "Greater Accra Region",
      address: "12 Independence Avenue, Digital Heights",
      email: "accra@onewholefuture.org",
      image: "/image/kojo-nana-GtnFtsPXKME-unsplash.jpg"
    },
    {
      city: "Kumasi",
      region: "Ashanti Region",
      address: "Garden City Plaza, Kumasi",
      email: "kumasi@onewholefuture.org",
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800"
    },
    {
      city: "Tamale",
      region: "Northern Region",
      address: "Savannah Hub, Tamale Central",
      email: "tamale@onewholefuture.org",
      image: "https://images.unsplash.com/photo-1580133267566-7e3e29837943?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="bg-surface min-h-screen">
      {/* Cinematic Hero */}
      <header className="relative h-[75vh] flex items-center overflow-hidden bg-surface">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=90&w=2000"
            className="w-full h-full object-cover"
            alt="Global Infrastructure"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/95 to-surface/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full pt-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8 animate-fadeSlideUp">
              <div className="h-[2px] w-12 bg-secondary" />
              <span className="uppercase tracking-[0.4em] text-[0.75rem] font-black text-secondary">Our Presence</span>
            </div>
            <h1 className="font-headline text-[4.5rem] lg:text-[8rem] leading-[0.8] font-black tracking-tighter text-primary mb-12 animate-fadeSlideUp">
              Global <br />
              <span className="italic font-light text-secondary">Footprint.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-on-surface-variant max-w-xl font-bold leading-relaxed animate-fadeSlideUp delay-100">
              Operating at the intersection of ancestral wisdom and modern infrastructure, our offices serve as hubs for systemic transformation.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {offices.map((office, idx) => (
            <div 
              key={idx} 
              className={`group bg-white rounded-[3rem] overflow-hidden border border-outline-variant/10 shadow-sm hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: `${idx * 200}ms` }}
            >
              <div className="h-80 overflow-hidden relative">
                <img 
                  src={office.image} 
                  alt={office.city} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute top-8 left-8">
                   <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
                      <p className="text-[0.6rem] font-black text-primary uppercase tracking-[0.2em]">{office.region}</p>
                   </div>
                </div>
              </div>
              
              <div className="p-12">
                <h3 className="text-5xl font-black text-primary font-headline mb-8 tracking-tighter">{office.city}</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                    </div>
                    <p className="text-sm text-on-surface-variant font-medium leading-relaxed pt-2">
                      {office.address}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary text-xl">mail</span>
                    </div>
                    <p className="text-sm text-on-surface-variant font-medium">
                      {office.email}
                    </p>
                  </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-outline-variant/10 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Active Regional Hub</span>
                  </div>
                  <span className="material-symbols-outlined text-primary/20 group-hover:text-primary transition-colors">arrow_forward</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default OfficesPage;
