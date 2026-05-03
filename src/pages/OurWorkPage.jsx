import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const OurWorkPage = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const sectors = [
    {
      id: "health",
      title: "Health",
      subtitle: "Strengthening healthcare systems worldwide.",
      desc: "We invest in local medical infrastructure and digital health records to ensure that even the most remote communities have access to life-saving care and historical medical data.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80&auto=format&fit=crop",
      metric: "50+ Clinics Digitized",
      color: "bg-emerald-50"
    },
    {
      id: "gender",
      title: "Gender Equality",
      subtitle: "Empowering women and girls for a fair future.",
      desc: "Our programs focus on digital literacy and financial independence for women, bridging the gender gap in the technology sector and beyond.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&q=80&auto=format&fit=crop",
      metric: "12k+ Women Trained",
      color: "bg-amber-50"
    },
    {
      id: "community",
      title: "Community Development",
      subtitle: "Building resilient and thriving communities.",
      desc: "We support grassroots organizations that preserve local wisdom and drive sustainable urban and rural development through community-led action.",
      image: "https://images.unsplash.com/photo-1540575861501-7cf05a4b175a?w=1200&q=80&auto=format&fit=crop",
      metric: "200+ Projects Funded",
      color: "bg-blue-50"
    },
    {
      id: "education",
      title: "Education",
      subtitle: "Unlocking potential through quality learning.",
      desc: "From digital archives for schools to teacher training programs, we are ensuring that the next generation has the tools to learn from the past and build the future.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80&auto=format&fit=crop",
      metric: "500k+ Students Reached",
      color: "bg-rose-50"
    },
    {
      id: "technology",
      title: "Technology",
      subtitle: "Leveraging digital tools for global good.",
      desc: "We pioneer the use of decentralized storage and AI to preserve endangered human stories, creating a permanent digital record of our shared heritage.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80&auto=format&fit=crop",
      metric: "1PB+ Data Preserved",
      color: "bg-indigo-50"
    },
    {
      id: "skills",
      title: "Technical Skills",
      subtitle: "Bridging the global skills gap.",
      desc: "Our vocational training centers provide hands-on experience in high-demand fields, from coding to renewable energy systems.",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80&auto=format&fit=crop",
      metric: "95% Job Placement Rate",
      color: "bg-stone-50"
    }
  ];

  return (
    <div className="bg-surface min-h-screen">
      {/* Cinematic Hero */}
      <header className="relative h-[85vh] flex items-center overflow-hidden bg-surface" id="impact">
        <div className="absolute inset-0 z-0">
          <img
            src="/image/apex-360-Wt2unQdiJb4-unsplash.jpg"
            className="w-full h-full object-cover"
            alt="Impact Strategy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface/80 via-surface/30 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full pt-20">
          <span className="uppercase tracking-[0.4em] text-[0.8rem] font-black text-primary/60 mb-6 block animate-fadeSlideUp">Impact Strategy</span>
          <h1 className="font-headline text-[5rem] lg:text-[8.5rem] leading-[0.85] font-black tracking-tighter text-primary mb-10 animate-fadeSlideUp">
            Areas of <br />
            <span className="italic font-light text-secondary">Impact.</span>
          </h1>
          <p className="text-xl lg:text-2xl text-on-surface max-w-2xl font-bold leading-relaxed animate-fadeSlideUp delay-100">
            We operate across seven key sectors, using a systemic approach to drive progress and preserve human sovereignty.
          </p>
        </div>
      </header>

      <main className="pb-40">
        {sectors.map((sector, idx) => (
          <section 
            key={sector.id} 
            id={sector.id}
            className={`py-32 scroll-mt-24 ${sector.color}`}
          >
            <div className="max-w-7xl mx-auto px-8">
              <div className={`grid lg:grid-cols-2 gap-24 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`${idx % 2 !== 0 ? 'lg:order-2' : ''} transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                  <span className="text-[0.65rem] font-bold text-primary uppercase tracking-[0.3em] mb-4 block">{sector.subtitle}</span>
                  <h2 className="text-5xl lg:text-7xl font-bold text-primary font-headline mb-8 tracking-tighter">{sector.title}</h2>
                  <p className="text-xl text-on-surface-variant font-body leading-relaxed mb-10 max-w-xl">
                    {sector.desc}
                  </p>
                  <div className="flex items-center gap-6">
                    <div className="bg-primary text-white px-8 py-4 rounded-2xl font-headline font-bold text-sm">
                      {sector.metric}
                    </div>
                    <Link to="/contact" className="text-primary font-bold hover:underline">
                      Learn More
                    </Link>
                  </div>
                </div>

                <div className={`${idx % 2 !== 0 ? 'lg:order-1' : ''} transition-all duration-1000 delay-200 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                  <div className="relative aspect-video lg:aspect-square rounded-[3rem] overflow-hidden shadow-2xl group">
                    <img 
                      src={sector.image} 
                      alt={sector.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </main>

      {/* CTA Section */}
      <section className="bg-primary py-32 px-8">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl lg:text-6xl font-bold font-headline mb-8 tracking-tight">Ready to make an impact?</h2>
          <p className="text-xl opacity-80 mb-12 max-w-2xl mx-auto">
            Whether you are a local organization or a global partner, we have the resources and expertise to help you scale your mission.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/contact" className="bg-secondary text-primary px-12 py-5 rounded-full font-headline font-bold text-lg hover:scale-105 transition-all">
              Partner With Us
            </Link>
            <Link to="/signup" className="bg-white/10 backdrop-blur-md border border-white/20 px-12 py-5 rounded-full font-headline font-bold text-lg hover:bg-white/20 transition-all">
              Apply for Grants
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurWorkPage;
