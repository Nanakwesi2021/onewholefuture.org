import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const MOCK_ARTICLES_MAP = {
  'mock-sim-movement': {
    id: 'mock-sim-movement',
    title: 'Youth Empowerment Initiative – Skills to Income (SIM) Movement',
    category: 'Impact',
    description: 'One Whole Future Foundation provided financial and operational support to the youth-led Skills to Income (SIM) Movement, serving as both a strategic partner and mentor throughout the planning and implementation of the initiative.',
    content: `One Whole Future Foundation provided financial and operational support to the youth-led Skills to Income (SIM) Movement, serving as both a strategic partner and mentor throughout the planning and implementation of the initiative. The Foundation offered guidance, consultation, and resources to help ensure the successful delivery of the two-day programme, reinforcing its commitment to empowering young people through skills development, entrepreneurship, and sustainable economic opportunities.

The programme targeted both young men and women and featured training in both soft and hard skills to equip participants with practical knowledge and entrepreneurial capabilities.

Soft Skills
Soft skills covered included communication, leadership, teamwork, personal branding, emotional intelligence, and other essential interpersonal skills that promote personal and professional growth.

Hard Skills
Hard skills included graphic design, forex trading, nail design, lash technology, soap making, and other beautician and vocational skills that participants can develop into sustainable income-generating opportunities.

Beyond knowledge sharing, the programme focused on inspiring participants to recognise their potential, embrace entrepreneurship, and develop a mindset of innovation, resilience, and self-reliance. Participants were encouraged to identify opportunities within their communities, transform their skills into viable ventures, and become agents of positive change.

The initiative aligns closely with the Foundation's commitment to empowering youth through education, skills development, and entrepreneurship, ultimately contributing to stronger and more resilient communities.`,
    image: '/images/sim_banner.jpg',
    gallery: [
      '/images/sim_nail_design.jpg',
      '/images/sim_makeup.jpg',
      '/images/sim_lash_nails.jpg',
    ],
    readTime: '4 min read',
    createdAt: new Date('2026-07-22T08:00:00Z')
  },
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
    image: '/images/health_tech.webp',
    readTime: '3 min read',
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
    image: '/image/young-millennials-african-friends-outdoor-gym-happy-black-people-having-fun-together-generation-z-friendship-concept.webp',
    readTime: '5 min read',
    createdAt: new Date('2026-06-11T13:20:00Z')
  },
  'mock-news-3': {
    id: 'mock-news-3',
    title: 'Youth-Led Agribusiness Innovation: Transforming Smallholder Farms',
    category: 'Community',
    description: 'Equipping rural youth with tech-driven farming practices and market access to build sustainable community food security.',
    content: `Our Community Action teams are working with over 300 young agri-entrepreneurs in the Eastern and Volta regions, introducing climate-smart farming and direct-to-market logistics.

Through hands-on training, participants learn modern irrigation techniques, soil health monitoring, and digital supply chain tools that connect farm produce directly to urban retail centers.

Key Milestones:
- 300+ youth farmers trained in sustainable agriculture.
- 4 cooperative storage and distribution nodes established.
- 35% reduction in post-harvest loss reported across partner farms.`,
    image: '/image/kojo-nana-GtnFtsPXKME-unsplash.webp',
    readTime: '4 min read',
    createdAt: new Date('2026-05-28T09:30:00Z')
  },
  'mock-news-4': {
    id: 'mock-news-4',
    title: 'Digital Literacy & Coding Hub Expands to 5 New Districts',
    category: 'Education',
    description: 'Bridging the technological divide by delivering computer workstations and hands-on coding bootcamps for public school students.',
    content: `Over 2,500 students have gained foundational computer programming, web development, and digital literacy skills through our mobile lab initiative.

In partnership with local educational directorates, our team deployed 60 high-efficiency workstations to community library centers, providing solar-backed internet access and structured curriculum materials.

Key Milestones:
- 2,500+ students certified in basic computer literacy.
- 60 digital workstations deployed and maintained.
- 12 youth-led tech clubs launched across secondary schools.`,
    image: '/image/medical-assistant-student-reading-green-lamp-library.webp',
    readTime: '3 min read',
    createdAt: new Date('2026-05-15T14:00:00Z')
  }
};

const NewsArticlePage = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(() => MOCK_ARTICLES_MAP[articleId] || null);
  const [loading, setLoading] = useState(() => !MOCK_ARTICLES_MAP[articleId]);
  const [isVisible, setIsVisible] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }).catch(() => {});
    }
  };

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

  const [heroSlide, setHeroSlide] = useState(0);

  const headerImages = article
    ? [article.image, ...(article.gallery || [])].filter(Boolean)
    : ['https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?auto=format&fit=crop&q=80&w=2000'];

  useEffect(() => {
    if (headerImages.length <= 1) return;
    const timer = setInterval(() => {
      setHeroSlide(prev => (prev + 1) % headerImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [headerImages.length]);

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
      {/* Hero Header with Event Photos Slideshow */}
      <div className="relative h-[65vh] min-h-[440px] w-full overflow-hidden">
        {headerImages.map((img, idx) => (
          <img 
            key={idx}
            src={img} 
            alt={`${article.title} - photo ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
              idx === heroSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent z-10" />

        {/* Slideshow Pill Indicators */}
        {headerImages.length > 1 && (
          <div className="absolute top-28 right-8 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/20">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/90 mr-1">Photos</span>
            {headerImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setHeroSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === heroSlide ? 'w-6 bg-secondary' : 'w-1.5 bg-white/50 hover:bg-white'
                }`}
              />
            ))}
          </div>
        )}
        
        <div className="absolute inset-0 flex flex-col justify-end px-8 pb-16 max-w-7xl mx-auto w-full z-20">
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

          {/* Photo Gallery */}
          {article.gallery && article.gallery.length > 0 && (
            <div className="mt-16">
              <h3 className="text-xs font-bold tracking-[0.25em] text-tertiary uppercase mb-8 font-headline">Programme Gallery</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {article.gallery.map((src, idx) => (
                  <div key={idx} className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src={src}
                      alt={`SIM Movement programme photo ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* End of article share bar (mobile & quick action) */}
          <div className="mt-16 pt-8 border-t border-outline-variant/15 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-surface-container-low/50 p-6 md:p-8 rounded-3xl">
            <div>
              <h4 className="font-headline font-bold text-primary text-base mb-1">Found this inspiring?</h4>
              <p className="font-body text-xs text-on-surface-variant">Share this initiative with colleagues and friends.</p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on X"
                className="w-10 h-10 rounded-xl bg-white border border-outline-variant/20 flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-neutral-900 transition-all shadow-sm"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on LinkedIn"
                className="w-10 h-10 rounded-xl bg-white border border-outline-variant/20 flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-[#0A66C2] transition-all shadow-sm"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' - ' + window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on WhatsApp"
                className="w-10 h-10 rounded-xl bg-white border border-outline-variant/20 flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-[#25D366] transition-all shadow-sm"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.42-.42-.57-.43h-.49c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.2-.18-.45-.3z" />
                </svg>
              </a>
              <button
                onClick={handleCopyLink}
                title="Copy link"
                className={`px-3.5 h-10 rounded-xl border text-xs font-bold font-headline flex items-center gap-1.5 transition-all shadow-sm ${
                  copied
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'bg-white text-primary border-outline-variant/20 hover:bg-surface-container'
                }`}
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                  <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
                </svg>
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-outline-variant/20">
            <Link to="/news" className="inline-flex items-center gap-3 text-primary font-bold hover:gap-5 transition-all">
              <span className="material-symbols-outlined">arrow_back</span>
              <span>Back to all dispatches</span>
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 space-y-12">
            {/* Share Story Card */}
            <div className="bg-surface-container-lowest p-8 md:p-10 rounded-3xl border border-outline-variant/15 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xs font-bold tracking-[0.25em] text-tertiary uppercase font-headline">Share Story</h4>
                <span className="text-[11px] text-on-surface-variant/60 font-body">Spread the word</span>
              </div>

              {/* Social Action Grid */}
              <div className="grid grid-cols-5 gap-2.5 mb-6">
                {/* X / Twitter */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on X (Twitter)"
                  title="Share on X"
                  className="w-full aspect-square rounded-2xl border border-outline-variant/20 flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-neutral-900 hover:border-neutral-900 hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  title="Share on LinkedIn"
                  className="w-full aspect-square rounded-2xl border border-outline-variant/20 flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                  title="Share on Facebook"
                  className="w-full aspect-square rounded-2xl border border-outline-variant/20 flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-[#1877F2] hover:border-[#1877F2] hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' - ' + window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on WhatsApp"
                  title="Share on WhatsApp"
                  className="w-full aspect-square rounded-2xl border border-outline-variant/20 flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-[#25D366] hover:border-[#25D366] hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.42-.42-.57-.43h-.49c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.2-.18-.45-.3z" />
                  </svg>
                </a>

                {/* Email */}
                <a
                  href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent((article.description || '') + '\n\nRead more at: ' + window.location.href)}`}
                  aria-label="Share via Email"
                  title="Share via Email"
                  className="w-full aspect-square rounded-2xl border border-outline-variant/20 flex items-center justify-center text-on-surface-variant hover:text-white hover:bg-primary hover:border-primary hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </a>
              </div>

              {/* Copy Link Input Bar */}
              <div className="relative">
                <button
                  onClick={handleCopyLink}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border text-xs font-semibold font-headline transition-all duration-300 ${
                    copied
                      ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20'
                      : 'bg-surface-container-low text-primary border-outline-variant/20 hover:border-primary/40 hover:bg-surface-container'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0 fill-current">
                      <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
                    </svg>
                    <span className="truncate text-[11px] opacity-80">{window.location.href}</span>
                  </div>
                  <span className="flex-shrink-0 font-bold text-[11px] uppercase tracking-wider">
                    {copied ? 'Copied!' : 'Copy'}
                  </span>
                </button>
              </div>

              {/* Native Mobile Share Button (if supported) */}
              {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
                <button
                  onClick={() => {
                    navigator.share({
                      title: article.title,
                      text: article.description,
                      url: window.location.href
                    }).catch(() => {});
                  }}
                  className="mt-3 w-full py-2.5 px-4 rounded-xl bg-surface-container text-primary hover:bg-surface-container-high transition-colors text-[11px] font-bold tracking-wider uppercase flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">share</span>
                  More Share Options
                </button>
              )}
            </div>

            <div className="bg-secondary-container rounded-3xl p-8 md:p-10 shadow-sm">
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
