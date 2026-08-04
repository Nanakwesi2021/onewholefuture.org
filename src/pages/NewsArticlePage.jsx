import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const MOCK_ARTICLES_MAP = {
  'mock-news-1': {
    id: 'mock-news-1',
    title: 'Transforming Healthcare Delivery in Ghana: The 2026 Fellowship',
    category: 'Impact',
    description: 'A summary of the achievements and local community impact made by our 2026 Health Tech Fellowship cohort.',
    content: `We are proud to announce the successful deployment of five digital health systems in rural clinics, serving over 10,000 residents across three districts.

Through strategic collaboration with the Ministry of Health and local medical officers, our fellows developed low-latency diagnostic tools capable of functioning offline. Over 40 healthcare workers have received specialized training to operate these digital systems, ensuring long-term sustainability.

Key Milestones Achieved:
- 10,000+ patient records digitized safely with end-to-end encryption.
- 5 rural clinics fully equipped with solar-powered digital tablets.
- 40+ local healthcare practitioners certified in digital medical triage.

Looking forward, the 2027 expansion phase aims to scale these digital health solutions to 15 additional sub-districts across West Africa.`,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=85&w=800',
    createdAt: new Date('2026-06-14T11:00:00Z')
  },
  'mock-news-2': {
    id: 'mock-news-2',
    title: 'Climate Resilience Lab Receives Strategic Funding Expansion',
    category: 'Technology',
    description: 'A new multi-year partnership enables expansion of climate-adaptive agricultural monitoring tech.',
    content: `Through our collaboration with international climate agencies, we are deploying 200 micro-weather stations to support smallholder farmers across vulnerable agricultural corridors.

These weather stations leverage AI-driven micro-climate modeling to provide real-time irrigation and planting advisories via SMS and voice alerts in local languages.

Key Milestones Achieved:
- 200 micro-weather stations manufactured and distributed.
- 15,000 smallholder farming households receiving daily agricultural advisories.
- 30% average increase in crop yields recorded across pilot farming cooperatives.`,
    image: 'https://images.unsplash.com/photo-1530631676643-0552cf58800e?auto=format&fit=crop&q=85&w=800',
    createdAt: new Date('2026-06-11T13:20:00Z')
  }
};

const NewsArticlePage = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(() => MOCK_ARTICLES_MAP[articleId] || null);
  const [loading, setLoading] = useState(() => !MOCK_ARTICLES_MAP[articleId]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (MOCK_ARTICLES_MAP[articleId]) {
      setArticle(MOCK_ARTICLES_MAP[articleId]);
      setLoading(false);
      setIsVisible(true);
      return;
    }

    let isMounted = true;
    const fetchArticle = async () => {
      try {
        const docRef = doc(db, 'news', articleId);
        const docSnap = await getDoc(docRef);

        if (isMounted) {
          if (docSnap.exists()) {
            setArticle({ id: docSnap.id, ...docSnap.data() });
          } else {
            console.warn("Article not found in Firestore.");
            navigate('/news');
          }
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        if (isMounted) navigate('/news');
      } finally {
        if (isMounted) {
          setLoading(false);
          setIsVisible(true);
        }
      }
    };

    fetchArticle();

    return () => {
      isMounted = false;
    };
  }, [articleId, navigate]);

  if (loading) {
    return (
      <div className="bg-surface min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!article) return null;

  const formattedDate = article.createdAt?.toDate 
    ? article.createdAt.toDate().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
    : article.createdAt instanceof Date 
      ? article.createdAt.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
      : 'Recently';

  return (
    <div className="bg-surface min-h-screen pb-32">
      {/* Hero Header */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <img 
          src={article.image || 'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?auto=format&fit=crop&q=80&w=2000'} 
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end px-8 pb-16 max-w-7xl mx-auto w-full">
          <div 
            className="transition-all duration-1000 transform"
            style={{ 
              opacity: isVisible ? 1 : 0, 
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)' 
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-[2px] bg-secondary-fixed"></span>
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-secondary-fixed">
                {article.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-on-primary tracking-tighter font-headline leading-[1.1] max-w-4xl">
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 mt-16">
        <div className="lg:col-span-8">
          <div className="flex items-center gap-6 mb-12 pb-8 border-b border-outline-variant/20">
            <div className="flex flex-col">
              <span className="text-[0.65rem] font-bold text-outline tracking-[0.2em] uppercase mb-1">Published</span>
              <span className="text-sm font-bold text-primary">{formattedDate}</span>
            </div>
            <div className="w-[1px] h-8 bg-outline-variant/30" />
            <div className="flex flex-col">
              <span className="text-[0.65rem] font-bold text-outline tracking-[0.2em] uppercase mb-1">Author</span>
              <span className="text-sm font-bold text-primary">owf.dispatch</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-primary font-headline font-medium leading-relaxed mb-8 italic">
              {article.description}
            </p>
            <div className="font-body text-lg text-on-surface-variant leading-loose space-y-6">
              {article.content ? (
                <div className="whitespace-pre-wrap">{article.content}</div>
              ) : (
                <p>No additional content available for this article.</p>
              )}
            </div>
          </div>

          <div className="mt-20 pt-12 border-t border-outline-variant/20">
            <Link to="/news" className="inline-flex items-center gap-3 text-primary font-bold hover:gap-5 transition-all">
              <span className="material-symbols-outlined">arrow_back</span>
              <span>Back to all dispatches</span>
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 space-y-12">
            <div className="bg-surface-container-lowest p-10 rounded-2xl border border-outline-variant/10 shadow-sm">
              <h4 className="text-xs font-bold tracking-[0.25em] text-tertiary uppercase mb-8 font-headline">Share Story</h4>
              <div className="flex gap-4">
                {['facebook', 'twitter', 'linkedin', 'mail'].map(icon => (
                  <button key={icon} className="w-12 h-12 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-primary hover:text-white transition-all text-outline-variant hover:border-primary">
                    <span className="material-symbols-outlined text-xl">{icon === 'mail' ? 'mail' : 'share'}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-secondary-container rounded-2xl p-10">
              <h4 className="font-headline text-xl font-bold text-primary mb-4">Want more updates?</h4>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-8">
                Subscribe to our newsletter to receive the latest dispatches directly in your inbox.
              </p>
              <Link to="/contact" className="block w-full bg-primary text-on-primary text-center font-bold py-4 rounded-xl hover:bg-primary/90 transition-all text-sm shadow-lg shadow-primary/10">
                Join the Mailing List
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsArticlePage;
