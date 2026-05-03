import React from 'react';

const IdeasPage = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const featured = {
    title: "The Architecture of Intangible Heritage",
    author: "Dr. Ama Mensah",
    date: "June 14, 2024",
    category: "CULTURAL PRESERVATION",
    excerpt: "How we use decentralized ledgers to archive oral traditions across the Volta region without compromising local sovereignty. A study into the digital preservation of the Ewe and Ashanti oral histories.",
    img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1600&q=90&auto=format&fit=crop"
  };

  const insights = [
    {
      title: "Decentralized Health Records in rural Northern Ghana",
      author: "Kofi Owusu",
      date: "May 22, 2024",
      category: "HEALTH TECH",
      excerpt: "A case study on the impact of patient-owned data in maternal health outcomes across the Savannah Region."
    },
    {
      title: "The Ethics of Digital Archiving in West Africa",
      author: "Sarah J. Abena",
      date: "April 15, 2024",
      category: "ETHICS",
      excerpt: "Navigating consent and community ownership in the age of global data repositories and African data sovereignty."
    },
    {
      title: "Sovereign AI for Ghanaian Governance",
      author: "Kwame Mensah",
      date: "March 30, 2024",
      category: "GOVERNANCE",
      excerpt: "Why localized LLMs trained on local dialects like Twi and Ga are critical for protecting linguistic diversity in policy making."
    }
  ];

  return (
    <div className="bg-surface min-h-screen pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Header */}
        <header className="mb-20 max-w-3xl">
          <span className="font-label text-sm uppercase tracking-[0.25em] text-tertiary mb-6 block font-bold">
            Ideas & Insights
          </span>
          <h1 className="font-headline text-5xl lg:text-7xl font-extrabold text-primary tracking-tighter leading-[1.05] mb-8">
            The Knowledge <br />
            <span className="text-secondary">Collective.</span>
          </h1>
          <p className="font-body text-xl text-on-surface-variant leading-relaxed">
            Exploring the intersection of technology, humanity, and social impact through rigorous research and field-tested insights.
          </p>
        </header>

        {/* Featured Article */}
        <section 
          className="mb-32 group cursor-pointer scroll-mt-24" 
          id="economic"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', transition: 'all 1s ease 0.2s' }}
        >
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 overflow-hidden rounded-3xl">
              <img src={featured.img} alt={featured.title} className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-1000" />
            </div>
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-widest text-secondary mb-6 block">{featured.category}</span>
              <h2 className="font-headline text-4xl lg:text-5xl font-extrabold text-on-surface mb-6 leading-tight group-hover:text-primary transition-colors">{featured.title}</h2>
              <p className="font-body text-lg text-on-surface-variant mb-8 leading-relaxed">{featured.excerpt}</p>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-stone-200 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1531123897727-8f129e16fd3c?w=100&h=100&q=80&auto=format&fit=crop&crop=face" alt={featured.author} />
                </div>
                <div>
                  <p className="font-bold text-on-surface">{featured.author}</p>
                  <p className="text-sm text-on-surface-variant">{featured.date}</p>
                </div>
              </div>
              <button className="flex items-center gap-2 font-bold text-primary hover:gap-4 transition-all">
                Read Full Feature <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>

        {/* Insights Grid */}
        <section 
          className="grid md:grid-cols-3 gap-12 mb-32 scroll-mt-24" 
          id="maternal"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', transition: 'all 1s ease 0.4s' }}
        >
          {insights.map((item, i) => (
            <article key={i} className="group cursor-pointer">
              <div className="h-[1px] w-full bg-outline-variant/30 mb-8 group-hover:bg-primary transition-colors"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-4 block">{item.category}</span>
              <h3 className="font-headline text-2xl font-bold text-on-surface mb-4 group-hover:text-primary transition-colors leading-tight">{item.title}</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-6 line-clamp-3">{item.excerpt}</p>
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-on-surface-variant">{item.author}</p>
                <span className="material-symbols-outlined text-primary text-sm group-hover:translate-x-2 transition-transform">east</span>
              </div>
            </article>
          ))}
        </section>

        {/* Research Papers Section */}
        <section 
          className="bg-primary rounded-[3rem] p-12 lg:p-20 text-on-primary overflow-hidden relative"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', transition: 'all 1s ease 0.6s' }}
        >
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_70%)] pointer-events-none" />
          
          <div className="max-w-4xl relative z-10">
            <h2 className="font-headline text-4xl font-extrabold mb-8">Research Library</h2>
            <p className="font-body text-lg text-on-primary/70 mb-12 max-w-2xl leading-relaxed">
              Our open-source archive of peer-reviewed papers, policy briefs, and field reports. We believe in the radical sharing of knowledge.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                "2024 West Africa Digital Sovereignty Report",
                "Decentralized ID in Ghana's Emerging Markets",
                "Ghana Intangible Heritage Archive Protocol",
                "Community Health Data Ethics: A Regional Perspective"
              ].map(paper => (
                <div key={paper} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/20 transition-all flex items-center justify-between group cursor-pointer">
                  <span className="font-bold text-sm tracking-tight">{paper}</span>
                  <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">download</span>
                </div>
              ))}
            </div>

            <button className="mt-12 bg-secondary text-on-secondary px-10 py-4 rounded-full font-bold text-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              Explore All Papers
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};


export default IdeasPage;

