import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FOUNDER = {
  name: "Akosua Asaa Manu",
  role: "Founder & Visionary",
  bio: "Communications professional and entrepreneur Akosua Asaa Manu founded One Whole Future Foundation on the belief that lasting national transformation begins in communities powered by the people closest to the problem. Her conviction — that young Ghanaians are the leaders of today, not tomorrow — is the bedrock of every program the Foundation runs.",
  image: "/image/founder.png",
  quote: "The change we are waiting for is already inside us."
};

const TEAM = [
  {
    name: "Dr. Ama Serwah",
    role: "Chief Executive Officer",
    bio: "Ama brings 20+ years of international development experience to guide the Foundation's strategic vision across Ghana and the wider West Africa region.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600&crop=faces"
  },
  {
    name: "Kwame Asante",
    role: "Chief Technology Officer",
    bio: "A pioneer in digital innovation for social good, Kwame leads the Foundation's technology and skills programs from our Accra hub.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600&crop=faces"
  },
  {
    name: "Sarah Abena",
    role: "Director of Impact",
    bio: "Sarah designs and measures the Foundation's systems-change programs, ensuring every initiative creates documentable, SDG-aligned outcomes.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=600&crop=faces"
  },
  {
    name: "Kofi Mensah",
    role: "Head of Community Programs",
    bio: "Kofi oversees the Changemakers Challenge across all 12 active districts, managing cohort recruitment, mentorship, and project evaluation.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600&crop=faces"
  },
  {
    name: "Araba Quansah",
    role: "Policy & Partnerships Lead",
    bio: "Araba bridges the Foundation's community-level work with national policy conversations, building lasting institutional relationships.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=600&crop=faces"
  },
  {
    name: "John Tetteh",
    role: "Director of Operations",
    bio: "John ensures the seamless execution of multi-region programs, keeping field teams coordinated and resources flowing to where they matter most.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600&crop=faces"
  }
];

const BOARD = [
  "Dr. Kofi Annan II",
  "Sarah J. Boateng",
  "Kwame K. Mensah",
  "Abena A. Serwah"
];

const LeadershipPage = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-surface min-h-screen">

      {/* ─── HERO ─── */}
      <header className="relative h-[60vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0 bg-primary">
          <img
            src="/image/apex-360-Wt2unQdiJb4-unsplash.jpg"
            className="w-full h-full object-cover opacity-20 grayscale"
            alt="Foundation backdrop"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full pb-16 pt-32">
          <span className="uppercase tracking-[0.3em] text-[0.65rem] font-bold text-secondary mb-4 block">The People</span>
          <h1 className="font-headline text-[3rem] lg:text-[5.5rem] leading-[0.95] font-extrabold tracking-tighter text-white mb-4">
            Our <span className="italic font-light text-secondary">Leadership.</span>
          </h1>
          <p className="text-lg text-white/60 max-w-xl font-light leading-relaxed">
            A collective of visionaries, builders, and community leaders dedicated to the radical elevation of Ghana's youth.
          </p>
        </div>
      </header>

      {/* ─── FOUNDER FEATURE ─── */}
      <section className="bg-surface-container-lowest border-b border-outline-variant/10 py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-bold mb-8 block">The Visionary</span>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

            {/* Image */}
            <div className="lg:col-span-4 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-tertiary/20 rounded-[2.5rem] transform -translate-x-4 translate-y-4 -z-10" />
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border border-outline-variant/20 relative group">
                <img
                  src={FOUNDER.image}
                  alt={FOUNDER.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Name badge */}
              <div className="absolute -bottom-5 right-4 lg:-right-5 bg-white border border-outline-variant/20 shadow-2xl px-6 py-4 rounded-2xl backdrop-blur-lg">
                <p className="font-headline font-black text-primary text-sm leading-tight">{FOUNDER.name}</p>
                <p className="font-label text-[10px] text-secondary font-bold uppercase tracking-widest mt-0.5">Founder & Visionary</p>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-8 space-y-8">
              <blockquote className="relative">
                <span className="material-symbols-outlined text-secondary/30 text-7xl absolute -top-4 -left-2">format_quote</span>
                <p className="font-headline text-2xl md:text-4xl font-bold text-primary tracking-tight leading-snug relative z-10 pl-4">
                  "{FOUNDER.quote}"
                </p>
              </blockquote>

              <p className="font-body text-lg text-on-surface-variant leading-relaxed max-w-2xl border-l-4 border-secondary/30 pl-6">
                {FOUNDER.bio}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/about"
                  className="flex items-center gap-2 bg-primary text-white px-7 py-3.5 rounded-full font-headline font-bold text-xs uppercase tracking-widest hover:bg-secondary transition-all shadow-md"
                >
                  Our Story <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center gap-2 border border-primary/30 text-primary px-7 py-3.5 rounded-full font-headline font-bold text-xs uppercase tracking-widest hover:bg-primary-container transition-all"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TEAM GRID ─── */}
      <main className="max-w-7xl mx-auto px-8 py-20">
        <div className="mb-12">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-bold mb-4 block">The Team</span>
          <h2 className="font-headline text-3xl lg:text-5xl font-extrabold text-primary tracking-tighter">
            Driving the mission.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {TEAM.map((leader, idx) => (
            <div
              key={idx}
              className="group transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: `${idx * 120}ms`
              }}
            >
              <div className="relative overflow-hidden rounded-[2rem] aspect-[4/5] mb-6 bg-surface-container-low shadow-sm group-hover:shadow-2xl group-hover:shadow-primary/5 transition-all duration-700">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              <div className="space-y-3 px-1">
                <div>
                  <span className="text-[0.6rem] font-bold uppercase tracking-[0.25em] text-secondary mb-2 block">{leader.role}</span>
                  <h3 className="text-2xl font-headline font-bold text-on-surface tracking-tighter group-hover:text-primary transition-colors leading-tight">
                    {leader.name}
                  </h3>
                </div>
                <p className="text-sm text-on-surface-variant font-light leading-relaxed pt-3 border-t border-outline-variant/30">
                  {leader.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ─── BOARD OF TRUSTEES ─── */}
      <section className="bg-surface-container py-16 border-t border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-baseline justify-between gap-10 mb-12">
            <div>
              <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-bold mb-3 block">Governance</span>
              <h2 className="font-headline text-3xl lg:text-4xl font-extrabold tracking-tighter text-primary">Board of Trustees</h2>
            </div>
            <p className="text-on-surface-variant max-w-md font-light leading-relaxed">
              Providing strategic oversight and ensuring the alignment of our work with the core mission of community-led youth empowerment.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {BOARD.map(name => (
              <div key={name} className="bg-white p-6 rounded-2xl border border-outline-variant/20 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-primary">person</span>
                </div>
                <p className="font-headline text-base font-bold text-on-surface leading-tight">{name}</p>
                <p className="text-[10px] text-secondary font-bold uppercase tracking-widest mt-1.5">Trustee</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── JOIN US CTA ─── */}
      <section className="bg-secondary py-12 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-black text-primary tracking-tighter mb-4">Join the movement.</h2>
          <p className="font-body text-primary/70 text-lg mb-8">
            We're always looking for passionate people to join our team and help build Ghana's next generation of leaders.
          </p>
          <Link to="/careers" className="inline-block bg-primary text-white px-10 py-4 rounded-full font-headline font-bold text-sm uppercase tracking-widest hover:bg-primary/90 hover:scale-105 transition-all shadow-lg shadow-primary/20">
            View Open Roles
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LeadershipPage;
