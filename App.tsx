
import React, { useState, useEffect } from 'react';
import { StorageService } from './services/storage';
import { User } from './types';
import Layout from './components/Layout';
import HomePage from './pages/Home';
import BlogDetailPage from './pages/BlogDetail';
import CategoryPage from './pages/Category';
import AboutPage from './pages/About';
import LoginPage from './pages/Login';
import AdminDashboard from './components/AdminDashboard';
import PrivacyPage from './pages/Privacy';
import TermsPage from './pages/Terms';

// --- ROUTER LOGIC ---

const HashRouter = ({ 
  render 
}: { 
  render: (route: string, params: string) => React.ReactNode 
}) => {
  const [route, setRoute] = useState('home');
  const [params, setParams] = useState('');

  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.slice(1) || 'home';
      const parts = hash.split('/');
      setRoute(parts[0]);
      setParams(parts.slice(1).join('/'));
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', parseHash);
    parseHash();
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  return <>{render(route, params)}</>;
};

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const user = StorageService.getCurrentUser();
    setCurrentUser(user);
  }, []);

  const handleNavigate = (path: string) => {
    window.location.hash = path;
  };

  const handleLogout = () => {
    StorageService.logout();
    setCurrentUser(null);
    handleNavigate('home');
  };

  return (
    <HashRouter 
      render={(route, params) => (
        <Layout onNavigate={handleNavigate} currentUser={currentUser} onLogout={handleLogout}>
            {(() => {
              switch(route) {
                case 'home':
                  return <HomePage onNavigate={handleNavigate} />;
                case 'blog':
                  return params ? <BlogDetailPage slug={params} onNavigate={handleNavigate} /> : <div className="text-center py-20">Post not found</div>;
                case 'blogs':
                  return <CategoryPage slug="all" onNavigate={handleNavigate} />;
                case 'category':
                  return params ? <CategoryPage slug={params} onNavigate={handleNavigate} /> : <div>Category not found</div>;
                case 'login':
                  return <LoginPage onLogin={(u) => { setCurrentUser(u); handleNavigate('admin'); }} />;
                case 'admin':
                   if (!currentUser || currentUser.role !== 'ADMIN') {
                     return <LoginPage onLogin={(u) => { setCurrentUser(u); handleNavigate('admin'); }} />;
                   }
                   return <AdminDashboard />;
                case 'about':
                  return <AboutPage />;
                case 'privacy':
                  return <PrivacyPage />;
                case 'terms':
                  return <TermsPage />;
                default:
                  return <div className="text-center py-32 text-gray-500">Page not found. <br /><span onClick={() => handleNavigate('home')} className="text-primary cursor-pointer underline mt-2 inline-block">Go Home</span></div>;
              }
            })()}
        </Layout>
      )}
    />
  );
}

export default App;