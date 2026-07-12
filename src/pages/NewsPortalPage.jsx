import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1504711432869-0df305860f4c?auto=format&fit=crop&q=80&w=1000';

const MOCK_ARTICLES = [
  {
    id: 'mock-news-1',
    title: 'Transforming Healthcare Delivery in Ghana: The 2026 Fellowship',
    category: 'Impact',
    description: 'A summary of the achievements and local community impact made by our 2026 Health Tech Fellowship cohort.',
    content: 'We are proud to announce the successful deployment of five digital health systems in rural clinics, serving over 10,000 residents across three districts.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=85&w=800',
    featured: true,
    createdAt: { toDate: () => new Date('2026-06-14T11:00:00Z') }
  },
  {
    id: 'mock-news-2',
    title: 'Climate Resilience Lab Receives Strategic Funding Expansion',
    category: 'Technology',
    description: 'A new multi-year partnership enables expansion of climate-adaptive agricultural monitoring tech.',
    content: 'Through our collaboration with international climate agencies, we are deploying 200 micro-weather stations to support smallholder farmers.',
    image: 'https://images.unsplash.com/photo-1530631676643-0552cf58800e?auto=format&fit=crop&q=85&w=800',
    featured: false,
    createdAt: { toDate: () => new Date('2026-06-11T13:20:00Z') }
  }
];

const NewsPortalPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const newsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setArticles(newsData);
        setLoading(false);
      },
      (error) => {
        console.error("Firestore news subscription error. Using local mock data:", error);
        setArticles(MOCK_ARTICLES);
        setLoading(false);
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

  const categories = ['All', 'Press Release', 'Impact', 'Technology', 'Community', 'Education', 'Strategic Report', 'In the Field'];
  
  const filteredArticles = activeCategory === 'All' 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  const featuredArticle = articles[0];
  const otherArticles = filteredArticles.filter(a => a.id !== (featuredArticle?.id));

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-screen">
      <main className="pb-32 pt-24">
        
        {/* Hero / Featured Article */}
        {featuredArticle && activeCategory === 'All' && (
          <section className="px-8 max-w-7xl mx-auto mb-24">
            <Link to={`/news/${featuredArticle.id}`} className="group relative block aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img 
                src={featuredArticle.image || FALLBACK_IMAGE} 
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-12 md:p-20 max-w-4xl">
                <span className="inline-block bg-secondary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">Featured</span>
                <h2 className="text-4xl md:text-6xl font-headline font-black text-white mb-6 leading-[1.1] tracking-tighter">
                  {featuredArticle.title}
                </h2>
                <p className="text-white/80 text-lg md:text-xl font-body max-w-2xl line-clamp-2">
                  {featuredArticle.excerpt || featuredArticle.description || featuredArticle.content?.substring(0, 160) + '...'}
                </p>
              </div>
            </Link>
          </section>
        )}

        {/* Filters & Grid */}
        <section className="px-8 max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 mb-16 border-b border-outline-variant/10 pb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-full text-sm font-headline font-bold transition-all ${
                  activeCategory === cat 
                    ? 'bg-primary text-white shadow-lg' 
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-16">
            {/* Main Content Grid */}
            <div className="flex-grow">
              {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {otherArticles.map((article, idx) => (
                    <Link 
                      key={article.id} 
                      to={`/news/${article.id}`}
                      className="group flex flex-col animate-fadeSlideUp"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <div className="aspect-[16/10] rounded-3xl overflow-hidden mb-6 shadow-lg">
                        <img 
                          src={article.image || FALLBACK_IMAGE} 
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[0.7rem] font-black uppercase tracking-widest text-secondary">{article.category || 'Impact'}</span>
                        <div className="w-1 h-1 rounded-full bg-outline-variant" />
                        <span className="text-[0.7rem] text-on-surface-variant font-medium">
                          {article.createdAt?.toDate ? new Date(article.createdAt.toDate()).toLocaleDateString() : 'Recent'}
                        </span>
                      </div>
                      <h3 className="text-2xl font-headline font-extrabold text-primary group-hover:text-secondary transition-colors mb-4 leading-tight">
                        {article.title}
                      </h3>
                      <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-3">
                        {article.excerpt || article.description || article.content?.substring(0, 120) + '...'}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center bg-surface-container-low rounded-[2.5rem] border border-dashed border-outline-variant/30">
                  <span className="material-symbols-outlined text-outline-variant text-6xl mb-4">newspaper</span>
                  <p className="text-on-surface-variant font-body">No articles found in this category.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:w-80 flex-shrink-0">
              <div className="sticky top-28 space-y-12">
                {/* Search Bar */}
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search articles..." 
                    className="w-full bg-white border border-outline-variant/20 rounded-2xl px-12 py-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">search</span>
                </div>

                {/* Newsletter Card */}
                <div className="bg-primary rounded-[2rem] p-10 text-white overflow-hidden relative group shadow-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-1000"></div>
                  <h4 className="text-2xl font-extrabold mb-4 tracking-tight font-headline relative z-10">Dispatch</h4>
                  <p className="text-sm text-white/70 leading-relaxed mb-8 font-body relative z-10">
                    Weekly insights into the future of humanity, delivered to your inbox.
                  </p>
                  {subscribed ? (
                    <div className="relative z-10 animate-fadeSlideUp">
                      <div className="bg-white/10 rounded-xl p-4 flex items-center gap-3">
                        <span className="material-symbols-outlined text-secondary">check_circle</span>
                        <p className="text-white font-bold text-sm">You're on the list.</p>
                      </div>
                    </div>
                  ) : (
                    <form className="space-y-4 relative z-10" onSubmit={handleNewsletterSubmit}>
                      <input 
                        type="email" 
                        placeholder="Email address" 
                        required
                        value={newsletterEmail}
                        onChange={(e) => {
                          setNewsletterEmail(e.target.value);
                          setError('');
                        }}
                        className={`w-full bg-white/10 border ${error ? 'border-rose-400' : 'border-white/20'} rounded-xl px-4 py-4 text-white placeholder:text-white/40 focus:outline-none focus:bg-white/20 transition-all text-sm`}
                      />
                      {error && <p className="text-[10px] font-bold text-rose-300 ml-1 animate-pulse">{error}</p>}
                      <button 
                        disabled={submitting}
                        className="w-full bg-secondary text-white font-bold py-4 rounded-xl hover:bg-secondary/90 transition-all text-sm shadow-xl shadow-black/10 disabled:opacity-50"
                      >
                        {submitting ? 'Subscribing...' : 'Join the List'}
                      </button>
                    </form>
                  )}
                </div>

                {/* Categories Sidebar */}
                <div className="bg-surface-container-low rounded-[2rem] p-8 border border-outline-variant/10">
                  <h4 className="font-headline font-bold text-primary mb-6">Trending Topics</h4>
                  <div className="space-y-4">
                    {['Digital Identity', 'SDG Tracking', 'Youth Leadership', 'Accra Tech Hub'].map(topic => (
                      <a href="#" key={topic} className="flex items-center justify-between group">
                        <span className="text-sm text-on-surface-variant group-hover:text-primary transition-colors">{topic}</span>
                        <span className="material-symbols-outlined text-sm text-outline-variant group-hover:translate-x-1 transition-transform">trending_flat</span>
                      </a>
                    ))}
                  </div>
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
