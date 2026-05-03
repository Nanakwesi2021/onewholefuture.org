import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMenu(null);
    setExpandedSection(null);
  }, [location.pathname]);

  const menus = {
    about: [
      { name: 'Our Story', path: '/about#story', desc: 'Our journey from inception to global impact.' },
      { name: 'Our Role', path: '/about#role', desc: 'Understanding our position in global development.' },
      { name: 'Foundation Fact Sheet', path: '/about#fact-sheet', desc: 'Quick facts and key performance indicators.' },
      { name: 'Leadership', path: '/leadership', desc: 'The visionaries driving our global mission.' },
      { name: 'Financials', path: '/about#financials', desc: 'Our commitment to transparency and accountability.' },
      { name: 'Media Center', path: '/media', desc: 'Latest press releases, assets, and news.' },
      { name: 'How We Work', path: '/how-we-work', desc: 'Our strategic approach to sustainable change.' },
      { name: 'Diversity, Equity, & Inclusion', path: '/dei', desc: 'Fostering a global culture of belonging.' },
      { name: 'Careers', path: '/careers', desc: 'Join our mission and make a global impact.' },
      { name: 'Offices', path: '/offices', desc: 'Find our strategic hubs across continents.' },
      { name: 'Contact', path: '/contact', desc: 'Get in touch with our global teams.' },
      { name: 'Volunteers', path: '/volunteers', desc: 'Join our community and make a direct impact.' },
      { name: 'Foundation FAQ', path: '/faq', desc: 'Common questions about our operations.' },
    ],
    work: [
      { name: 'Areas of Impact', path: '/our-work#impact', desc: 'Defining the sectors where we drive change.' },
      { name: 'Health', path: '/our-work#health', desc: 'Strengthening healthcare systems worldwide.' },
      { name: 'Gender Equality', path: '/our-work#gender', desc: 'Empowering women and girls for a fair future.' },
      { name: 'Community Development', path: '/our-work#community', desc: 'Building resilient and thriving communities.' },
      { name: 'Education', path: '/our-work#education', desc: 'Unlocking potential through quality learning.' },
      { name: 'Technology', path: '/our-work#technology', desc: 'Leveraging digital tools for global good.' },
      { name: 'Technical Skills', path: '/our-work#skills', desc: 'Bridging the global skills gap.' },
    ],
    ideas: [
      { name: 'Economic Opportunity', path: '/ideas#economic', desc: 'Strategies for inclusive economic growth.' },
      { name: 'Maternal & Child Health', path: '/ideas#maternal', desc: 'Reducing mortality and improving care.' },
      { name: 'News Portal', path: '/news', desc: 'In-depth reporting from the field.' },
    ]
  };

  const navLabels = { about: 'About Us', work: 'Our Work', ideas: 'Ideas' };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/95 backdrop-blur-xl shadow-xl py-3' : 'bg-white/80 backdrop-blur-md py-5'
      } border-b border-outline-variant/10`}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="flex justify-between items-center px-6 md:px-12 max-w-[1440px] mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-[1.4rem] group-hover:rotate-12 transition-transform duration-500">eco</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-headline font-black text-primary text-lg lg:text-xl tracking-tight">One Whole Future</span>
            <span className="text-[0.5rem] uppercase tracking-[0.4em] text-outline font-bold">Foundation</span>
          </div>
        </Link>
        
        {/* Desktop Navigation - Hidden on Mobile/Tablet */}
        <div className="hidden lg:flex items-center gap-12 font-headline text-[0.7rem] font-bold tracking-[0.2em] uppercase">
          {Object.entries(navLabels).map(([key, label]) => (
            <div 
              key={key} 
              className="relative py-2 group cursor-pointer"
              onMouseEnter={() => setActiveMenu(key)}
            >
              <Link 
                to={key === 'work' ? '/our-work' : `/${key}`}
                className={`flex items-center gap-2 transition-colors duration-300 ${activeMenu === key || (location.pathname.includes(key) && !activeMenu) ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}
              >
                {label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${activeMenu === key || (location.pathname.includes(key) && !activeMenu) ? 'w-full' : 'w-0'}`}></span>
                <span className={`material-symbols-outlined text-[1.1rem] transition-transform duration-300 ${activeMenu === key ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </Link>
            </div>
          ))}
        </div>

        {/* Actions & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link to="/support" className="hidden lg:block bg-primary text-on-primary px-8 py-3 rounded-xl font-headline text-[0.7rem] font-bold tracking-widest uppercase hover:bg-primary/90 hover:shadow-xl transition-all">
            Ways to Give
          </Link>
          
          <button 
            className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant/10 text-primary font-headline font-bold text-[0.6rem] uppercase tracking-widest hover:bg-white transition-all"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="hidden sm:inline">Menu</span>
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
        </div>
      </div>

      {/* Desktop Mega Menu Dropdown */}
      <div 
        className={`hidden lg:block absolute top-full left-0 w-full bg-white border-t border-outline-variant/10 shadow-[0_40px_80px_rgba(0,0,0,0.15)] overflow-hidden transition-all duration-500 ease-out origin-top z-40 ${
          activeMenu ? 'max-h-[700px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-12 py-16 grid grid-cols-12 gap-16">
          <div className="col-span-4 border-r border-outline-variant/10 pr-16">
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.4em] text-tertiary mb-6 block">
              {activeMenu === 'about' ? 'Identity' : activeMenu === 'work' ? 'Interventions' : 'Insights'}
            </span>
            <h3 className="font-headline text-4xl font-extrabold text-primary tracking-tight leading-[1.1] mb-6">
              {activeMenu === 'about' ? 'Our Foundation & Vision' : activeMenu === 'work' ? 'Our Global Impact' : 'The Knowledge Hub'}
            </h3>
            <p className="font-body text-on-surface-variant leading-relaxed text-[0.9rem] mb-10 opacity-90">
              {activeMenu === 'about' && 'Documenting and preserving the intangible cultural heritage of humanity through strategic global partnerships.'}
              {activeMenu === 'work' && 'Discover our active interventions and strategic funding initiatives across 50+ nations.'}
              {activeMenu === 'ideas' && 'Explore ground-breaking research and field reports from our global network.'}
            </p>
          </div>

          <div className="col-span-8">
            <div className="grid grid-cols-2 gap-x-10 gap-y-2">
              {activeMenu && menus[activeMenu].map((item) => (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  className="group flex flex-col p-5 rounded-2xl hover:bg-surface-container-low transition-all duration-300 border border-transparent hover:border-outline-variant/10"
                  onClick={() => setActiveMenu(null)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-headline text-[0.95rem] font-bold text-on-surface group-hover:text-primary transition-colors">
                      {item.name}
                    </span>
                    <span className="material-symbols-outlined text-[1.1rem] opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 text-primary">
                      trending_flat
                    </span>
                  </div>
                  <span className="text-[0.75rem] text-on-surface-variant/70 leading-tight group-hover:text-on-surface transition-colors">
                    {item.desc}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Sidebar Drawer */}
      <div 
        className={`lg:hidden fixed top-0 right-0 h-screen w-[85%] max-w-sm bg-white z-[70] shadow-2xl transition-transform duration-500 transform ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col p-8 overflow-y-auto">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[1.4rem]">eco</span>
              </div>
              <span className="font-headline font-black text-primary text-xl">OWF</span>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-low text-primary">
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {Object.entries(navLabels).map(([key, label]) => (
              <div key={key} className="border-b border-outline-variant/10 last:border-0">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpandedSection(expandedSection === key ? null : key);
                  }}
                  className="w-full flex justify-between items-center py-6 text-left"
                >
                  <span className="text-2xl font-headline font-black text-primary uppercase tracking-tight">{label}</span>
                  <span className={`material-symbols-outlined transition-transform duration-300 ${expandedSection === key ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ${expandedSection === key ? 'max-h-[1000px] mb-6' : 'max-h-0'}`}>
                  <div className="flex flex-col gap-5 pl-4 border-l-2 border-primary/20">
                    {menus[key].map(item => (
                      <Link 
                        key={item.name} 
                        to={item.path} 
                        className="group"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="font-bold text-on-surface text-lg group-hover:text-primary transition-colors">{item.name}</div>
                        <div className="text-xs text-on-surface-variant/70 leading-tight mt-1">{item.desc}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-10">
            <Link 
              to="/support" 
              className="block w-full bg-primary text-on-primary text-center py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              Support Our Mission
            </Link>
            <p className="text-center text-[0.6rem] text-outline font-bold uppercase tracking-[0.2em] opacity-40 mt-8">
              © 2026 One Whole Future Foundation
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
