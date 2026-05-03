import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const VolunteersPage = () => {
  const [visible, setVisible] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const roles = [
    {
      title: "Community Outreach",
      desc: "Work directly with local leaders to identify needs and distribute resources across Ghana.",
      icon: "groups"
    },
    {
      title: "Digital Archiving",
      desc: "Help preserve endangered knowledge by assisting in the digitization of oral histories and artifacts.",
      icon: "database"
    },
    {
      title: "Youth Mentorship",
      desc: "Guide the next generation of leaders through our technical skills and leadership programs.",
      icon: "school"
    },
    {
      title: "Event Coordination",
      desc: "Organize local summits, workshops, and community forums that drive radical progress.",
      icon: "event"
    }
  ];

  return (
    <div className="bg-surface min-h-screen">
      {/* Cinematic Hero */}
      <header className="relative h-[80vh] flex items-center overflow-hidden bg-surface">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/volunteers.jpg"
            className="w-full h-full object-cover"
            alt="Volunteers in action"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface/80 via-surface/30 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full pt-20">
          <span className="uppercase tracking-[0.3em] text-[0.75rem] font-bold text-primary mb-4 block animate-fadeSlideUp">Join the Movement</span>
          <h1 className="font-headline text-[3.5rem] lg:text-[6.5rem] leading-[0.95] font-extrabold tracking-tighter text-primary mb-8 animate-fadeSlideUp">
            The Power of <br />
            <span className="italic font-light text-secondary">Collective Action.</span>
          </h1>
          <p className="text-xl text-on-surface max-w-xl font-medium leading-relaxed animate-fadeSlideUp delay-100">
            One Whole Future is built on the passion and dedication of volunteers. Join us in building a more equitable and sovereign future for all.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 -mt-20 relative z-20 pb-32">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Form Section */}
          <div className="lg:col-span-7">
            <div className={`bg-white p-12 lg:p-16 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-outline-variant/30 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              {!formSubmitted ? (
                <>
                  <h2 className="font-headline text-3xl font-extrabold text-on-surface mb-12 tracking-tight">Volunteer Application</h2>
                  <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }}>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant opacity-60 ml-4">Full Name</label>
                        <input type="text" required className="w-full px-6 py-4 bg-surface-container-low rounded-2xl border border-outline-variant/30 focus:border-primary outline-none transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant opacity-60 ml-4">Email Address</label>
                        <input type="email" required className="w-full px-6 py-4 bg-surface-container-low rounded-2xl border border-outline-variant/30 focus:border-primary outline-none transition-all" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant opacity-60 ml-4">Primary Interest</label>
                      <select className="w-full px-6 py-4 bg-surface-container-low rounded-2xl border border-outline-variant/30 focus:border-primary outline-none transition-all appearance-none">
                        <option>Community Outreach</option>
                        <option>Digital Archiving</option>
                        <option>Youth Mentorship</option>
                        <option>Event Coordination</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant opacity-60 ml-4">Why do you want to join us?</label>
                      <textarea rows="4" className="w-full px-6 py-4 bg-surface-container-low rounded-2xl border border-outline-variant/30 focus:border-primary outline-none transition-all resize-none"></textarea>
                    </div>

                    <button type="submit" className="w-full bg-primary text-white font-headline font-bold py-6 rounded-2xl hover:shadow-xl hover:shadow-primary/20 transition-all">
                      Submit Application
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-20">
                  <span className="material-symbols-outlined text-secondary text-7xl mb-6">check_circle</span>
                  <h2 className="font-headline text-3xl font-bold text-on-surface mb-4">Application Received</h2>
                  <p className="text-on-surface-variant max-w-sm mx-auto">Thank you for your interest. Our team will review your application and get back to you within 3-5 business days.</p>
                  <button onClick={() => setFormSubmitted(false)} className="mt-8 text-primary font-bold hover:underline">Submit another application</button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar / Roles */}
          <div className="lg:col-span-5 space-y-8">
            <div className={`bg-secondary/10 p-10 rounded-[2.5rem] border border-secondary/20 transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              <h3 className="font-headline text-2xl font-bold text-secondary mb-8">Ways to Help</h3>
              <div className="space-y-8">
                {roles.map((role, i) => (
                  <div key={i} className="flex gap-6">
                    <span className="material-symbols-outlined text-secondary bg-white p-3 rounded-xl shadow-sm h-fit">{role.icon}</span>
                    <div>
                      <h4 className="font-bold text-on-surface mb-2">{role.title}</h4>
                      <p className="text-sm text-on-surface-variant leading-relaxed">{role.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`relative overflow-hidden rounded-[2.5rem] h-80 transition-all duration-1000 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              <img src="/images/volunteers2.jpg" className="w-full h-full object-cover" alt="Volunteer community" />
              <div className="absolute inset-0 bg-primary/20" />
            </div>
          </div>
        </div>
      </main>

      {/* Global Impact Vision */}
      <section className="bg-surface-container py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="font-headline text-[3rem] lg:text-[4.5rem] font-extrabold text-primary mb-12 tracking-tighter leading-tight">
                Our vision is a <br />
                <span className="italic font-light">smarter, more equitable future.</span>
              </h2>
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <p className="text-4xl font-headline font-extrabold text-secondary tracking-tighter">850+</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Active Volunteers</p>
                </div>
                <div>
                  <p className="text-4xl font-headline font-extrabold text-secondary tracking-tighter">15+</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant opacity-60">Global Hubs</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-outline-variant/10">
              <p className="text-xl text-on-surface-variant leading-relaxed italic font-light mb-8">
                "Volunteering with One Whole Future has been the most fulfilling experience of my professional life. Seeing the direct impact of our digital archives on local education is incredibly rewarding."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">AK</div>
                <div>
                  <p className="font-bold text-on-surface">Ama Koranteng</p>
                  <p className="text-sm text-on-surface-variant">Senior Archivist Volunteer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VolunteersPage;
