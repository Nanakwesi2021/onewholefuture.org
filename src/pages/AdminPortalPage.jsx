import React, { useState, useEffect, useMemo, memo } from 'react';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, addDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

// Loading Skeleton Components (Memoized)
const StatSkeleton = memo(() => (
  <div className="p-8 bg-white rounded-3xl shadow-sm border border-outline-variant/10 relative overflow-hidden">
    <div className="w-24 h-3 skeleton rounded-full mb-4"></div>
    <div className="w-16 h-10 skeleton rounded-xl mb-6"></div>
    <div className="w-32 h-2 skeleton rounded-full"></div>
  </div>
));

const TableRowSkeleton = memo(() => (
  <tr className="animate-pulse">
    <td className="px-8 py-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl skeleton"></div>
        <div className="space-y-2">
          <div className="w-32 h-3 skeleton rounded-full"></div>
          <div className="w-24 h-2 skeleton rounded-full"></div>
        </div>
      </div>
    </td>
    <td className="px-8 py-6"><div className="w-20 h-3 skeleton rounded-full"></div></td>
    <td className="px-8 py-6"><div className="w-16 h-5 skeleton rounded-full"></div></td>
    <td className="px-8 py-6 text-right"><div className="w-8 h-8 rounded-full skeleton ml-auto"></div></td>
  </tr>
));

const MOCK_APPLICANTS = [
  {
    id: 'mock-app-1',
    fullName: 'Ester Simon',
    email: 'estersimon@example.com',
    program: 'Health Tech Fellowship',
    experience: '4',
    intent: 'My mission is to integrate community-driven health technology in rural areas, improving medical access and training local practitioners.',
    status: 'Pending',
    createdAt: { toDate: () => new Date('2026-06-15T10:00:00Z') }
  },
  {
    id: 'mock-app-2',
    fullName: 'Kwame Mensah',
    email: 'kwamemensah@example.com',
    program: 'Climate Resilience Lab',
    experience: '6',
    intent: 'Developing scalable agricultural methods that are resilient to irregular rainfall patterns and rising temperatures in West Africa.',
    status: 'Selected',
    createdAt: { toDate: () => new Date('2026-06-12T14:30:00Z') }
  },
  {
    id: 'mock-app-3',
    fullName: 'Amara Diop',
    email: 'amaradiop@example.com',
    program: 'Gender Equality Summit',
    experience: '3',
    intent: 'To build networks of mentorship for young women in STEM fields across coastal regions, fostering local tech innovation hubs.',
    status: 'Rejected',
    createdAt: { toDate: () => new Date('2026-06-10T09:15:00Z') }
  },
  {
    id: 'mock-app-4',
    fullName: 'Kofi Owusu',
    email: 'kowusu@example.com',
    program: 'Humanitarian Logistics',
    experience: '8',
    intent: 'Streamlining supply chains for post-disaster response and vaccine delivery systems in remote communities using autonomous drones.',
    status: 'Pending',
    createdAt: { toDate: () => new Date('2026-06-08T16:45:00Z') }
  }
];

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

const AdminPortalPage = () => {
  const [adminView, setAdminView] = useState('applications'); // 'applications' or 'news'
  const [activeTab, setActiveTab] = useState('All');
  const [applicants, setApplicants] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newsFormData, setNewsFormData] = useState({
    title: '',
    category: 'Press Release',
    description: '',
    content: '',
    image: '',
    featured: false
  });
  const [isUsingMockApps, setIsUsingMockApps] = useState(false);
  const [isUsingMockNews, setIsUsingMockNews] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  // Set default selected applicant when applicants list loads
  useEffect(() => {
    if (applicants.length > 0 && !selectedApplicant) {
      setSelectedApplicant(applicants[0]);
    }
  }, [applicants, selectedApplicant]);

  useEffect(() => {
    // Listen to applications
    const qApps = query(collection(db, 'applications'), orderBy('createdAt', 'desc'));
    const unsubscribeApps = onSnapshot(qApps, 
      (snapshot) => {
        const apps = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setApplicants(apps);
        setIsUsingMockApps(false);
        setLoading(false);
      },
      (error) => {
        console.error("Firestore applications subscription error. Using local mock data:", error);
        setIsUsingMockApps(true);
        setApplicants(prev => prev && prev.length > 0 ? prev : MOCK_APPLICANTS);
        setLoading(false);
      }
    );

    // Listen to news
    const qNews = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
    const unsubscribeNews = onSnapshot(qNews, 
      (snapshot) => {
        const news = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setArticles(news);
        setIsUsingMockNews(false);
      },
      (error) => {
        console.error("Firestore news subscription error. Using local mock data:", error);
        setIsUsingMockNews(true);
        setArticles(prev => prev && prev.length > 0 ? prev : MOCK_ARTICLES);
      }
    );

    return () => {
      unsubscribeApps();
      unsubscribeNews();
    };
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    if (isUsingMockApps) {
      setApplicants(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
      if (selectedApplicant?.id === id) {
        setSelectedApplicant(prev => ({ ...prev, status: newStatus }));
      }
      return;
    }
    try {
      const docRef = doc(db, 'applications', id);
      await updateDoc(docRef, { status: newStatus });
      if (selectedApplicant?.id === id) {
        setSelectedApplicant(prev => ({ ...prev, status: newStatus }));
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status in Firestore (Permission Denied). Updating local view instead.");
      setApplicants(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
      if (selectedApplicant?.id === id) {
        setSelectedApplicant(prev => ({ ...prev, status: newStatus }));
      }
    }
  };

  const handleAddNews = async (e) => {
    e.preventDefault();
    
    // Simple URL validation
    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i;
    if (!urlPattern.test(newsFormData.image)) {
      alert("Please provide a valid image URL (must start with http/https and end with a common image extension).");
      return;
    }

    if (isUsingMockNews) {
      const newArticle = {
        id: `mock-news-${Date.now()}`,
        ...newsFormData,
        createdAt: { toDate: () => new Date() }
      };
      setArticles(prev => [newArticle, ...prev]);
      setNewsFormData({ title: '', category: 'Press Release', description: '', content: '', image: '', featured: false });
      setShowNewsForm(false);
      return;
    }

    try {
      await addDoc(collection(db, 'news'), {
        ...newsFormData,
        createdAt: serverTimestamp()
      });
      setNewsFormData({ title: '', category: 'Press Release', description: '', content: '', image: '', featured: false });
      setShowNewsForm(false);
    } catch (error) {
      console.error("Error adding news:", error);
      alert("Error publishing article to Firestore. Falling back to local draft.");
      const newArticle = {
        id: `mock-news-${Date.now()}`,
        ...newsFormData,
        createdAt: { toDate: () => new Date() }
      };
      setArticles(prev => [newArticle, ...prev]);
      setNewsFormData({ title: '', category: 'Press Release', description: '', content: '', image: '', featured: false });
      setShowNewsForm(false);
    }
  };

  const handleDeleteNews = async (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      if (isUsingMockNews) {
        setArticles(prev => prev.filter(art => art.id !== id));
        return;
      }
      try {
        await deleteDoc(doc(db, 'news', id));
      } catch (error) {
        console.error("Error deleting news:", error);
        alert("Failed to delete article in Firestore. Removing local view instead.");
        setArticles(prev => prev.filter(art => art.id !== id));
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case 'Pending': return 'bg-amber-100 text-amber-800';
      case 'Selected': return 'bg-emerald-100 text-emerald-800';
      case 'Rejected': return 'bg-rose-100 text-rose-800';
      default: return 'bg-surface-container text-on-surface';
    }
  };

  const filteredApplicants = useMemo(() => {
    let result = activeTab === 'All' 
      ? applicants 
      : applicants.filter(app => app.status === activeTab);
      
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(app => 
        app.fullName.toLowerCase().includes(term) || 
        app.email.toLowerCase().includes(term) || 
        app.program.toLowerCase().includes(term)
      );
    }
    return result;
  }, [applicants, activeTab, searchTerm]);

  const stats = useMemo(() => {
    const total = applicants.length;
    const pending = applicants.filter(a => a.status === 'Pending').length;
    const efficiency = total > 0 ? Math.round(((total - pending) / total) * 100) : 0;
    return { total, pending, efficiency };
  }, [applicants]);


  return (
    <div className="flex min-h-screen bg-[#f8f9f5] text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-primary/40 backdrop-blur-sm z-40 transition-opacity duration-500 lg:hidden ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 w-72 bg-primary text-on-primary z-50 flex flex-col shadow-2xl overflow-hidden transition-transform duration-500 lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Sidebar Background Accents */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-full -ml-16 -mb-16 blur-3xl"></div>

        <div className="p-8 relative z-10">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-on-primary flex items-center justify-center rounded-xl shadow-lg">
                <span className="material-symbols-outlined text-primary font-bold">orbit</span>
              </div>
              <h1 className="text-xl font-headline font-extrabold tracking-tight">owf.admin</h1>
            </div>
            <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden text-on-primary/60 hover:text-on-primary">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <nav className="space-y-2">
            <button 
              onClick={() => { setAdminView('applications'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${adminView === 'applications' ? 'bg-on-primary text-primary shadow-xl scale-[1.02]' : 'hover:bg-on-primary/10 text-on-primary/70 hover:text-on-primary'}`}
            >
              <span className="material-symbols-outlined">description</span>
              <span className="font-bold text-sm tracking-wide">Applications</span>
              {adminView === 'applications' && <div className="ml-auto w-1.5 h-1.5 bg-primary rounded-full"></div>}
            </button>
            <button 
              onClick={() => { setAdminView('news'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${adminView === 'news' ? 'bg-on-primary text-primary shadow-xl scale-[1.02]' : 'hover:bg-on-primary/10 text-on-primary/70 hover:text-on-primary'}`}
            >
              <span className="material-symbols-outlined">news</span>
              <span className="font-bold text-sm tracking-wide">News Dispatch</span>
              {adminView === 'news' && <div className="ml-auto w-1.5 h-1.5 bg-primary rounded-full"></div>}
            </button>
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-on-primary/10 relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed font-bold shadow-md">
              {currentUser?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold truncate">{currentUser?.email}</p>
              <p className="text-[10px] opacity-60 uppercase tracking-widest font-label">System Administrator</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-on-primary/10 hover:bg-rose-500/20 text-on-primary hover:text-rose-200 transition-all duration-300 font-bold text-xs uppercase tracking-widest group"
          >
            <span className="material-symbols-outlined text-sm group-hover:rotate-180 transition-transform duration-500">logout</span>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-72 min-h-screen p-6 md:p-12 transition-all duration-500">
        <div className="max-w-6xl mx-auto space-y-12">
          {adminView === 'applications' ? (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Header & Stats */}
              <header className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.3em] text-secondary uppercase font-label bg-secondary-fixed/30 px-3 py-1 rounded-full">Global Registry</span>
                    <h1 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight text-primary mt-4">Program Pipeline</h1>
                  </div>
                  <div className="flex gap-2 p-1 bg-surface-container-low rounded-xl border border-outline-variant/20 shadow-inner">
                    {['All', 'Pending', 'Selected', 'Rejected'].map((tab) => (
                      <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${activeTab === tab ? 'bg-primary text-on-primary shadow-md scale-105' : 'text-secondary hover:text-primary hover:bg-white'}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {loading ? (
                    <>
                      <StatSkeleton />
                      <StatSkeleton />
                      <StatSkeleton />
                    </>
                  ) : (
                    <>
                      <div className="p-8 bg-white rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 border border-outline-variant/10 relative overflow-hidden group transition-all duration-300 cursor-pointer">
                        <div className="relative z-10 flex flex-col h-full">
                          <div className="flex items-center justify-between">
                            <p className="text-secondary font-label text-[10px] font-bold uppercase tracking-[0.2em]">Active Submissions</p>
                            <span className="material-symbols-outlined text-primary bg-primary-container p-2 rounded-xl text-lg">folder_shared</span>
                          </div>
                          <h2 className="text-5xl font-headline font-extrabold text-primary mt-6 tracking-tight">{stats.total}</h2>
                          <div className="mt-auto pt-6 flex items-center gap-2 text-xs text-emerald-600 font-bold">
                            <span className="material-symbols-outlined text-sm">trending_up</span>
                            <span>+12% this month</span>
                          </div>
                        </div>
                        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                      </div>
                      
                      <div className="p-8 bg-white rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 border border-outline-variant/10 relative overflow-hidden group transition-all duration-300 cursor-pointer">
                        <div className="relative z-10 flex flex-col h-full">
                          <div className="flex items-center justify-between">
                            <p className="text-secondary font-label text-[10px] font-bold uppercase tracking-[0.2em]">Review Queue</p>
                            <span className="material-symbols-outlined text-amber-600 bg-amber-50 p-2 rounded-xl text-lg">pending_actions</span>
                          </div>
                          <h2 className="text-5xl font-headline font-extrabold text-amber-600 mt-6 tracking-tight">{stats.pending}</h2>
                          <div className="mt-auto pt-6">
                            <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden">
                              <div 
                                className="bg-amber-500 h-full transition-all duration-1000" 
                                style={{ width: `${stats.total > 0 ? (stats.pending / stats.total) * 100 : 0}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                      </div>

                      <div className="p-8 bg-primary text-on-primary rounded-[2rem] shadow-xl hover:shadow-2xl hover:-translate-y-1 border border-primary/10 relative overflow-hidden group transition-all duration-300 cursor-pointer">
                        <div className="relative z-10 flex flex-col h-full">
                          <div className="flex items-center justify-between">
                            <p className="font-label text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">Efficiency Rate</p>
                            <span className="material-symbols-outlined text-accent bg-white/10 p-2 rounded-xl text-lg">bolt</span>
                          </div>
                          <h2 className="text-5xl font-headline font-extrabold mt-6 tracking-tight">
                            {stats.efficiency}%
                          </h2>
                          <p className="mt-auto pt-6 text-[10px] font-bold uppercase tracking-widest opacity-80">Application Processing Speed</p>
                        </div>
                        <div className="absolute bottom-0 right-0 -br-8 -bb-8 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
                      </div>
                    </>
                  )}
                </div>
              </header>

              {/* Main Interaction Area */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
                {/* Table Section */}
                <div className="xl:col-span-7 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2">
                    <h3 className="text-lg font-headline font-bold text-primary flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary">list_alt</span>
                      Applicant Registry
                    </h3>
                    <div className="relative w-full sm:w-64">
                      <input 
                        type="text" 
                        placeholder="Search by name, email, program..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white border border-outline rounded-2xl pl-10 pr-10 py-2.5 text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-label shadow-sm animate-in fade-in"
                      />
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-base">search</span>
                      {searchTerm && (
                        <button 
                          onClick={() => setSearchTerm('')} 
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/5 border border-outline-variant/10">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-surface-container-lowest text-secondary font-label text-[10px] uppercase tracking-[0.2em]">
                            <th className="px-8 py-6 font-bold">Profile</th>
                            <th className="px-8 py-6 font-bold">Program</th>
                            <th className="px-8 py-6 font-bold">Status</th>
                            <th className="px-8 py-6 font-bold text-right">View</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-surface-container-low">
                          {loading ? (
                            <>
                              <TableRowSkeleton />
                              <TableRowSkeleton />
                              <TableRowSkeleton />
                              <TableRowSkeleton />
                              <TableRowSkeleton />
                            </>
                          ) : (
                            filteredApplicants.map((applicant, index) => (
                              <tr 
                                key={applicant.id} 
                                onClick={() => setSelectedApplicant(applicant)}
                                style={{ animationDelay: `${index * 50}ms` }}
                                className={`group cursor-pointer transition-all duration-500 hover:bg-surface-container-low animate-in fade-in slide-in-from-left-4 ${selectedApplicant?.id === applicant.id ? 'bg-surface-container-low' : ''}`}
                              >
                                <td className="px-8 py-6">
                                  <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold transition-all duration-500 group-hover:rotate-12 ${selectedApplicant?.id === applicant.id ? 'bg-primary text-on-primary' : 'bg-secondary-fixed/50 text-on-secondary-fixed'}`}>
                                      {applicant.fullName.charAt(0)}
                                    </div>
                                    <div>
                                      <p className="font-bold text-on-surface text-sm tracking-tight">{applicant.fullName}</p>
                                      <p className="text-[10px] text-secondary font-medium tracking-wide font-label uppercase">{applicant.email}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-8 py-6">
                                  <span className="text-xs font-bold text-secondary uppercase tracking-wider">{applicant.program}</span>
                                </td>
                                <td className="px-8 py-6">
                                  <span className={`inline-flex items-center px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm ${getStatusClasses(applicant.status)}`}>
                                    {applicant.status}
                                  </span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ml-auto transition-all duration-500 ${selectedApplicant?.id === applicant.id ? 'bg-primary text-white rotate-90 shadow-lg' : 'bg-surface-container group-hover:bg-primary group-hover:text-white'}`}>
                                    <span className="material-symbols-outlined text-sm font-bold">arrow_forward_ios</span>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Profile View Section */}
                <div className="xl:col-span-5 space-y-6 xl:sticky xl:top-12">
                  <h3 className="text-lg font-headline font-bold text-primary flex items-center gap-2 px-2">
                    <span className="material-symbols-outlined text-secondary">person_search</span>
                    Deep Intelligence
                  </h3>
                  {selectedApplicant ? (
                    <div className="bg-primary text-on-primary p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group border border-white/10">
                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-64 h-64 bg-on-primary/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-on-primary/10 transition-all duration-1000"></div>
                      
                      <div className="relative z-10 space-y-10">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-3xl font-headline font-extrabold tracking-tight">{selectedApplicant.fullName}</h4>
                            <p className="text-on-primary/60 font-label text-xs font-bold uppercase tracking-widest mt-2">{selectedApplicant.program} Candidate</p>
                          </div>
                          <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${selectedApplicant.status === 'Selected' ? 'bg-emerald-400 text-emerald-950' : selectedApplicant.status === 'Rejected' ? 'bg-rose-400 text-rose-950' : 'bg-white text-primary'}`}>
                            {selectedApplicant.status}
                          </div>
                        </div>

                        {/* Status Timeline */}
                        <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-primary/50 mb-6">Workflow Progress</p>
                          <div className="flex items-center justify-between relative">
                            {/* Horizontal Line behind */}
                            <div className="absolute top-4 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 z-0"></div>
                            
                            {/* Step 1: Received */}
                            <div className="flex flex-col items-center gap-2 relative z-10">
                              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-md">
                                <span className="material-symbols-outlined text-sm font-black">check</span>
                              </div>
                              <span className="text-[9px] font-bold uppercase tracking-wider text-on-primary/60">Received</span>
                            </div>

                            {/* Step 2: Under Review */}
                            <div className="flex flex-col items-center gap-2 relative z-10">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-md transition-all ${
                                selectedApplicant.status === 'Pending' 
                                  ? 'bg-accent text-primary animate-pulse' 
                                  : 'bg-emerald-500 text-white'
                              }`}>
                                {selectedApplicant.status === 'Pending' ? (
                                  <span className="material-symbols-outlined text-sm font-black">autorenew</span>
                                ) : (
                                  <span className="material-symbols-outlined text-sm font-black">check</span>
                                )}
                              </div>
                              <span className="text-[9px] font-bold uppercase tracking-wider text-on-primary/60 font-body">Reviewing</span>
                            </div>

                            {/* Step 3: Decision */}
                            <div className="flex flex-col items-center gap-2 relative z-10">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-md transition-all ${
                                selectedApplicant.status === 'Selected' 
                                  ? 'bg-emerald-400 text-emerald-950' 
                                  : selectedApplicant.status === 'Rejected' 
                                    ? 'bg-rose-400 text-rose-950' 
                                    : 'bg-white/20 text-on-primary/60'
                              }`}>
                                {selectedApplicant.status === 'Selected' ? (
                                  <span className="material-symbols-outlined text-sm font-black">celebration</span>
                                ) : selectedApplicant.status === 'Rejected' ? (
                                  <span className="material-symbols-outlined text-sm font-black">close</span>
                                ) : (
                                  <span className="material-symbols-outlined text-sm font-black">hourglass_empty</span>
                                )}
                              </div>
                              <span className="text-[9px] font-bold uppercase tracking-wider text-on-primary/60 font-body font-semibold">Decision</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-primary/50 mb-4">Mission Statement</p>
                            <p className="text-sm text-on-primary/90 leading-relaxed italic font-light">"{selectedApplicant.intent}"</p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-white/5 p-5 rounded-2xl border border-white/5 group/meta">
                              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-primary/40 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[12px]">history</span> Domain Exp
                              </p>
                              <p className="text-xl font-headline font-black mt-1 text-secondary-fixed">{selectedApplicant.experience} Years</p>
                            </div>
                            <div className="bg-white/5 p-5 rounded-2xl border border-white/5 group/meta">
                              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-primary/40 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[12px]">calendar_today</span> Received
                              </p>
                              <p className="text-xl font-headline font-black mt-1 text-secondary-fixed">
                                {selectedApplicant.createdAt?.toDate 
                                  ? selectedApplicant.createdAt.toDate().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
                                  : selectedApplicant.createdAt instanceof Date
                                    ? selectedApplicant.createdAt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
                                    : 'Recent'}
                              </p>
                            </div>
                            <div className="bg-white/5 p-5 rounded-2xl border border-white/5 group/meta col-span-full">
                              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-primary/40 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[12px]">mail</span> Direct Contact
                              </p>
                              <p className="text-sm font-bold mt-1 text-on-primary truncate">{selectedApplicant.email}</p>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 flex flex-col gap-4">
                          {selectedApplicant.fileUrl && (
                            <a 
                              href={selectedApplicant.fileUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="w-full flex items-center justify-center gap-3 py-4 bg-on-primary text-primary rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl hover:bg-secondary-fixed hover:scale-[1.02] transition-all duration-300"
                            >
                              <span className="material-symbols-outlined text-sm">download</span>
                              Extract Credentials (CV)
                            </a>
                          )}
                          
                          <div className="grid grid-cols-2 gap-4">
                            <button 
                              onClick={() => handleUpdateStatus(selectedApplicant.id, 'Selected')}
                              className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg transition-all duration-300 border border-white/20 cursor-pointer ${selectedApplicant.status === 'Selected' ? 'bg-emerald-500 text-white border-none' : 'bg-white/10 hover:bg-emerald-500/20 text-on-primary'}`}
                            >
                              Approve
                            </button>
                            <button 
                              onClick={() => handleUpdateStatus(selectedApplicant.id, 'Rejected')}
                              className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg transition-all duration-300 border border-white/20 cursor-pointer ${selectedApplicant.status === 'Rejected' ? 'bg-rose-500 text-white border-none' : 'bg-white/10 hover:bg-rose-500/20 text-on-primary'}`}
                            >
                              Disregard
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white p-12 rounded-[3rem] border border-dashed border-outline-variant/30 flex flex-col items-center justify-center text-center space-y-4">
                      <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-outline text-3xl">touch_app</span>
                      </div>
                      <p className="text-sm font-label text-secondary uppercase tracking-widest font-bold">Select a profile to review</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-700">
              <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                  <span className="text-[10px] font-bold tracking-[0.3em] text-secondary uppercase font-label bg-secondary-fixed/30 px-3 py-1 rounded-full">Editorial Control</span>
                  <h1 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight text-primary mt-4">Dispatch Studio</h1>
                </div>
                <div className="flex items-center gap-4">
                  <Link 
                    to="/" 
                    className="px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 text-primary border border-primary/20 hover:bg-primary/5 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">home</span>
                    View Site
                  </Link>
                  <button 
                    onClick={() => setShowNewsForm(!showNewsForm)}
                    className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 transition-all duration-500 shadow-xl ${showNewsForm ? 'bg-rose-500 text-white hover:bg-rose-600 rotate-0' : 'bg-primary text-white hover:shadow-primary/20 scale-105 hover:scale-110'}`}
                  >
                    <span className={`material-symbols-outlined transition-transform duration-500 ${showNewsForm ? 'rotate-90' : ''}`}>{showNewsForm ? 'close' : 'add'}</span>
                    {showNewsForm ? 'Close Studio' : 'Draft New Article'}
                  </button>
                </div>
              </header>

              {showNewsForm && (
                <div className="bg-white p-10 md:p-16 rounded-[3.5rem] shadow-2xl border border-outline-variant/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
                  
                  <form onSubmit={handleAddNews} className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary px-2">Article Headline</label>
                      <input 
                        required
                        value={newsFormData.title}
                        onChange={(e) => setNewsFormData({...newsFormData, title: e.target.value})}
                        className="bg-surface-container-low border-none rounded-2xl px-6 py-4 focus:ring-4 focus:ring-primary/10 outline-none text-primary font-bold transition-all duration-300 placeholder:text-outline-variant" 
                        placeholder="The evolution of sustainable..."
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary px-2">Publication Stream</label>
                      <select 
                        value={newsFormData.category}
                        onChange={(e) => setNewsFormData({...newsFormData, category: e.target.value})}
                        className="bg-surface-container-low border-none rounded-2xl px-6 py-4 focus:ring-4 focus:ring-primary/10 outline-none text-primary font-bold transition-all duration-300"
                      >
                        <option>Press Release</option>
                        <option>Impact</option>
                        <option>Technology</option>
                        <option>Community</option>
                        <option>Education</option>
                        <option>Strategic Report</option>
                        <option>In the Field</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 flex flex-col gap-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary px-2">Cover Asset (URL)</label>
                      <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex-1 w-full flex flex-col gap-2">
                          <input 
                            required
                            value={newsFormData.image}
                            onChange={(e) => setNewsFormData({...newsFormData, image: e.target.value})}
                            className="bg-surface-container-low border-none rounded-2xl px-6 py-4 w-full focus:ring-4 focus:ring-primary/10 outline-none text-primary font-medium transition-all duration-300 placeholder:text-outline-variant font-label" 
                            placeholder="https://images.unsplash.com/..."
                          />
                          <p className="text-[9px] text-secondary/60 px-2">Recommended: High-resolution landscape assets (16:9)</p>
                        </div>
                        {newsFormData.image && (
                          <div className="w-full md:w-32 h-20 rounded-xl overflow-hidden shadow-lg border border-outline-variant/20 animate-in zoom-in-95 duration-300">
                            <img src={newsFormData.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display='none'} />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="md:col-span-2 flex flex-col gap-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary px-2">Narrative Summary</label>
                      <textarea 
                        required
                        rows="3"
                        value={newsFormData.description}
                        onChange={(e) => setNewsFormData({...newsFormData, description: e.target.value})}
                        className="bg-surface-container-low border-none rounded-2xl px-6 py-4 focus:ring-4 focus:ring-primary/10 outline-none text-primary font-medium leading-relaxed transition-all duration-300 placeholder:text-outline-variant font-label" 
                        placeholder="Brief summary for cards..."
                      ></textarea>
                    </div>
                    <div className="md:col-span-2 flex flex-col gap-3">
                      <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary px-2">Article Body Content</label>
                      <textarea 
                        required
                        rows="8"
                        value={newsFormData.content}
                        onChange={(e) => setNewsFormData({...newsFormData, content: e.target.value})}
                        className="bg-surface-container-low border-none rounded-3xl px-8 py-6 focus:ring-4 focus:ring-primary/10 outline-none text-primary font-medium leading-relaxed transition-all duration-300 placeholder:text-outline-variant font-label" 
                        placeholder="Detailed article narrative..."
                      ></textarea>
                    </div>
                    <div className="flex items-center gap-4 px-2">
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          id="featured"
                          checked={newsFormData.featured}
                          onChange={(e) => setNewsFormData({...newsFormData, featured: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-14 h-7 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                        <label htmlFor="featured" className="ml-4 text-xs font-black uppercase tracking-widest text-primary">Priority Featured</label>
                      </div>
                    </div>
                    <div className="md:col-span-2 pt-6">
                      <button type="submit" className="w-full bg-primary text-on-primary py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:bg-primary/90 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-3">
                        <span className="material-symbols-outlined">publish</span>
                        Transmit Dispatch
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {articles.map((article) => (
                  <div key={article.id} className="bg-white rounded-[3rem] overflow-hidden group shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 border border-outline-variant/10">
                    <div className="relative h-64 overflow-hidden">
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="absolute top-6 right-6 flex gap-3">
                        {article.featured && (
                          <span className="bg-white/90 backdrop-blur-md text-primary text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-xl">Featured</span>
                        )}
                        <button 
                          onClick={() => handleDeleteNews(article.id)}
                          className="bg-rose-500/90 backdrop-blur-md text-white p-2 rounded-xl shadow-xl hover:bg-rose-600 hover:scale-110 transition-all duration-300"
                        >
                          <span className="material-symbols-outlined text-sm font-bold">delete_forever</span>
                        </button>
                      </div>

                      <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <p className="text-[10px] font-bold text-white/80 uppercase tracking-widest">
                          Modified {article.createdAt?.toDate 
                            ? article.createdAt.toDate().toLocaleDateString() 
                            : article.createdAt instanceof Date 
                              ? article.createdAt.toLocaleDateString() 
                              : 'Recent'}
                        </p>
                      </div>
                    </div>
                    <div className="p-8 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-secondary tracking-[0.2em] uppercase">{article.category}</span>
                      </div>
                      <h4 className="text-xl font-headline font-extrabold text-primary leading-tight line-clamp-2 group-hover:text-primary-container transition-colors duration-300">{article.title}</h4>
                      <p className="text-sm text-secondary line-clamp-2 font-medium leading-relaxed font-label italic">{article.description}</p>
                    </div>
                  </div>
                ))}
                {articles.length === 0 && (
                  <div className="col-span-full py-32 text-center bg-white rounded-[4rem] border-4 border-dashed border-outline-variant/20 flex flex-col items-center justify-center space-y-6">
                    <div className="w-20 h-20 bg-surface-container rounded-3xl flex items-center justify-center rotate-12">
                      <span className="material-symbols-outlined text-outline text-5xl">inventory_2</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg font-headline font-bold text-primary">The archive is empty</p>
                      <p className="text-sm text-secondary font-label uppercase tracking-widest font-bold">Ready for your first publication</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Toggle */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </div>
  );
};

export default AdminPortalPage;
