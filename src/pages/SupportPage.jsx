import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SupportPage = () => {
  const [visible, setVisible] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(100);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const amounts = [25, 50, 100, 250, 500];

  return (
    <div className="bg-surface min-h-screen">
      {/* Cinematic Hero */}
      <header className="relative h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/image/young-millennials-african-friends-outdoor-gym-happy-black-people-having-fun-together-generation-z-friendship-concept.jpg"
            className="w-full h-full object-cover"
            alt="Impact imagery"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full pt-20">
          <span className="uppercase tracking-[0.3em] text-[0.65rem] font-bold text-white mb-4 block drop-shadow-md">Invest in the Future</span>
          <h1 className="font-headline text-[3.5rem] lg:text-[6rem] leading-[0.95] font-extrabold tracking-tighter text-white mb-8 drop-shadow-2xl">
            Fueling Radical <br />
            <span className="italic font-light text-secondary">Human Progress.</span>
          </h1>
          <p className="text-xl text-white max-w-xl font-bold leading-relaxed drop-shadow-lg">
            Your support enables us to build decentralized tools, preserve endangered knowledge, and empower communities across Ghana.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 -mt-20 relative z-20 pb-32">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Donation Card */}
          <div className="lg:col-span-7">
            <div className={`bg-white p-12 lg:p-16 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-outline-variant/30 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              <h2 className="font-headline text-3xl font-extrabold text-on-surface mb-12 tracking-tight">Select Impact Level</h2>
              
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mb-12">
                {amounts.map(amt => (
                  <button
                    key={amt}
                    onClick={() => setSelectedAmount(amt)}
                    className={`py-4 rounded-2xl font-bold transition-all border ${
                      selectedAmount === amt 
                        ? 'bg-primary text-on-primary border-primary shadow-lg shadow-primary/20' 
                        : 'bg-surface-container-low text-on-surface-variant border-outline-variant/50 hover:border-primary/50'
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              <div className="relative mb-12">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-headline font-bold text-on-surface-variant/30">$</span>
                <input 
                  type="number" 
                  placeholder="Custom Amount" 
                  className="w-full pl-12 pr-6 py-6 bg-surface-container-low rounded-2xl border border-outline-variant/50 focus:border-primary outline-none transition-all font-headline text-2xl font-bold text-on-surface"
                  onChange={(e) => setSelectedAmount(e.target.value)}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-12">
                <button className="bg-primary text-on-primary font-bold py-6 rounded-2xl hover:shadow-xl hover:shadow-primary/20 transition-all group">
                  Give Monthly <span className="material-symbols-outlined ml-2 text-sm transition-transform group-hover:translate-x-1">favorite</span>
                </button>
                <button className="bg-stone-900 text-white font-bold py-6 rounded-2xl hover:bg-stone-800 transition-all">
                  One-Time Gift
                </button>
              </div>

              <p className="text-center text-xs text-on-surface-variant/60 font-body">
                All contributions are tax-deductible. One Whole Future Foundation is a registered 501(c)(3) nonprofit organization.
              </p>
            </div>
          </div>

          {/* Impact Stats / Sidebar */}
          <div className="lg:col-span-5 space-y-8">
            <div className={`bg-secondary/10 p-10 rounded-[2.5rem] border border-secondary/20 transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              <h3 className="font-headline text-2xl font-bold text-secondary mb-6">Transparency & Trust</h3>
              <ul className="space-y-6">
                {[
                  { title: "Direct Impact", desc: "92% of all funds go directly to our field programs and community grants." },
                  { title: "Radical Openness", desc: "Access our real-time impact dashboard and quarterly financial reports." },
                  { title: "Local Sovereignty", desc: "Projects are community-led, ensuring long-term sustainability." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="material-symbols-outlined text-secondary">check_circle</span>
                    <div>
                      <p className="font-bold text-on-surface text-sm">{item.title}</p>
                      <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`bg-primary p-10 rounded-[2.5rem] text-on-primary transition-all duration-1000 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              <h3 className="font-headline text-2xl font-bold mb-6">Other Ways to Give</h3>
              <div className="space-y-4">
                <Link to="/contact" className="w-full flex items-center justify-between p-4 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition-all group">
                  <span className="font-bold text-sm">Corporate Partnerships</span>
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">east</span>
                </Link>
                <Link to="/contact" className="w-full flex items-center justify-between p-4 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition-all group">
                  <span className="font-bold text-sm">Legacy & Estate Giving</span>
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">east</span>
                </Link>
                <Link to="/contact" className="w-full flex items-center justify-between p-4 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition-all group">
                  <span className="font-bold text-sm">Cryptocurrency Assets</span>
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">east</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Global Impact Vision */}
      <section className="bg-surface-container py-32">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="font-headline text-[3rem] lg:text-[4rem] font-extrabold text-primary mb-12 tracking-tighter leading-tight">
            Your support builds the <br />
            <span className="italic font-light">infrastructure of tomorrow.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { stat: "120+", label: "Communities Supported" },
              { stat: "15k+", label: "Digital Archives Secured" },
              { stat: "100%", label: "Radical Transparency" }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <p className="text-6xl font-headline font-extrabold text-secondary tracking-tighter">{stat.stat}</p>
                <p className="text-sm font-bold uppercase tracking-widest text-on-surface-variant opacity-60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportPage;
