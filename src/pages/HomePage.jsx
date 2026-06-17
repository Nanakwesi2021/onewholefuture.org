import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const HERO_IMAGES = [
  "/image/kojo-nana-GtnFtsPXKME-unsplash.jpg",
  "/image/young-millennials-african-friends-outdoor-gym-happy-black-people-having-fun-together-generation-z-friendship-concept.jpg",
  "/image/moses-janga-oKipTpccpQE-unsplash.jpg"
];

const PILLAR_IMAGES = {
  education: "/image/medical-assistant-student-reading-green-lamp-library.jpg",
  healthcare: "/image/jeffrey-ofori-tOshpNl-sW4-unsplash.jpg",
  empowerment: "/image/peaceful-businessman-vr-headset-enjoying-virtual-video.jpg"
};

const STATS = [
  { value: '25k+', label: 'Youth Impacted', icon: 'groups' },
  { value: '140+', label: 'Verified Projects', icon: 'task_alt' },
  { value: '12', label: 'Active Districts', icon: 'location_on' },
  { value: '50+', label: 'Partner Network', icon: 'handshake' }
];

const PILLARS = [
  {
    title: 'Changemakers Challenge',
    desc: 'A flagship program that equips young Ghanaians to identify, design, and execute real community solutions.',
    img: PILLAR_IMAGES.education,
    icon: 'emoji_events'
  },
  {
    title: 'Community Action',
    desc: 'Ground-level intervention programs that mobilize youth across 12 districts to lead grassroots change.',
    img: PILLAR_IMAGES.healthcare,
    icon: 'volunteer_activism'
  },
  {
    title: 'Digital & Skills Hub',
    desc: 'Bridging the skills gap through technology, mentorship, and enterprise training for the next generation.',
    img: PILLAR_IMAGES.empowerment,
    icon: 'hub'
  }
];

const TESTIMONIALS = [
  {
    quote: "The Changemakers Challenge didn't just give me skills — it gave me a community that believed in my vision before I even believed in it myself.",
    author: "Abena Mensah",
    role: "Changemaker Cohort 1",
    location: "Accra, Ghana",
    avatar: "A"
  },
  {
    quote: "One Whole Future Foundation showed us that lasting change doesn't come from the outside. It grows from within the communities that know their own needs best.",
    author: "Kwame Osei",
    role: "Community Project Lead",
    location: "Kumasi, Ghana",
    avatar: "K"
  }
];

const HomePage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const statsRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newsletterEmail)) {
      setError('Please provide a valid email address.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await addDoc(collection(db, 'newsletter_subscribers'), {
        email: newsletterEmail,
        subscribedAt: serverTimestamp(),
        source: 'homepage_banner'
      });
      setSubscribed(true);
      setNewsletterEmail('');
    } catch (err) {
      console.error("Error subscribing:", err);
      setError("Connectivity issue. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-surface">

      {/* ─── HERO ─── */}
      <section className="relative h-[85vh] min-h-[520px] overflow-hidden">
        {HERO_IMAGES.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${idx === activeSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/50 to-transparent z-10" />
            <img src={img} alt="Hero" className="w-full h-full object-cover scale-105" />
          </div>
        ))}

        {/* Slide indicators */}
        <div className="absolute bottom-20 left-6 md:left-24 z-30 flex gap-2">
          {HERO_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-1 rounded-full transition-all duration-500 ${idx === activeSlide ? 'w-8 bg-secondary' : 'w-2 bg-white/40'}`}
            />
          ))}
        </div>

        <div className={`relative z-20 h-full flex flex-col items-start justify-center text-left px-6 md:px-24 max-w-[1440px] mx-auto transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <span className="font-label text-[0.6rem] uppercase tracking-[0.4em] text-secondary font-bold mb-4 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 inline-block">
            Empowering Ghana's Youth
          </span>
          <h1 className="font-headline text-4xl sm:text-5xl md:text-[5rem] font-black tracking-tighter mb-4 leading-[0.88]">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-accent to-tertiary drop-shadow-2xl">
              ONE WHOLE<br/>FUTURE
            </span>
          </h1>
          <p className="font-body text-base md:text-lg text-white/85 max-w-xl leading-relaxed mb-6">
            Identifying, equipping, and deploying the next generation of Ghanaian community changemakers — from idea to verified impact.
          </p>
          <div className="flex flex-wrap gap-4 w-full sm:w-auto">
            <Link to="/about" className="flex-1 sm:flex-none text-center bg-secondary text-white px-8 md:px-10 py-4 rounded-full font-headline text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-secondary/90 hover:scale-105 transition-all shadow-lg shadow-secondary/20">
              Our Mission
            </Link>
            <Link to="/signup" className="flex-1 sm:flex-none text-center bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 md:px-10 py-4 rounded-full font-headline text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-white/20 transition-all">
              Join the Challenge
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity"
        >
          <span className="text-[10px] font-label text-white uppercase tracking-[0.3em] font-bold">Scroll</span>
          <span className="material-symbols-outlined text-white text-base">expand_more</span>
        </div>
      </section>

      {/* ─── STATS TICKER ─── */}
      <section className="bg-surface-container-low border-b border-outline-variant/10 py-10" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-outline-variant/30">
            {STATS.map((stat) => (
              <div key={stat.label} className="pt-6 lg:pt-0 lg:px-8 flex flex-col items-center group cursor-pointer transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-2xl bg-primary-container text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-on-primary transition-all duration-500 shadow-md">
                  <span className="material-symbols-outlined">{stat.icon}</span>
                </div>
                <div className="font-headline text-2xl md:text-3xl font-black text-primary tracking-tight mb-1">{stat.value}</div>
                <div className="font-label text-xs md:text-sm font-bold uppercase tracking-widest text-secondary opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOUNDER QUOTE BANNER ─── */}
      <section className="bg-primary py-14 px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="material-symbols-outlined text-secondary text-4xl mb-4 block">format_quote</span>
          <blockquote className="font-headline text-2xl md:text-3xl font-bold text-white leading-snug tracking-tight mb-6">
            "The change we are waiting for is already inside us."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-secondary">
              <img src="/image/founder.png" alt="Akosua Asaa Manu" className="w-full h-full object-cover" />
            </div>
            <p className="font-body text-white/80 text-sm">
              <strong className="text-white">Akosua Asaa Manu</strong> · Founder, One Whole Future Foundation
            </p>
          </div>
        </div>
      </section>

      {/* ─── OUR PROGRAMS ─── */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-headline text-3xl md:text-5xl font-black text-primary mb-4 tracking-tighter">
              OUR <span className="text-secondary">PROGRAMS</span>
            </h2>
            <p className="font-body text-lg md:text-xl text-on-surface-variant leading-relaxed">
              Purpose-built initiatives that take young Ghanaians from raw potential to verified, documented community impact.
            </p>
          </div>
          <Link to="/our-work" className="group flex items-center gap-3 text-secondary font-headline font-bold uppercase tracking-widest text-xs md:text-sm hover:translate-x-2 transition-transform">
            See All Programs <span className="material-symbols-outlined">trending_flat</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {PILLARS.map((item, idx) => (
            <div key={idx} className="group relative bg-surface-container-low rounded-[2rem] overflow-hidden border border-outline-variant/10 hover:shadow-2xl transition-all duration-500">
              <div className="relative h-44 md:h-52 overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
                  <span className="material-symbols-outlined text-white">{item.icon}</span>
                </div>
              </div>
              <div className="p-5 md:p-7">
                <h3 className="font-headline text-lg md:text-xl font-extrabold text-primary mb-3">{item.title}</h3>
                <p className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed mb-6">{item.desc}</p>
                <div className="w-12 h-1 bg-tertiary rounded-full group-hover:w-full transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="bg-surface-container-low border-t border-b border-outline-variant/10 py-14">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-secondary uppercase tracking-[0.3em] bg-secondary-container/30 px-4 py-1.5 rounded-full mb-4 inline-block">The Model</span>
            <h2 className="font-headline text-3xl md:text-4xl font-black text-primary tracking-tighter mt-3">Five pillars. One movement.</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {['Identify', 'Design', 'Execute', 'Report', 'Scale'].map((step, idx) => (
              <div key={step} className="group flex flex-col items-center text-center p-6 rounded-3xl bg-white border border-outline-variant/10 hover:border-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center font-headline font-black text-primary text-sm mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <span className="font-headline font-bold text-primary text-sm">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="bg-white py-14 border-t border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold text-secondary uppercase tracking-[0.3em] bg-secondary-container/30 px-4 py-1.5 rounded-full mb-4 inline-block">Voices of Impact</span>
            <h2 className="font-headline text-3xl md:text-5xl font-black text-primary tracking-tighter mt-3">
              STORIES FROM THE <span className="text-secondary">FIELD</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-surface-container-lowest p-6 md:p-8 rounded-[2rem] border border-outline-variant/10 shadow-xl shadow-primary/5 relative group hover:shadow-2xl hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <span className="material-symbols-outlined text-tertiary text-6xl absolute top-6 right-8 opacity-20 group-hover:opacity-40 transition-opacity">format_quote</span>
                <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed italic relative z-10 mb-8 font-light">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-4 relative z-10 pt-6 border-t border-outline-variant/10">
                  <div className="w-12 h-12 rounded-2xl bg-secondary text-white font-bold flex items-center justify-center text-lg shadow-md">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-primary text-sm md:text-base leading-snug">{t.author}</h4>
                    <p className="text-[10px] md:text-xs text-on-surface-variant font-label uppercase tracking-widest mt-0.5">{t.role}</p>
                    <p className="text-[9px] text-secondary font-label uppercase tracking-widest mt-0.5">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA + NEWSLETTER UNIFIED SECTION ─── */}
      <section className="relative overflow-hidden bg-primary">
        {/* Large decorative background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-headline font-black text-white/[0.03] text-[18vw] leading-none tracking-tighter whitespace-nowrap">
            FUTURE
          </span>
        </div>

        {/* Glowing orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/15 rounded-full blur-[120px] -mr-80 -mt-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-tertiary/10 rounded-full blur-[100px] -ml-40 -mb-40 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">

          {/* ── Top half: CTA ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-16 pb-14 border-b border-white/10 items-center">
            {/* Left: heading */}
            <div>
              <span className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/30 text-secondary px-4 py-1.5 rounded-full text-[0.65rem] font-black uppercase tracking-[0.25em] mb-6">
                <span className="material-symbols-outlined text-[14px]">rocket_launch</span>
                Take Action
              </span>
              <h2 className="font-headline text-4xl md:text-6xl font-black text-white tracking-tighter leading-[0.92] mb-5">
                Ready to be<br />
                <span className="text-tertiary">the change?</span>
              </h2>
              <p className="font-body text-white/60 text-base md:text-lg max-w-md leading-relaxed">
                Join hundreds of young Ghanaians already leading verified, SDG-aligned community projects across 12 districts.
              </p>
            </div>

            {/* Right: action cards */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4">
              {/* Apply Card */}
              <Link
                to="/signup"
                className="group flex-1 relative bg-secondary hover:bg-secondary/90 rounded-3xl p-7 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-secondary/30 overflow-hidden"
              >
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full" />
                <div className="w-11 h-11 bg-white/20 rounded-2xl flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-white text-xl">emoji_events</span>
                </div>
                <div>
                  <p className="font-headline font-black text-white text-lg tracking-tight">Join the Challenge</p>
                  <p className="font-body text-white/70 text-xs mt-1 leading-snug">Apply to the Changemakers Challenge — no experience required.</p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1 text-white/80 text-[0.65rem] font-bold uppercase tracking-widest group-hover:gap-3 transition-all">
                  Apply Now <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </Link>

              {/* Support Card */}
              <Link
                to="/support"
                className="group flex-1 relative bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-3xl p-7 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm overflow-hidden"
              >
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-tertiary/5 rounded-full" />
                <div className="w-11 h-11 bg-tertiary/20 rounded-2xl flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-tertiary text-xl">volunteer_activism</span>
                </div>
                <div>
                  <p className="font-headline font-black text-white text-lg tracking-tight">Support Our Work</p>
                  <p className="font-body text-white/50 text-xs mt-1 leading-snug">Your investment funds the next generation of community leaders.</p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1 text-tertiary/80 text-[0.65rem] font-bold uppercase tracking-widest group-hover:gap-3 transition-all">
                  Ways to Give <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </Link>
            </div>
          </div>

          {/* ── Bottom half: Newsletter ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-14 items-center">
            {/* Left: newsletter copy */}
            <div>
              <span className="inline-flex items-center gap-2 bg-tertiary/20 border border-tertiary/30 text-tertiary px-4 py-1.5 rounded-full text-[0.65rem] font-black uppercase tracking-[0.25em] mb-6">
                <span className="material-symbols-outlined text-[14px]">mail</span>
                Newsletter
              </span>
              <h3 className="font-headline text-3xl md:text-5xl font-black text-white tracking-tighter leading-[0.95] mb-4">
                Join the <span className="text-tertiary italic">mission.</span>
              </h3>
              <p className="font-body text-white/55 text-base leading-relaxed max-w-md">
                Weekly Changemaker stories, project spotlights, and impact milestones — straight to your inbox.
              </p>
              {/* Social proof pills */}
              <div className="flex flex-wrap gap-3 mt-6">
                {['No spam, ever', 'Unsubscribe anytime', 'Free'].map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-white/50 px-3 py-1 rounded-full text-[0.6rem] font-bold uppercase tracking-wider">
                    <span className="material-symbols-outlined text-secondary text-[12px]">check_circle</span>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:pl-8">
              {subscribed ? (
                <div className="bg-white/5 backdrop-blur-xl p-10 rounded-3xl border border-white/10 text-center">
                  <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-secondary/30">
                    <span className="material-symbols-outlined text-white text-3xl">check</span>
                  </div>
                  <h4 className="font-headline text-2xl font-bold text-white mb-2">You're in.</h4>
                  <p className="text-white/50 text-sm">Welcome to the One Whole Future community.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 px-5 py-4 focus-within:border-secondary/50 focus-within:bg-white/8 transition-all">
                    <span className="material-symbols-outlined text-white/30 flex-shrink-0">mail</span>
                    <input
                      className="flex-1 bg-transparent text-white font-body text-base outline-none placeholder:text-white/30"
                      placeholder="Your email address"
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value);
                        setError('');
                      }}
                    />
                  </div>
                  <button
                    disabled={submitting}
                    onClick={handleNewsletterSubmit}
                    className="w-full bg-secondary text-white py-4 rounded-2xl font-headline font-black uppercase tracking-widest text-xs hover:bg-secondary/90 active:scale-[0.98] transition-all shadow-lg shadow-secondary/20 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <><span className="material-symbols-outlined text-lg animate-spin">autorenew</span> Subscribing...</>
                    ) : (
                      <><span className="material-symbols-outlined text-lg">send</span> Subscribe — It's Free</>
                    )}
                  </button>
                  {error && <p className="text-rose-400 text-xs mt-1 ml-1 font-bold">{error}</p>}
                </div>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default HomePage;
