import React from 'react';
import { Link } from 'react-router-dom';

const HERO_BG = '/image/julianna-corbett-R3IYAFLDX0I-unsplash (1).jpg'; // Community youth
const MISSION_IMG = '/image/damian-patkowski-T-LfvX-7IVg-unsplash.jpg'; // Collaborative engagement
const ORIGIN_IMG = '/image/kojo-nana-GtnFtsPXKME-unsplash.jpg'; // Representative local scene

const AboutUsPage = () => {

  const beliefs = [
    {
      id: "01",
      title: "Leaders of Today",
      text: "Young people are not the leaders of tomorrow. They are the leaders of today. The Foundation refuses to ask Ghana's youth to wait their turn."
    },
    {
      id: "02",
      title: "Community-Led",
      text: "Community-based action delivers faster, more sustainable impact than top-down intervention. Solutions designed by communities take root deeply."
    },
    {
      id: "03",
      title: "Equal Opportunity",
      text: "Every young Ghanaian deserves a platform, a mentor, and a community that believes in their potential. We are here to bridge the gap."
    }
  ];

  const pillars = [
    { id: "01", name: "Identify", desc: "Changemakers map a real community need, grounded in lived experience — not assumption." },
    { id: "02", name: "Design", desc: "Participants co-create practical, resource-conscious solutions with and for their communities." },
    { id: "03", name: "Execute", desc: "With Foundation support and peer accountability, Changemakers implement within a defined timeline." },
    { id: "04", name: "Report", desc: "Every project is documented, evaluated, and shared, building a public record of youth-led impact." },
    { id: "05", name: "Scale", desc: "Proven projects receive mentorship and resource connections to grow their impact further." }
  ];

  const sdgs = [
    { code: "SDG 1", name: "No Poverty" },
    { code: "SDG 2", name: "Zero Hunger" },
    { code: "SDG 3", name: "Good Health" },
    { code: "SDG 4", name: "Quality Education" },
    { code: "SDG 5", name: "Gender Equality" },
    { code: "SDG 8", name: "Decent Work" },
    { code: "SDG 10", name: "Reduced Inequalities" },
    { code: "SDG 11", name: "Sustainable Communities" },
    { code: "SDG 17", name: "Partnerships" }
  ];

  return (
    <div className="bg-surface">
      {/* HERO SECTION */}
      <header className="relative min-h-[90vh] flex items-center overflow-hidden -mt-20">
        <div className="absolute inset-0 z-0">
          <img src={HERO_BG} alt="Ghanaian youth" className="w-full h-full object-cover hero-img-ken-burns scale-110" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full pt-32">
          <div className="max-w-3xl">
            <h1 className="font-headline text-[4rem] lg:text-[6.5rem] leading-[0.9] font-extrabold text-white tracking-tighter mb-8 animate-fadeSlideUp">
              Building the <br />
              <span className="text-secondary">structures</span> that <br />
              Young leaders deserve.
            </h1>
            <p className="font-body text-xl lg:text-2xl text-on-primary/80 leading-relaxed max-w-2xl">
              One Whole Future Foundation is a Ghanaian youth impact organization on a mission to identify, equip, and deploy the next generation of community changemakers.
            </p>
          </div>
        </div>
      </header>

      {/* CONVICTION SECTION */}
      <section className="py-32 px-8 bg-surface-container-lowest">
        <div className="max-w-5xl mx-auto text-center">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-primary font-bold mb-8 block">Our Conviction</span>
          <h2 className="font-headline text-3xl lg:text-5xl font-bold text-primary tracking-tight leading-tight mb-12">
            "The change we are waiting for is already inside us."
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-[1px] bg-outline-variant" />
            <p className="font-body text-lg text-on-surface">
              <strong>Akosua Asaa Manu</strong>, Founder | One Whole Future Foundation
            </p>
            <div className="w-12 h-[1px] bg-outline-variant" />
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-40 px-8 bg-white relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-surface-container-lowest/50 -skew-x-12 translate-x-1/4 z-0" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
          <div className="animate-fadeSlideUp">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[2px] w-12 bg-secondary" />
              <span className="font-label text-xs uppercase tracking-[0.4em] text-secondary font-black">Our Mission</span>
            </div>
            <h2 className="font-headline text-5xl lg:text-7xl font-extrabold text-primary tracking-tighter mb-10 leading-[0.95]">
              Mobilizing Ghana's <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">youth agents</span> <br />
              of change.
            </h2>
            <div className="space-y-8 font-body text-xl text-on-surface-variant leading-relaxed max-w-xl">
              <p className="opacity-90">
                We don't just train for existing roles. We build the <span className="text-primary font-bold">infrastructure</span> for a new generation of leaders to thrive.
              </p>
              <div className="p-8 bg-surface-container-low rounded-2xl border-l-4 border-tertiary">
                <p className="text-sm italic text-on-surface/70">
                  "Our work treats the United Nations SDGs not as a reporting requirement, but as a design brief for the future of Ghana."
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Main Image Container */}
            <div className="relative z-10 aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.15)] group">
              <img src={MISSION_IMG} alt="Community solution" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-60" />
            </div>

            {/* Floating Vision Card */}
            <div className="absolute -bottom-12 -right-6 md:-right-12 z-20 bg-primary text-white p-10 md:p-14 rounded-[2rem] shadow-2xl max-w-sm transform hover:-translate-y-2 transition-transform duration-500">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-secondary text-3xl">visibility</span>
                <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary-fixed font-bold">Our Vision</span>
              </div>
              <p className="font-headline text-2xl md:text-3xl font-bold leading-tight tracking-tight">
                A Ghana where every youth has the <span className="text-secondary">platform</span> to lead.
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -left-10 w-32 h-32 border-2 border-secondary/20 rounded-full animate-pulse" />
            <div className="absolute top-1/2 -left-20 w-40 h-1 bg-gradient-to-r from-tertiary/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* BELIEFS SECTION */}
      <section className="py-32 px-8 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center lg:text-left">
            <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-bold mb-6 block">What We Believe</span>
            <h2 className="font-headline text-4xl lg:text-5xl font-extrabold text-white tracking-tighter">
              Beliefs that shape everything we build.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {beliefs.map((belief) => (
              <div key={belief.id} className="p-10 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group">
                <span className="text-6xl font-headline font-black text-secondary/30 mb-8 block group-hover:text-secondary/50 transition-colors">{belief.id}</span>
                <h3 className="text-2xl font-headline font-bold text-white mb-4">{belief.title}</h3>
                <p className="font-body text-on-primary/70 leading-relaxed">{belief.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE FIVE PILLARS */}
      <section className="py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <span className="font-label text-xs uppercase tracking-[0.3em] text-primary font-bold mb-6 block">Our Work</span>
              <h2 className="font-headline text-[3.5rem] lg:text-[5rem] font-extrabold text-primary leading-[0.95] tracking-tighter mb-8">
                Five pillars. <br />
                One movement.
              </h2>
              <p className="font-body text-xl text-on-surface-variant max-w-md">
                The Changemakers Challenge is built on a five-pillar model that takes young people from idea to real-world impact.
              </p>
            </div>
            <div className="lg:col-span-7 space-y-12">
              {pillars.map((pillar) => (
                <div key={pillar.id} className="flex gap-8 group">
                  <div className="shrink-0 w-16 h-16 rounded-full border border-primary flex items-center justify-center font-headline font-bold text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    {pillar.id}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-3xl font-headline font-bold text-primary mb-4">{pillar.name}</h3>
                    <p className="font-body text-lg text-on-surface-variant leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* FOUNDATION FACT SHEET */}
      <section id="fact-sheet" className="py-32 px-8 bg-surface-container-lowest border-y border-outline-variant/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
            <div className="max-w-2xl">
              <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-bold mb-6 block">Transparency & Metrics</span>
              <h2 className="font-headline text-5xl lg:text-7xl font-extrabold text-primary leading-[0.9] tracking-tighter">
                Foundation <br />
                Fact Sheet.
              </h2>
            </div>
            <p className="font-body text-xl text-on-surface-variant max-w-sm pb-2">
              A real-time overview of our operational reach and verified impact across Ghana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
            {[
              { label: "Active Districts", value: "12", trend: "+3 this year" },
              { label: "Youth Impacted", value: "25k+", trend: "Direct & Indirect" },
              { label: "Verified Projects", value: "140", trend: "SDG Aligned" },
              { label: "Partner Network", value: "50+", trend: "Local & Global" }
            ].map((stat, idx) => (
              <div key={idx} className="p-12 bg-white border border-outline-variant/10 hover:shadow-xl hover:shadow-primary/5 transition-all group">
                <span className="font-label text-[0.6rem] uppercase tracking-[0.2em] text-outline-variant font-bold mb-4 block group-hover:text-secondary transition-colors">
                  {stat.label}
                </span>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl lg:text-6xl font-headline font-black text-primary tracking-tighter">
                    {stat.value}
                  </span>
                  <span className="material-symbols-outlined text-secondary text-2xl group-hover:translate-x-2 transition-transform">
                    trending_flat
                  </span>
                </div>
                <p className="font-body text-sm text-on-surface-variant/60 font-medium">
                  {stat.trend}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20 p-12 bg-primary rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-2">
              <h3 className="text-white font-headline text-3xl font-bold mb-4">Download Full Report</h3>
              <p className="text-on-primary/70 font-body text-lg">
                For a deep dive into our financials, audit reports, and detailed impact methodologies.
              </p>
            </div>
            <button className="bg-secondary text-white px-8 py-5 rounded-xl font-headline font-bold text-sm uppercase tracking-widest hover:bg-secondary/90 transition-all flex items-center justify-center gap-3">
              Download KPI Report
              <span className="material-symbols-outlined">download</span>
            </button>
          </div>
        </div>
      </section>

      {/* SDG GRID */}
      <section className="py-32 px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="font-label text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4 block">Global Commitment</span>
            <h2 className="font-headline text-4xl lg:text-5xl font-extrabold text-primary tracking-tighter mb-6">
              Advancing the Global Goals.
            </h2>
            <p className="font-body text-lg text-on-surface-variant max-w-2xl mx-auto">
              We treat the United Nations Sustainable Development Goals as a design brief. Every project advances a global agenda.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {sdgs.map((sdg, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <span className="font-label text-[0.65rem] font-bold text-secondary uppercase tracking-widest mb-3">{sdg.code}</span>
                <span className="font-headline font-bold text-primary text-sm leading-tight">{sdg.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORIGIN STORY */}
      <section className="py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <img src={ORIGIN_IMG} alt="Akosua Asaa Manu" className="rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000" />
            </div>
            <div className="order-1 lg:order-2">
              <span className="font-label text-xs uppercase tracking-[0.3em] text-primary font-bold mb-6 block">Our Origin</span>
              <h2 className="font-headline text-4xl lg:text-5xl font-extrabold text-primary tracking-tighter mb-8 leading-tight">
                Founded on a conviction about where change really begins.
              </h2>
              <p className="font-body text-lg text-on-surface-variant leading-relaxed mb-8">
                Communications professional and entrepreneur Akosua Asaa Manu founded One Whole Future Foundation on the belief that lasting national transformation begins in communities powered by the people closest to the problem.
              </p>
              <div className="flex gap-12">
                <div>
                  <span className="block font-headline text-3xl font-bold text-primary">Accra</span>
                  <span className="font-label text-xs text-outline uppercase tracking-widest">Base</span>
                </div>
                <div>
                  <span className="block font-headline text-3xl font-bold text-primary">2026</span>
                  <span className="font-label text-xs text-outline uppercase tracking-widest">Est.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER CTA */}
      <section className="py-32 px-8 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-headline text-5xl lg:text-6xl font-extrabold text-primary tracking-tighter mb-8">
            Partner With Us.
          </h2>
          <p className="font-body text-xl text-primary/80 leading-relaxed mb-12">
            When you partner with us, you become a co-creator of documented, SDG-aligned, youth-led change. Your investment is reportable. Your impact is visible. Your legacy is permanent.
          </p>
          <Link to="/contact" className="inline-block bg-primary text-white px-12 py-5 rounded-full font-headline font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/30 border-2 border-white ring-4 ring-primary/20">
            Start a Partnership
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
