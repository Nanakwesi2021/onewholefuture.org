import React, { useState, useEffect } from 'react';

const CareersPage = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const jobs = [
    {
      title: "Senior Program Manager",
      location: "Accra, Ghana",
      type: "Full-time",
      department: "Operations",
      posted: "2 days ago"
    },
    {
      title: "Digital Archivist",
      location: "Kumasi, Ghana",
      type: "Contract",
      department: "Technology",
      posted: "1 week ago"
    },
    {
      title: "Communications Lead",
      location: "Tamale, Ghana",
      type: "Full-time",
      department: "Marketing",
      posted: "3 days ago"
    },
    {
      title: "Field Operations Specialist",
      location: "Takoradi, Ghana",
      type: "Full-time",
      department: "Field Work",
      posted: "5 days ago"
    }
  ];

  return (
    <div className="bg-surface min-h-screen pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Cinematic Header */}
        <div className={`relative bg-primary rounded-[3.5rem] mb-24 overflow-hidden group transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1599940824399-b87987cb5733?auto=format&fit=crop&q=85&w=1600" 
              alt="Professional team in Ghana"
              className="w-full h-full object-cover opacity-20 grayscale transition-transform duration-1000 scale-105 group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent"></div>
          </div>
          
          <div className="relative z-10 p-12 lg:p-24 max-w-4xl">
            <span className="uppercase tracking-[0.3em] text-[0.65rem] font-bold text-secondary mb-6 block">Join the Mission</span>
            <h1 className="text-[3.5rem] lg:text-[5.5rem] font-extrabold text-white font-headline mb-8 tracking-tighter leading-[1]">
              Work With <br />
              <span className="italic font-light text-secondary">Purpose.</span>
            </h1>
            <p className="text-xl text-on-primary/70 max-w-2xl font-light leading-relaxed">
              Join a community of innovators, storytellers, and change-makers in Ghana. 
              Together, we're building the infrastructure for a more equitable future.
            </p>
          </div>
        </div>

        <section className={`transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-outline-variant/30 pb-12">
            <div>
              <h2 className="text-[2.5rem] font-extrabold text-primary font-headline tracking-tighter">Open Opportunities</h2>
              <p className="text-on-surface-variant font-light mt-2">Find your place in our growing collective.</p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-2.5 bg-surface-container-low rounded-full border border-outline-variant/50 text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant hover:border-primary transition-all">All Departments</button>
              <button className="px-6 py-2.5 bg-surface-container-low rounded-full border border-outline-variant/50 text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant hover:border-primary transition-all">Remote Available</button>
            </div>
          </div>

          <div className="space-y-6">
            {jobs.map((job, idx) => (
              <div 
                key={idx}
                className="bg-white p-10 rounded-[2.5rem] border border-outline-variant/30 flex flex-col lg:flex-row lg:items-center justify-between group hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-widest rounded-full">
                      {job.department}
                    </span>
                    <span className="text-on-surface-variant/40 text-[10px] font-bold uppercase tracking-widest">{job.type}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-primary font-headline tracking-tight group-hover:text-secondary transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-2 text-on-surface-variant font-light text-sm">
                    <span className="material-symbols-outlined text-lg opacity-40">location_on</span>
                    {job.location}
                  </div>
                </div>
                
                <div className="mt-8 lg:mt-0 flex items-center gap-8 border-t lg:border-t-0 pt-8 lg:pt-0 border-outline-variant/10">
                  <span className="hidden xl:block text-[10px] font-bold text-on-surface-variant/30 uppercase tracking-widest">Posted {job.posted}</span>
                  <button className="bg-primary text-on-primary px-10 py-5 rounded-2xl font-bold text-sm hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center gap-3">
                    Apply for Role
                    <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">east</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 bg-surface-container-low rounded-[3.5rem] p-12 lg:p-20 text-center border border-outline-variant/20">
            <h3 className="font-headline text-3xl font-extrabold text-on-surface mb-6 tracking-tight">No match found?</h3>
            <p className="font-body text-on-surface-variant max-w-xl mx-auto mb-10 leading-relaxed">
              We are always looking for exceptional talent to join our radical missions. 
              Send your CV and a brief introduction to our talent desk.
            </p>
            <button className="text-primary font-extrabold text-sm uppercase tracking-[0.2em] border-b-2 border-primary/20 hover:border-primary transition-all pb-2">
              talent@onewholefuture.org
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CareersPage;
