import React from 'react';
import { Link } from 'react-router-dom';

const ThankYouPage = () => {
  return (
    <div className="bg-surface text-on-surface antialiased">
      <main className="relative min-h-screen pt-16 flex flex-col items-center justify-center overflow-hidden">
        {/* Large High-Impact Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            alt="Elderly portrait" 
            className="w-full h-full object-cover" 
            src="https://images.unsplash.com/photo-1542156822-6924d1a71aba?q=80&w=2070&auto=format&fit=crop"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/40 to-primary/90 mix-blend-multiply"></div>
        </div>

        {/* Content Canvas */}
        <section className="relative z-10 w-full max-w-4xl px-6 py-20 text-center text-white">
          <div className="mb-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-container text-on-primary-container text-xs font-label uppercase tracking-widest mb-6">Success</span>
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 leading-tight">
              Thank You.
            </h1>
            <p className="font-headline text-xl md:text-2xl text-on-primary-container max-w-2xl mx-auto mb-12 opacity-90 leading-relaxed">
              Your contribution ensures that the voices of the marginalized are preserved for generations. You are now a guardian of our shared history.
            </p>
          </div>

          {/* Impact Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-outline-variant/20 rounded-xl overflow-hidden backdrop-blur-md mb-12">
            <div className="bg-surface-container-lowest/10 p-8 flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-primary-fixed-dim text-4xl mb-4">auto_stories</span>
              <h3 className="font-headline font-bold text-2xl mb-1 text-white">12 Records</h3>
              <p className="font-label text-sm text-stone-300 uppercase tracking-wide">Digitized Today</p>
            </div>
            <div className="bg-surface-container-lowest/10 p-8 flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-primary-fixed-dim text-4xl mb-4">public</span>
              <h3 className="font-headline font-bold text-2xl mb-1 text-white">Community Reach</h3>
              <p className="font-label text-sm text-stone-300 uppercase tracking-wide">Northern Region, Ghana</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link to="/our-work" className="group relative px-10 py-4 bg-primary text-on-primary rounded-md font-headline font-bold text-lg overflow-hidden transition-all hover:scale-[0.98]">
              <span className="relative z-10">Explore Field Reports</span>
              <div className="absolute inset-0 bg-primary-container opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            <button className="px-10 py-4 bg-transparent border border-white/30 text-white rounded-md font-headline font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-xl">share</span>
              Share the Impact
            </button>
          </div>
        </section>

        {/* Social Share Context (Subtle) */}
        <div className="relative z-10 mt-4 flex gap-4">
          <a className="w-10 h-10 rounded-full flex items-center justify-center text-stone-300 hover:text-white hover:bg-white/10 transition-all" href="#facebook">
            <span className="material-symbols-outlined">social_leaderboard</span>
          </a>
          <a className="w-10 h-10 rounded-full flex items-center justify-center text-stone-300 hover:text-white hover:bg-white/10 transition-all" href="#add">
            <span className="material-symbols-outlined">post_add</span>
          </a>
          <a className="w-10 h-10 rounded-full flex items-center justify-center text-stone-300 hover:text-white hover:bg-white/10 transition-all" href="#link">
            <span className="material-symbols-outlined">link</span>
          </a>
        </div>
      </main>
    </div>
  );
};

export default ThankYouPage;
