import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-stone-950 text-white w-full mt-auto">
      {/* Main Footer Grid */}
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 pt-16 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

        {/* Brand Column */}
        <div className="lg:col-span-1">
          <Link to="/" className="flex items-center gap-2.5 mb-5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg flex-shrink-0">
              <span className="material-symbols-outlined text-white text-[1.2rem]">eco</span>
            </div>
            <div className="leading-none">
              <span className="block font-headline font-black text-white text-base tracking-tight">One Whole Future</span>
              <span className="block text-[0.5rem] uppercase tracking-[0.35em] text-stone-500 font-bold mt-0.5">Foundation</span>
            </div>
          </Link>
          <p className="font-body text-sm leading-relaxed text-stone-400 mb-6 max-w-xs">
            Identifying, equipping, and deploying the next generation of Ghanaian community changemakers. Local impact. Shared future.
          </p>
          <div className="flex gap-3">
            {[
              { icon: 'language', label: 'Website', href: '#' },
              { icon: 'share', label: 'Social', href: '#' },
              { icon: 'rss_feed', label: 'RSS', href: '#' }
            ].map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-secondary hover:border-secondary/40 hover:bg-stone-800 transition-all duration-300"
              >
                <span className="material-symbols-outlined text-base">{icon}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h5 className="font-headline font-bold text-white mb-5 uppercase text-[0.6rem] tracking-[0.3em]">Navigate</h5>
          <ul className="space-y-3 font-body text-sm">
            {[
              { label: 'About Us', to: '/about' },
              { label: 'Our Programs', to: '/our-work' },
              { label: 'Leadership', to: '/leadership' },
              { label: 'News & Ideas', to: '/news' },
              { label: 'Media Center', to: '/media' },
              { label: 'Careers', to: '/careers' }
            ].map(({ label, to }) => (
              <li key={label}>
                <Link className="text-stone-400 hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200" to={to}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal & Trust */}
        <div>
          <h5 className="font-headline font-bold text-white mb-5 uppercase text-[0.6rem] tracking-[0.3em]">Legal & Trust</h5>
          <ul className="space-y-3 font-body text-sm">
            {[
              { label: 'Privacy Policy', href: '#' },
              { label: 'Terms of Service', href: '#' },
              { label: 'Transparency', href: '#' },
              { label: 'Donor Rights', href: '#' },
              { label: 'Foundation FAQ', to: '/faq' }
            ].map(({ label, href, to }) => (
              <li key={label}>
                {to ? (
                  <Link className="text-stone-400 hover:text-white transition-colors" to={to}>{label}</Link>
                ) : (
                  <a className="text-stone-400 hover:text-white transition-colors" href={href}>{label}</a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Get Involved */}
        <div>
          <h5 className="font-headline font-bold text-white mb-5 uppercase text-[0.6rem] tracking-[0.3em]">Get Involved</h5>
          <ul className="space-y-3 font-body text-sm mb-6">
            {[
              { label: 'Join the Challenge', to: '/signup' },
              { label: 'Ways to Give', to: '/support' },
              { label: 'Volunteer', to: '/volunteers' },
              { label: 'Partner With Us', to: '/contact' },
              { label: 'Offices', to: '/offices' }
            ].map(({ label, to }) => (
              <li key={label}>
                <Link className="text-stone-400 hover:text-white transition-colors" to={to}>{label}</Link>
              </li>
            ))}
          </ul>
          <Link
            to="/support"
            className="inline-block bg-secondary text-white text-[0.65rem] font-black uppercase tracking-widest px-5 py-2.5 rounded-lg hover:bg-secondary/90 transition-all shadow-md shadow-secondary/20"
          >
            Support Our Mission
          </Link>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 py-5 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="font-body text-xs text-stone-600 tracking-wide">
          © {year} One Whole Future Foundation · Accra, Ghana · All rights reserved
        </span>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-secondary">
            <span className="material-symbols-outlined text-base">verified_user</span>
            <span>SDG Aligned</span>
          </div>
          <div className="w-px h-4 bg-stone-800 hidden md:block" />
          <span className="text-[0.6rem] text-stone-600 font-bold uppercase tracking-[0.2em]">Est. 2026</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
