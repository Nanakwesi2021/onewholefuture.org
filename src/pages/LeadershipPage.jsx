import React, { useState, useEffect } from 'react';

const LeadershipPage = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const leaders = [
    {
      name: "Dr. Ama Serwah",
      role: "Chief Executive Officer",
      bio: "Ama has 20+ years in international development and social innovation rooted in the African continent, leading our vision for a shared future.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600&crop=faces"
    },
    {
      name: "Kwame Asante",
      role: "Chief Technology Officer",
      bio: "A pioneer in digital sovereignty, Kwame leads our technology initiatives from Accra, ensuring local governance through ethical tools.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600&crop=faces"
    },
    {
      name: "Sarah Abena",
      role: "Director of Impact",
      bio: "Sarah focuses on measuring and scaling our systems-change programs across West Africa with a focus on sustainable infrastructure.",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=600&crop=faces"
    },
    {
      name: "Kofi Mensah",
      role: "Head of Digital Archives",
      bio: "Kofi oversees our field operations in the Volta and Northern regions, pioneering decentralized archiving protocols.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600&crop=faces"
    },
    {
      name: "Araba Quansah",
      role: "Policy & Governance Lead",
      bio: "Araba bridges the gap between community-led data sovereignty and national policy frameworks across the ECOWAS region.",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=600&crop=faces"
    },
    {
      name: "John Tetteh",
      role: "Director of Operations",
      bio: "John ensures the smooth execution of our multi-region field projects, focusing on logistics and community engagement.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600&crop=faces"
    }
  ];

  return (
    <div className="bg-surface min-h-screen">
      {/* Cinematic Hero */}
      <header className="relative h-[65vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1600&q=90&auto=format&fit=crop"
            className="w-full h-full object-cover grayscale opacity-20"
            alt="Ghana landscape"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface/90 via-surface/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full pt-20">
          <span className="uppercase tracking-[0.3em] text-[0.65rem] font-bold text-secondary mb-4 block">The Stewards</span>
          <h1 className="font-headline text-[3.5rem] lg:text-[6rem] leading-[0.95] font-extrabold tracking-tighter text-on-surface mb-8">
            Our <span className="italic font-light text-primary">Leadership.</span>
          </h1>
          <p className="text-xl text-on-surface-variant max-w-xl font-light leading-relaxed">
            A diverse collective of thinkers, builders, and community leaders dedicated to the radical elevation of human dignity.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {leaders.map((leader, idx) => (
            <div 
              key={idx} 
              className="group transition-all duration-1000"
              style={{ 
                opacity: visible ? 1 : 0, 
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: `${idx * 150}ms`
              }}
            >
              <div className="relative overflow-hidden rounded-[2.5rem] aspect-[4/5] mb-8 bg-surface-container-low shadow-sm group-hover:shadow-2xl group-hover:shadow-primary/5 transition-all duration-700">
                <img 
                  src={leader.image} 
                  alt={leader.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              
              <div className="space-y-4 px-2">
                <div>
                  <span className="text-[0.6rem] font-bold uppercase tracking-[0.25em] text-primary mb-2 block">{leader.role}</span>
                  <h3 className="text-3xl font-headline font-bold text-on-surface tracking-tighter group-hover:text-primary transition-colors leading-tight">
                    {leader.name}
                  </h3>
                </div>
                <p className="text-sm text-on-surface-variant font-light leading-relaxed pt-4 border-t border-outline-variant/30">
                  {leader.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Global Board Section */}
      <section className="bg-surface-container py-32 border-t border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-baseline justify-between gap-12 mb-20">
            <h2 className="font-headline text-4xl lg:text-5xl font-extrabold tracking-tighter text-primary">Board of Trustees</h2>
            <p className="text-on-surface-variant max-w-lg font-light leading-relaxed">
              Providing strategic oversight and ensuring the alignment of our work with the core mission of global human dignity.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              "Dr. Kofi Annan II",
              "Sarah J. Boateng",
              "Kwame K. Mensah",
              "Abena A. Serwah"
            ].map(name => (
              <div key={name} className="border-l border-outline-variant/50 pl-6 py-2">
                <p className="font-headline text-lg font-bold text-on-surface">{name}</p>
                <p className="text-xs text-on-surface-variant uppercase tracking-widest mt-1">Trustee</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeadershipPage;
