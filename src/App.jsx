import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingState from './components/LoadingState';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

// Dynamic imports for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'));
const OurWorkPage = lazy(() => import('./pages/OurWorkPage'));
const NewsPortalPage = lazy(() => import('./pages/NewsPortalPage'));
const ProgramSignupPage = lazy(() => import('./pages/ProgramSignupPage'));
const AdminPortalPage = lazy(() => import('./pages/AdminPortalPage'));
const SupportPage = lazy(() => import('./pages/SupportPage'));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const LeadershipPage = lazy(() => import('./pages/LeadershipPage'));
const HowWeWorkPage = lazy(() => import('./pages/HowWeWorkPage'));
const DEIPage = lazy(() => import('./pages/DEIPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const OfficesPage = lazy(() => import('./pages/OfficesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const IdeasPage = lazy(() => import('./pages/IdeasPage'));
const MediaCenterPage = lazy(() => import('./pages/MediaCenterPage'));
const NewsArticlePage = lazy(() => import('./pages/NewsArticlePage'));
const VolunteersPage = lazy(() => import('./pages/VolunteersPage'));


const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there is a hash, let the browser handle scrolling to the element
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <Layout>
          <Suspense fallback={<LoadingState />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/our-work" element={<OurWorkPage />} />
              <Route path="/news" element={<NewsPortalPage />} />
              <Route path="/news/:articleId" element={<NewsArticlePage />} />
              <Route path="/signup" element={<ProgramSignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminPortalPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/thank-you" element={<ThankYouPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/leadership" element={<LeadershipPage />} />
              <Route path="/how-we-work" element={<HowWeWorkPage />} />
              <Route path="/dei" element={<DEIPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/offices" element={<OfficesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/ideas" element={<IdeasPage />} />
              <Route path="/media" element={<MediaCenterPage />} />
              <Route path="/volunteers" element={<VolunteersPage />} />

            </Routes>
          </Suspense>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;
