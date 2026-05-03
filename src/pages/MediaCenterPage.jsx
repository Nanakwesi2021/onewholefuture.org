import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const MediaCenterPage = () => {
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    objective: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const ASSETS = [
    {
      id: 1,
      title: "Archiving Oral Traditions in the Volta Region",
      category: "image",
      type: "FIELD PHOTOGRAPHY",
      url: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&q=80",
      description: "Our team capturing oral histories using decentralized digital recorders in local communities."
    },
    {
      id: 2,
      title: "The Future of Digital Sovereignty",
      category: "video",
      type: "DOCUMENTARY",
      url: "https://images.unsplash.com/photo-1540575861501-7cf05a4b175a?w=1200&q=80",
      description: "A short film exploring how local governance is being transformed by open-source tools."
    },
    {
      id: 3,
      title: "Maternal Health Tech in Northern Ghana",
      category: "image",
      type: "IMPACT STUDY",
      url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80",
      description: "Documenting the implementation of decentralized health records in rural clinics."
    },
    {
      id: 4,
      title: "Preserving the Asante Kente Tradition",
      category: "image",
      type: "CULTURAL ARCHIVE",
      url: "https://images.unsplash.com/photo-1599940824399-b87987cb5733?w=1200&q=80",
      description: "High-resolution archival photography of traditional weaving patterns and techniques."
    },
    {
      id: 5,
      title: "Knowledge Collective: Annual Symposium",
      category: "image",
      type: "COMMUNITY",
      url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80",
      description: "Highlights from our annual gathering of thinkers, builders, and community leaders."
    },
    {
      id: 6,
      title: "Digital Infrastructure Expansion",
      category: "video",
      type: "TECHNICAL",
      url: "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=1200&q=80",
      description: "A visual update on our progress in deploying community-owned mesh networks."
    }
  ];

  const filteredAssets = ASSETS.filter(asset => {
    const matchesFilter = filter === 'all' || asset.category === filter;
    const matchesSearch = asset.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         asset.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.organization || !formData.objective) {
      setError('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await addDoc(collection(db, 'media_requests'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
      setFormData({ fullName: '', organization: '', objective: '' });
      setTimeout(() => setSubmitted(false), 8000);
    } catch (error) {
      console.error("Error submitting media request:", error);
      setError("Transmission error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-surface min-h-screen">
      {/* Cinematic Hero */}
      <header className="relative h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?w=1600&q=90&auto=format&fit=crop"
            className="w-full h-full object-cover grayscale opacity-20"
            alt="Ghana landscape"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface/90 via-surface/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full pt-20">
          <span className="uppercase tracking-[0.3em] text-[0.65rem] font-bold text-secondary mb-4 block">Archive & Press</span>
          <h1 className="font-headline text-[3.5rem] lg:text-[5rem] leading-[1] font-extrabold tracking-tighter text-on-surface mb-6">
            The <span className="italic font-light text-primary">Media Center.</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-xl font-light leading-relaxed">
            A comprehensive archive of our field work, documentary shorts, and high-resolution assets for press and research.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-24">
        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div className="flex p-1 bg-surface-container-low rounded-2xl border border-outline-variant/30 w-fit">
            {['all', 'image', 'video'].map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-8 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                  filter === t 
                    ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' 
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {t}s
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50">search</span>
            <input 
              type="text" 
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-surface rounded-2xl border border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body text-sm"
            />
          </div>
        </div>

        {/* Asset Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-32">
          {filteredAssets.map((asset, idx) => (
            <div 
              key={asset.id}
              className="group cursor-pointer"
              style={{ 
                opacity: visible ? 1 : 0, 
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${idx * 0.1}s` 
              }}
            >
              <div className="relative aspect-video rounded-[2rem] overflow-hidden bg-surface-container mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
                <img 
                  src={asset.url} 
                  alt={asset.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {asset.category === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform border border-white/30">
                      <span className="material-symbols-outlined text-white text-3xl filled">play_arrow</span>
                    </div>
                  </div>
                )}

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-primary uppercase tracking-wider">
                    {asset.type}
                  </span>
                </div>
              </div>

              <h3 className="font-headline text-xl font-bold text-on-surface mb-2 group-hover:text-primary transition-colors leading-snug">
                {asset.title}
              </h3>
              <p className="font-body text-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                {asset.description}
              </p>
            </div>
          ))}
        </div>

        {filteredAssets.length === 0 && (
          <div className="text-center py-24 bg-surface-container-low rounded-[3rem] border border-dashed border-outline-variant mb-32">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant/20 mb-4">folder_open</span>
            <p className="text-on-surface-variant font-body">No assets found matching your criteria.</p>
            <button 
              onClick={() => {setFilter('all'); setSearchQuery('');}}
              className="mt-6 text-primary font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Global Press Inquiry Section */}
        <section className={`relative rounded-[3rem] overflow-hidden transition-all duration-1000 delay-500 bg-primary text-on-primary ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_70%)]" />
          </div>
          
          <div className="relative z-10 p-12 lg:p-24 flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <h2 className="font-headline text-4xl lg:text-5xl font-extrabold mb-8 leading-tight tracking-tighter">
                Need Specific <br />
                <span className="text-secondary italic font-light">Documentation?</span>
              </h2>
              <p className="font-body text-lg text-on-primary/70 mb-12 leading-relaxed max-w-lg">
                Our archival desk handles requests for raw field footage, high-resolution photography, and academic datasets.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-secondary opacity-80">Press Desk</p>
                    <p className="text-xl font-bold">press@onewholefuture.org</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[450px]">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] border border-white/20 text-on-surface">
                {submitted ? (
                  <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="material-symbols-outlined text-4xl">check_circle</span>
                    </div>
                    <h3 className="font-headline text-2xl font-bold text-on-surface mb-2">Request Sent</h3>
                    <p className="font-body text-sm text-on-surface-variant">Our desk will contact you within 24 hours.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="font-headline text-2xl font-extrabold text-on-surface mb-8 tracking-tight">Request Media Assets</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[0.65rem] font-bold text-outline-variant uppercase tracking-widest ml-1">Full Identity</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="Johnathan Doe" 
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          className="w-full bg-surface-container-low border border-outline-variant/10 p-4 rounded-xl focus:outline-none focus:border-primary/50 font-body text-sm transition-all" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[0.65rem] font-bold text-outline-variant uppercase tracking-widest ml-1">Organization</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="The Global Journal" 
                          value={formData.organization}
                          onChange={(e) => setFormData({...formData, organization: e.target.value})}
                          className="w-full bg-surface-container-low border border-outline-variant/10 p-4 rounded-xl focus:outline-none focus:border-primary/50 font-body text-sm transition-all" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[0.65rem] font-bold text-outline-variant uppercase tracking-widest ml-1">Objective</label>
                        <textarea 
                          required 
                          placeholder="Detailed request for field documentation..." 
                          rows="3" 
                          value={formData.objective}
                          onChange={(e) => setFormData({...formData, objective: e.target.value})}
                          className="w-full bg-surface-container-low border border-outline-variant/10 p-4 rounded-xl focus:outline-none focus:border-primary/50 font-body text-sm transition-all resize-none"
                        ></textarea>
                      </div>
                      {error && (
                        <div className="bg-rose-50  text-rose-600  p-4 rounded-xl text-xs font-bold animate-in fade-in slide-in-from-top-2 duration-300 mb-6 flex items-center gap-3 border border-rose-100 ">
                          <span className="material-symbols-outlined text-sm">error</span>
                          {error}
                        </div>
                      )}
                      <button 
                        type="submit" 
                        disabled={submitting}
                        className="w-full bg-primary text-on-primary font-bold py-5 rounded-2xl hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-3 mt-4 group disabled:opacity-50"
                      >
                        <span>{submitting ? 'Dispatching...' : 'Dispatch Request'}</span>
                        <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">send</span>
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MediaCenterPage;
