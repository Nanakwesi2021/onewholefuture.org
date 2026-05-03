import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const NewsArticlePage = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const docRef = doc(db, 'news', articleId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setArticle({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document!");
          navigate('/news');
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        navigate('/news');
      } finally {
        setLoading(false);
        setTimeout(() => setIsVisible(true), 50);
      }
    };

    fetchArticle();
  }, [articleId, navigate]);

  if (loading) {
    return (
      <div className="bg-surface min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!article) return null;

  const formattedDate = article.createdAt?.toDate().toLocaleDateString('en-GB', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  }) || 'Recently';

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
