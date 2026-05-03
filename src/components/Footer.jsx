import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-stone-950 text-white w-full rounded-t-none mt-auto py-24">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 px-12 max-w-[1600px] mx-auto">
        <div className="md:col-span-1">
          <div className="text-3xl font-extrabold font-headline mb-8 tracking-tighter flex items-center">
            <span style={{ color: '#006838' }}>onewhole</span>
            <span style={{ color: '#fbb040' }}>future</span>
          </div>
          <p className="font-body text-sm leading-relaxed text-stone-400 mb-8 max-w-xs opacity-80">
            Designing systems for human flourishing. We invest in the fundamental infrastructure of dignity through sustainable action.
          </p>
          <div className="flex gap-4">
            <a className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center text-stone-400 hover:text-primary transition-all duration-300" href="#">
              <span className="material-symbols-outlined text-lg">public</span>
            </a>
            <a className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center text-stone-400 hover:text-primary transition-all duration-300" href="#">
              <span className="material-symbols-outlined text-lg">share</span>
            </a>
            <a className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center text-stone-400 hover:text-primary transition-all duration-300" href="#">
              <span className="material-symbols-outlined text-lg">rss_feed</span>
            </a>
          </div>
        </div>
        
        <div>
          <h5 className="font-headline font-bold text-white mb-8 uppercase text-[0.6rem] tracking-[0.25em]">Navigation</h5>
          <ul className="space-y-4 font-body text-sm">
            <li><Link className="text-stone-400 hover:text-white transition-colors" to="/about">About Us</Link></li>
            <li><Link className="text-stone-400 hover:text-white transition-colors" to="/our-work">Our Work</Link></li>
            <li><Link className="text-stone-400 hover:text-white transition-colors" to="/leadership">Leadership</Link></li>
            <li><Link className="text-stone-400 hover:text-white transition-colors" to="/careers">Careers</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-headline font-bold text-white mb-8 uppercase text-[0.6rem] tracking-[0.25em]">Legal & Trust</h5>
          <ul className="space-y-4 font-body text-sm">
            <li><a className="text-stone-400 hover:text-white transition-colors" href="#">Privacy Policy</a></li>
            <li><a className="text-stone-400 hover:text-white transition-colors" href="#">Terms of Service</a></li>
            <li><a className="text-stone-400 hover:text-white transition-colors" href="#">Transparency</a></li>
            <li><a className="text-stone-400 hover:text-white transition-colors" href="#">Donor Rights</a></li>
          </ul>
        </div>

        <div>
          <h5 className="font-headline font-bold text-white mb-8 uppercase text-[0.6rem] tracking-[0.25em]">Regional Hubs</h5>
          <ul className="space-y-4 font-body text-sm text-stone-400">
            <li className="flex gap-3 items-start group">
              <span className="material-symbols-outlined text-primary text-lg group-hover:scale-110 transition-transform" style={{ color: '#006838' }}>location_on</span>
              <div>
                <span className="block text-white font-bold text-xs uppercase tracking-widest mb-1">Accra</span>
                <span className="opacity-60">12 Independence Ave</span>
              </div>
            </li>
            <li className="flex gap-3 items-start group">
              <span className="material-symbols-outlined text-primary text-lg group-hover:scale-110 transition-transform" style={{ color: '#006838' }}>location_on</span>
              <div>
                <span className="block text-white font-bold text-xs uppercase tracking-widest mb-1">Kumasi</span>
                <span className="opacity-60">Garden City Plaza</span>
              </div>
            </li>
            <li className="flex gap-3 items-start group">
              <span className="material-symbols-outlined text-primary text-lg group-hover:scale-110 transition-transform" style={{ color: '#006838' }}>location_on</span>
              <div>
                <span className="block text-white font-bold text-xs uppercase tracking-widest mb-1">Tamale</span>
                <span className="opacity-60">Savannah Hub Central</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-12 py-10 mt-20 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-6">
        <span className="font-body text-xs text-stone-600 tracking-wide uppercase font-bold">© 2026 onewholefuture. Local Impact, Global Shared Future.</span>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest" style={{ color: '#006838' }}>
            <span className="material-symbols-outlined text-lg">verified_user</span>
            <span>Certified Member</span>
          </div>
          <div className="w-[1px] h-4 bg-stone-800 hidden md:block" />
          <span className="text-[0.65rem] text-stone-500 font-bold uppercase tracking-[0.2em]">Accra, Ghana</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
