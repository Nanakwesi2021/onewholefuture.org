import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const HERO_IMAGES = [
  "/image/kojo-nana-GtnFtsPXKME-unsplash.jpg", // Accra Skyline / Street
  "/image/young-millennials-african-friends-outdoor-gym-happy-black-people-having-fun-together-generation-z-friendship-concept.jpg", // Youth Empowerment
  "/image/moses-janga-oKipTpccpQE-unsplash.jpg"  // Cultural / Landscape
];

const PILLAR_IMAGES = {
  education: "/image/medical-assistant-student-reading-green-lamp-library.jpg",
  healthcare: "/image/jeffrey-ofori-tOshpNl-sW4-unsplash.jpg",
  empowerment: "/image/peaceful-businessman-vr-headset-enjoying-virtual-video.jpg"
};

const HomePage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

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
    } catch (error) {
      console.error("Error subscribing:", error);
      setError("Connectivity issue. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-surface">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {HERO_IMAGES.map((img, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${idx === activeSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent z-10" />
            <img src={img} alt="Hero" className="w-full h-full object-cover scale-105" />
          </div>
        ))}
        
        <div className={`relative z-20 h-full flex flex-col items-start justify-center text-left px-6 md:px-24 max-w-[1440px] mx-auto transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="font-headline text-5xl sm:text-6xl md:text-[7.5rem] font-black tracking-tighter mb-6 leading-[0.85] uppercase">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-accent to-tertiary drop-shadow-2xl">
              ONE WHOLE<br/>FUTURE
            </span>
          </h1>
          <p className="font-body text-lg md:text-2xl text-white/90 max-w-xl leading-relaxed mb-10">
            Pioneering digital preservation and ethical innovation across the continent.
          </p>
          <div className="flex flex-wrap gap-4 w-full sm:w-auto">
            <Link to="/about" className="flex-1 sm:flex-none text-center bg-secondary text-white px-8 md:px-10 py-4 rounded-full font-headline text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-secondary/90 hover:scale-105 transition-all shadow-lg shadow-secondary/20">
              Explore Our Mission
            </Link>
            <Link to="/our-work" className="flex-1 sm:flex-none text-center bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 md:px-10 py-4 rounded-full font-headline text-xs md:text-sm font-bold uppercase tracking-widest hover:bg-white/20 transition-all">
              Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Our Work / Pillars Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-headline text-4xl md:text-6xl font-black text-primary mb-6 tracking-tighter">
              OUR <span className="text-secondary">WORK</span>
            </h2>
            <p className="font-body text-lg md:text-xl text-on-surface-variant leading-relaxed">
              We are dedicated to supporting impactful initiatives that drive human progress and 
              preserve our shared history through technology and community action.
            </p>
          </div>
          <Link to="/our-work" className="group flex items-center gap-3 text-secondary font-headline font-bold uppercase tracking-widest text-xs md:text-sm hover:translate-x-2 transition-transform">
            View All Projects <span className="material-symbols-outlined">trending_flat</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {[
            { 
              title: 'Strategic Grants', 
              desc: 'Direct funding to organizations pioneering ethical AI and digital preservation.', 
              img: PILLAR_IMAGES.education,
              icon: 'payments' 
            },
            { 
              title: 'Technical Research', 
              desc: 'Collaborative deep-dives into the intersection of technology and human rights.', 
              img: PILLAR_IMAGES.healthcare,
              icon: 'biotech' 
            },
            { 
              title: 'Community Hubs', 
              desc: 'Building physical and digital spaces for local innovators to thrive.', 
              img: PILLAR_IMAGES.empowerment,
              icon: 'hub' 
            }
          ].map((item, idx) => (
            <div key={idx} className="group relative bg-surface-container-low rounded-[2rem] overflow-hidden border border-outline-variant/10 hover:shadow-2xl transition-all duration-500">
              <div className="relative h-60 md:h-72 overflow-hidden">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
                  <span className="material-symbols-outlined text-white">{item.icon}</span>
                </div>
              </div>
              <div className="p-8 md:p-10">
                <h3 className="font-headline text-xl md:text-2xl font-extrabold text-primary mb-4">{item.title}</h3>
                <p className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed mb-6">
                  {item.desc}
                </p>
                <div className="w-12 h-1 bg-tertiary rounded-full group-hover:w-full transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section - Redesigned Banner */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 mb-24 md:mb-40">
        <div className="bg-primary rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-24 relative overflow-hidden shadow-2xl">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] -mr-64 -mt-64" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-tertiary/10 rounded-full blur-[80px] -ml-32 -mb-32" />
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-12 md:gap-16 items-center">
            <div className="lg:w-3/5 text-center lg:text-left">
              <span className="inline-block bg-tertiary/20 text-tertiary px-6 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest mb-6 md:mb-8 border border-tertiary/30">
                Newsletter
              </span>
              <h2 className="font-headline text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 md:mb-8 tracking-tighter leading-none">
                JOIN THE <span className="text-tertiary italic">MISSION.</span>
              </h2>
              <p className="font-body text-lg md:text-xl text-white/70 max-w-xl leading-relaxed mx-auto lg:mx-0">
                Weekly insights into technical progress, ethical innovation, and community 
                stories from across the continent.
              </p>
            </div>

            <div className="lg:w-2/5 w-full">
              {subscribed ? (
                <div className="bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] border border-white/10 text-center animate-fadeSlideUp">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-secondary/20">
                    <span className="material-symbols-outlined text-white text-3xl md:text-4xl">check</span>
                  </div>
                  <h3 className="font-headline text-2xl md:text-3xl font-bold text-white mb-2">You're In.</h3>
                  <p className="text-white/60 text-sm">Welcome to the inner circle of impact.</p>
                </div>
              ) : (
                <div className="bg-white p-2 rounded-3xl md:rounded-[2rem] shadow-2xl flex flex-col sm:flex-row items-stretch">
                  <div className="flex-grow flex items-center px-6 py-4">
                    <span className="material-symbols-outlined text-outline-variant mr-3">mail</span>
                    <input
                      className="w-full bg-transparent text-primary font-body text-sm md:text-base outline-none placeholder:text-outline-variant"
                      placeholder="Enter your email"
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
                    className="bg-primary text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl md:rounded-[1.8rem] font-headline font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-secondary transition-colors shadow-lg disabled:opacity-50"
                  >
                    {submitting ? '...' : 'Subscribe'}
                  </button>
                </div>
              )}
              {error && <p className="text-rose-400 text-[10px] md:text-xs mt-4 ml-4 font-bold animate-pulse">{error}</p>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
