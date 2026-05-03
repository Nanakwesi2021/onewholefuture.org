import React, { useState, useEffect } from 'react';

const DEIPage = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-surface min-h-screen pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-8">
        <header className={`mb-24 max-w-4xl transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <span className="text-secondary font-bold tracking-[0.25em] uppercase text-[0.65rem] mb-6 block">Our Commitment</span>
          <h1 className="text-[3.5rem] lg:text-[5.5rem] font-extrabold text-primary font-headline mb-8 tracking-tighter leading-[1] max-w-3xl">
            Diversity is our <br />
            <span className="italic font-light">Fundamental core.</span>
          </h1>
          <p className="text-xl text-on-surface-variant max-w-3xl leading-relaxed font-light">
            We believe that to truly represent onewholefuture, our foundation must reflect the vast diversity of the human experience.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-24 mb-32 items-center">
          <div className={`space-y-8 transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <h2 className="text-4xl font-extrabold text-primary font-headline tracking-tight">Why it matters</h2>
            <p className="text-lg text-on-surface-variant leading-relaxed font-light">
              Our mission is to preserve the stories of all people, especially those whose voices have been historically marginalized. This requires an internal culture of radical inclusion and a commitment to equitable practices in everything we do—from hiring to grant-making.
            </p>
            <div className="grid grid-cols-2 gap-12 pt-8 border-t border-outline-variant/30">
              <div>
                <div className="text-5xl font-extrabold text-secondary font-headline mb-2 tracking-tighter">60%</div>
                <p className="text-[0.65rem] text-on-surface-variant uppercase font-bold tracking-[0.15em] opacity-60">Regional Leadership</p>
              </div>
              <div>
                <div className="text-5xl font-extrabold text-secondary font-headline mb-2 tracking-tighter">16</div>
                <p className="text-[0.65rem] text-on-surface-variant uppercase font-bold tracking-[0.15em] opacity-60">Regions Represented</p>
              </div>
            </div>
          </div>
          
          <div className={`rounded-[3rem] overflow-hidden shadow-2xl h-[500px] transition-all duration-1000 delay-400 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <img
              src="https://images.unsplash.com/photo-1540575861501-7cf05a4b175a?auto=format&fit=crop&q=85&w=1200"
              alt="Ghanaian community members in a collaborative meeting"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
            />
          </div>
        </div>

        <section className={`bg-primary rounded-[4rem] p-12 lg:p-24 text-on-primary overflow-hidden relative transition-all duration-1000 delay-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_70%)]" />
          
          <h2 className="font-headline text-4xl lg:text-5xl font-extrabold mb-16 tracking-tight relative z-10">Our Pillars of Equity</h2>
          
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {[
              { title: "Inclusive Storytelling", desc: "Ensuring our archival technology is accessible and culturally sensitive across all dialects." },
              { title: "Equitable Access", desc: "Lowering barriers to entry for our programs and grants worldwide through decentralized systems." },
              { title: "Global Representation", desc: "Actively seeking perspectives from underserved communities in all decision-making layers." }
            ].map((pillar, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all group">
                <h3 className="text-2xl font-bold mb-4 font-headline text-secondary group-hover:text-white transition-colors">{pillar.title}</h3>
                <p className="text-on-primary/70 leading-relaxed font-light text-sm">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DEIPage;
