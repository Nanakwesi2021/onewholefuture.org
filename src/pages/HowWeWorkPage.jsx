import React from 'react';

const HowWeWorkPage = () => {
  const steps = [
    {
      title: "Identify",
      desc: "We work with local leaders to identify communities where human stories are at risk of being lost.",
      icon: "search",
      image: "https://images.unsplash.com/photo-1540575861501-7cf05a4b175a?w=800&q=80&auto=format&fit=crop"
    },
    {
      title: "Empower",
      desc: "We provide the training and technology necessary for communities to archive their own history.",
      icon: "bolt",
      image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&q=80&auto=format&fit=crop"
    },
    {
      title: "Preserve",
      desc: "Using decentralized storage, we ensure these records are preserved for generations to come.",
      icon: "inventory_2",
      image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=800&q=80&auto=format&fit=crop"
    },
    {
      title: "Share",
      desc: "We build platforms that allow the world to learn from these diverse human experiences.",
      icon: "share",
      image: "https://images.unsplash.com/photo-1580227847702-536440f34085?w=800&q=80&auto=format&fit=crop"
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-surface min-h-screen">
      <div className="max-w-[1200px] mx-auto px-8">
        <header className="mb-24 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-primary font-headline mb-8 tracking-tight">Our Methodology</h1>
          <p className="text-xl text-on-surface-variant font-body leading-relaxed">
            onewholefuture follows a rigorous, community-first approach to digital preservation and social development.
          </p>
        </header>

        <div className="relative">
          {/* Timeline line for desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-emerald-100  -translate-x-1/2"></div>
          
          <div className="space-y-24 lg:space-y-0">
            {steps.map((step, idx) => (
              <div key={idx} className={`relative flex flex-col lg:flex-row items-center gap-12 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="lg:w-1/2 flex justify-center lg:justify-end">
                  <div className={`text-center lg:text-right ${idx % 2 !== 0 ? 'lg:text-left' : ''} max-w-md`}>
                    <h3 className="text-3xl font-bold text-primary font-headline mb-4">{step.title}</h3>
                    <p className="text-lg text-on-surface-variant font-body leading-relaxed">{step.desc}</p>
                  </div>
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center justify-center w-12 h-12 bg-emerald-800 rounded-full border-4 border-surface z-10">
                  <span className="material-symbols-outlined text-white text-xl">{step.icon}</span>
                </div>

                <div className="lg:w-1/2 flex justify-center lg:justify-start">
                  <div className="w-full max-w-md aspect-video bg-stone-100  rounded-[32px] overflow-hidden border border-outline-variant shadow-lg group">
                    <img src={step.image} alt={step.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowWeWorkPage;
