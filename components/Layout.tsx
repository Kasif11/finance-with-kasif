import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { User } from '../types';
import { ChevronDown } from './Icons'; // Reusing chevron, rotating it

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (page: string) => void;
  currentUser: User | null;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onNavigate, currentUser, onLogout }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans relative">
      <Navbar onNavigate={onNavigate} currentUser={currentUser} onLogout={onLogout} />
      {/* Main content area with fade-in animation for page transitions */}
      <main className="flex-grow pt-20 animate-fade-in min-h-[60vh]">
        {children}
      </main>
      <Footer onNavigate={onNavigate} />

      {/* Professional Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-secondary text-white p-3 rounded-full shadow-xl hover:bg-primary transition-all duration-300 z-50 animate-fade-in border border-white/10 group"
          title="Back to Top"
        >
          <div className="transform rotate-180 group-hover:-translate-y-1 transition-transform">
             <ChevronDown />
          </div>
        </button>
      )}
    </div>
  );
};

export default Layout;