import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';

const FALLBACK_IMAGE = '/images/our_work_final.webp';

const MOCK_ARTICLES = [
  {
    id: 'mock-sim-movement',
    title: 'Youth Empowerment Initiative – Skills to Income (SIM) Movement',
    category: 'Impact',
    description: 'One Whole Future Foundation provided financial and operational support to the youth-led Skills to Income (SIM) Movement, serving as both a strategic partner and mentor throughout the planning and implementation of the initiative.',
    content: 'One Whole Future Foundation provided financial and operational support to the youth-led Skills to Income (SIM) Movement, serving as both a strategic partner and mentor throughout the planning and implementation of the initiative. The Foundation offered guidance, consultation, and resources to help ensure the successful delivery of the two-day programme, reinforcing its commitment to empowering young people through skills development, entrepreneurship, and sustainable economic opportunities.',
    image: '/images/sim_banner.jpg',
    gallery: [
      '/images/sim_nail_design.jpg',
      '/images/sim_makeup.jpg',
      '/images/sim_lash_nails.jpg'
    ],
    featured: true,
    readTime: '4 min read',
    createdAt: { toDate: () => new Date('2026-07-22T08:00:00Z') }
  },
  {
    id: 'mock-news-1',
    title: 'Transforming Healthcare Delivery in Ghana: The 2026 Fellowship',
    category: 'Impact',
    description: 'A summary of the achievements and local community impact made by our 2026 Health Tech Fellowship cohort across rural clinics.',
    content: 'We are proud to announce the successful deployment of five digital health systems in rural clinics, serving over 10,000 residents across three districts.',
    image: '/images/health_tech.webp',
    featured: false,
    readTime: '3 min read',
    createdAt: { toDate: () => new Date('2026-06-14T11:00:00Z') }
  },
  {
    id: 'mock-news-2',
    title: 'Climate Resilience Lab Receives Strategic Funding Expansion',
    category: 'Technology',
    description: 'A new multi-year partnership enables expansion of climate-adaptive agricultural monitoring tech for smallholder farmers.',
    content: 'Through our collaboration with international climate agencies, we are deploying 200 micro-weather stations to support smallholder farmers across vulnerable agricultural corridors.',
    image: '/image/young-millennials-african-friends-outdoor-gym-happy-black-people-having-fun-together-generation-z-friendship-concept.webp',
    featured: false,
    readTime: '5 min read',
    createdAt: { toDate: () => new Date('2026-06-11T13:20:00Z') }
  },
  {
    id: 'mock-news-3',
    title: 'Youth-Led Agribusiness Innovation: Transforming Smallholder Farms',
    category: 'Community',
    description: 'Equipping rural youth with tech-driven farming practices and market access to build sustainable community food security.',
    content: 'Our Community Action teams are working with over 300 young agri-entrepreneurs in the Eastern and Volta regions, introducing climate-smart farming and direct-to-market logistics.',
    image: '/image/kojo-nana-GtnFtsPXKME-unsplash.webp',
    featured: false,
    readTime: '4 min read',
    createdAt: { toDate: () => new Date('2026-05-28T09:30:00Z') }
  },
  {
    id: 'mock-news-4',
    title: 'Digital Literacy & Coding Hub Expands to 5 New Districts',
    category: 'Education',
    description: 'Bridging the technological divide by delivering computer workstations and hands-on coding bootcamps for public school students.',
    content: 'Over 2,500 students have gained foundational computer programming, web development, and digital literacy skills through our mobile lab initiative.',
    image: '/image/medical-assistant-student-reading-green-lamp-library.webp',
    featured: false,
    readTime: '3 min read',
    createdAt: { toDate: () => new Date('2026-05-15T14:00:00Z') }
  }
];

const CATEGORIES = ['All', 'Impact', 'Technology', 'Community', 'Education', 'Press Release', 'Strategic Report'];

const NewsPortalPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [articles, setArticles] = useState(MOCK_ARTICLES);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        if (!snapshot.empty) {
          const newsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          // Merge Firestore articles with built-in articles (avoiding duplicates)
          const merged = [...newsData];
          MOCK_ARTICLES.forEach(mock => {
            const exists = merged.some(
              a => a.id === mock.id || 
              (a.title && mock.title && a.title.trim().toLowerCase() === mock.title.trim().toLowerCase())
            );
            if (!exists) {
              merged.push(mock);
            }
          });

          // Sort by date descending
          merged.sort((a, b) => {
            const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : (a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt || 0));
            const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : (b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt || 0));
            return dateB - dateA;
          });

          setArticles(merged);
        } else {
          setArticles(MOCK_ARTICLES);
        }
      },
      (err) => {
        console.warn("Firestore news fetch notice. Retaining local articles:", err);
        setArticles(MOCK_ARTICLES);
      }
    );

    return () => {
      unsubscribe();
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
        source: 'news_portal_sidebar'
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

  // Filter articles based on active category and search query
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
      const matchesSearch = !searchQuery.trim() || 
        article.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articles, activeCategory, searchQuery]);

  // Featured article is the first article when searching is empty and on 'All'
  const featuredArticle = !searchQuery.trim() && activeCategory === 'All' ? filteredArticles[0] : null;
  const gridArticles = featuredArticle 
    ? filteredArticles.filter(a => a.id !== featuredArticle.id)
    : filteredArticles;

  // Hero slideshow images
  const featuredImages = featuredArticle 
    ? [featuredArticle.image, ...(featuredArticle.gallery || [])].filter(Boolean)
    : [FALLBACK_IMAGE];

  useEffect(() => {
    if (featuredImages.length <= 1) return;
    const interval = setInterval(() => {
      setHeroSlide(prev => (prev + 1) % featuredImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [featuredImages.length]);

  const getCategoryCount = (category) => {
    if (category === 'All') return articles.length;
    return articles.filter(a => a.category === category).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-screen">
      <main className="pb-32 pt-28">
        
        {/* ─── PAGE HEADER & DISPATCH INTRO ─── */}
        <section className="px-6 md:px-8 max-w-7xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-outline-variant/15">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-secondary font-headline">The Foundation Dispatch</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-headline text-primary tracking-tight">
                News & Field Stories
              </h1>
              <p className="text-on-surface-variant font-body text-base md:text-lg max-w-2xl mt-3 leading-relaxed">
                Documenting real impact, youth-driven enterprise, and sustainable community solutions across Ghana.
              </p>
            </div>

            {/* Quick Search */}
            <div className="w-full md:w-80 relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stories, topics..." 
                className="w-full bg-white border border-outline-variant/20 rounded-2xl pl-12 pr-10 py-3.5 text-sm text-primary placeholder:text-on-surface-variant/50 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm"
              />
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant text-xl">search</span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ─── FEATURED STORY HERO SPOTLIGHT ─── */}
        {featuredArticle && (
          <section className="px-6 md:px-8 max-w-7xl mx-auto mb-16">
            <Link 
              to={`/news/${featuredArticle.id}`} 
              className="group relative block aspect-[16/9] md:aspect-[21/9] min-h-[420px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-outline-variant/10 transition-all duration-500"
            >
              {featuredImages.map((img, idx) => (
                <img 
                  key={idx}
                  src={img} 
                  alt={`${featuredArticle.title} - photo ${idx + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 ${
                    idx === heroSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                  }`}
                />
              ))}

              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/45 to-transparent z-10" />

              {/* Photo Slideshow Indicators */}
              {featuredImages.length > 1 && (
                <div className="absolute top-8 right-8 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/20">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/90 mr-1">Event Photos</span>
                  {featuredImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setHeroSlide(idx);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        idx === heroSlide ? 'w-6 bg-secondary' : 'w-1.5 bg-white/50 hover:bg-white'
                      }`}
                    />
                  ))}
                </div>
              )}

              <div className="absolute bottom-0 left-0 p-8 md:p-14 max-w-4xl z-20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-block bg-secondary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-md">
                    Featured Story
                  </span>
                  <span className="text-white/80 text-xs font-semibold uppercase tracking-wider">
                    {featuredArticle.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/50" />
                  <span className="text-white/80 text-xs">
                    {featuredArticle.readTime || '4 min read'}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl md:text-5xl font-headline font-black text-white mb-4 leading-[1.1] tracking-tight group-hover:text-accent transition-colors">
                  {featuredArticle.title}
                </h2>
                
                <p className="text-white/85 text-sm md:text-lg font-body max-w-2xl line-clamp-2 leading-relaxed">
                  {featuredArticle.excerpt || featuredArticle.description || featuredArticle.content?.substring(0, 160) + '...'}
                </p>

                <div className="mt-6 flex items-center gap-2 text-white font-bold text-sm font-headline group-hover:gap-3 transition-all">
                  <span>Read full dispatch</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* ─── CATEGORIES & MAIN GRID ─── */}
        <section className="px-6 md:px-8 max-w-7xl mx-auto">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-12 scrollbar-none">
            {CATEGORIES.map(cat => {
              const count = getCategoryCount(cat);
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                  }}
                  className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-headline font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' 
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high border border-outline-variant/10'
                  }`}
                >
                  <span>{cat}</span>
                  {count > 0 && (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-surface-container-highest text-on-surface-variant'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            
            {/* Articles Column */}
            <div className="flex-grow">
              {gridArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  {gridArticles.map((article) => (
                    <Link 
                      key={article.id} 
                      to={`/news/${article.id}`}
                      className="group bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant/15 hover:border-primary/30 hover:shadow-xl transition-all duration-500 flex flex-col"
                    >
                      {/* Card Image Container */}
                      <div className="aspect-[16/10] overflow-hidden relative bg-surface-container">
                        <img 
                          src={article.image || FALLBACK_IMAGE} 
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = FALLBACK_IMAGE;
                          }}
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/90 backdrop-blur-md text-primary text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                            {article.category || 'Impact'}
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6 sm:p-8 flex flex-col flex-grow">
                        <div className="flex items-center gap-3 text-xs text-on-surface-variant/70 mb-3">
                          <span className="font-semibold text-primary/70">
                            {article.createdAt?.toDate 
                              ? new Date(article.createdAt.toDate()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                              : article.createdAt instanceof Date 
                                ? article.createdAt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                                : 'Recent'}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-outline-variant" />
                          <span>{article.readTime || '3 min read'}</span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-headline font-extrabold text-primary group-hover:text-secondary transition-colors mb-3 leading-snug">
                          {article.title}
                        </h3>

                        <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-3 mb-6 flex-grow font-body">
                          {article.excerpt || article.description || article.content?.substring(0, 140) + '...'}
                        </p>

                        <div className="pt-4 border-t border-outline-variant/10 flex items-center justify-between text-xs font-bold font-headline text-primary group-hover:text-secondary transition-colors">
                          <span>Read Full Story</span>
                          <span className="material-symbols-outlined text-base group-hover:translate-x-1.5 transition-transform">arrow_forward</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center bg-surface-container-low rounded-3xl border border-dashed border-outline-variant/30 p-8">
                  <span className="material-symbols-outlined text-outline-variant text-6xl mb-4 block">search_off</span>
                  <h3 className="text-lg font-headline font-bold text-primary mb-2">No dispatches found</h3>
                  <p className="text-on-surface-variant font-body text-sm max-w-md mx-auto mb-6">
                    {searchQuery ? `No articles matching "${searchQuery}" in this category.` : 'There are currently no articles in this section.'}
                  </p>
                  {(searchQuery || activeCategory !== 'All') && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setActiveCategory('All');
                      }}
                      className="px-6 py-2.5 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-primary/90 transition-all shadow-md"
                    >
                      Reset Filters
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* ─── SIDEBAR ─── */}
            <aside className="lg:w-80 flex-shrink-0">
              <div className="sticky top-28 space-y-8">

                {/* Newsletter Card */}
                <div className="bg-primary rounded-3xl p-8 text-white overflow-hidden relative group shadow-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-1000"></div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-secondary text-lg">mail</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-secondary">Dispatch Weekly</span>
                  </div>
                  <h4 className="text-2xl font-extrabold mb-3 tracking-tight font-headline">Stay Connected</h4>
                  <p className="text-xs text-white/75 leading-relaxed mb-6 font-body">
                    Get field reports, fellowship highlights, and youth innovation directly in your inbox.
                  </p>
                  {subscribed ? (
                    <div className="bg-white/10 rounded-2xl p-4 flex items-center gap-3 border border-white/20">
                      <span className="material-symbols-outlined text-secondary">check_circle</span>
                      <p className="text-white font-bold text-xs">You're on the list! Thank you.</p>
                    </div>
                  ) : (
                    <form className="space-y-3" onSubmit={handleNewsletterSubmit}>
                      <input 
                        type="email" 
                        placeholder="Enter your email" 
                        required
                        value={newsletterEmail}
                        onChange={(e) => {
                          setNewsletterEmail(e.target.value);
                          setError('');
                        }}
                        className={`w-full bg-white/10 border ${error ? 'border-rose-400' : 'border-white/20'} rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:bg-white/20 transition-all text-xs`}
                      />
                      {error && <p className="text-[10px] font-bold text-rose-300 ml-1">{error}</p>}
                      <button 
                        disabled={submitting}
                        className="w-full bg-secondary text-white font-bold py-3.5 rounded-xl hover:bg-secondary/90 transition-all text-xs font-headline shadow-lg disabled:opacity-50 tracking-wider uppercase"
                      >
                        {submitting ? 'Subscribing...' : 'Subscribe'}
                      </button>
                    </form>
                  )}
                </div>

                {/* Trending Impact Topics */}
                <div className="bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/15 shadow-sm">
                  <h4 className="font-headline font-bold text-primary text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-base">trending_up</span>
                    Impact Focus Areas
                  </h4>
                  <div className="space-y-3">
                    {[
                      { name: 'Youth Enterprise (SIM)', cat: 'Impact' },
                      { name: 'Health Tech & Triage', cat: 'Impact' },
                      { name: 'Climate Resilience Lab', cat: 'Technology' },
                      { name: 'Agribusiness Hubs', cat: 'Community' },
                      { name: 'Digital Literacy', cat: 'Education' }
                    ].map(topic => (
                      <button 
                        key={topic.name} 
                        onClick={() => {
                          setActiveCategory(topic.cat);
                          window.scrollTo({ top: 300, behavior: 'smooth' });
                        }}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-container-low transition-colors group text-left"
                      >
                        <span className="text-xs font-semibold text-on-surface-variant group-hover:text-primary transition-colors">{topic.name}</span>
                        <span className="material-symbols-outlined text-xs text-outline-variant group-hover:text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Foundation Snapshot Card */}
                <div className="bg-surface-container-low rounded-3xl p-8 border border-outline-variant/10">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-secondary font-headline block mb-2">About The Foundation</span>
                  <h5 className="font-headline font-extrabold text-primary text-base mb-3">One Whole Future</h5>
                  <p className="font-body text-xs text-on-surface-variant leading-relaxed mb-6">
                    A non-profit foundation empowering Ghanaian youth through entrepreneurship, health innovation, and community leadership.
                  </p>
                  <Link 
                    to="/about"
                    className="inline-flex items-center gap-2 text-xs font-bold font-headline text-primary hover:text-secondary transition-colors"
                  >
                    <span>Our Story & Mission</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </Link>
                </div>

              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NewsPortalPage;
