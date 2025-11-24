import React, { useState, useEffect, useRef } from 'react';
import { MenuIcon, XIcon, ChevronDown } from './Icons';
import { User, MOCK_CATEGORIES } from '../types';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentUser: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentUser, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

  const navLinkClass = `text-sm font-semibold tracking-wide transition-colors cursor-pointer ${isScrolled ? 'text-slate-600 hover:text-primary' : 'text-slate-300 hover:text-white'}`;
  const mobileNavLinkClass = "text-xl font-serif font-medium text-secondary hover:text-primary transition-colors duration-200 cursor-pointer";

  const featuredCategories = MOCK_CATEGORIES.slice(0, 5);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-gray-200 py-3' : 'bg-secondary border-white/5 py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-10">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => onNavigate('home')}>
             <div className="relative mr-3 w-10 h-10 flex items-center justify-center bg-primary rounded-lg shadow-lg group-hover:bg-emerald-500 transition-colors">
                <span className="font-serif font-black text-white text-xl tracking-tighter">FK</span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gold rounded-full border-2 border-secondary group-hover:border-primary transition-colors"></div>
             </div>
             <div className={`flex flex-col justify-center ${isScrolled ? 'text-secondary' : 'text-white'}`}>
                <span className="font-serif font-bold text-lg leading-none tracking-tight">Finance</span>
                <span className="text-[10px] uppercase tracking-[0.2em] opacity-80 font-sans mt-1">With Kasif</span>
             </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            <span onClick={() => onNavigate('home')} className={navLinkClass}>Home</span>
            
            {/* Categories Dropdown */}
            <div 
              className="relative group h-full flex items-center"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className={`flex items-center space-x-1 ${navLinkClass} outline-none group`}>
                <span>Topics</span>
                <span className={`transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''} opacity-70`}>
                  <ChevronDown />
                </span>
              </button>
              
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-6 w-64 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden animate-fade-in py-1 text-gray-800 ring-1 ring-black/5">
                   <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100"></div>
                   <div className="relative z-10 bg-white">
                      <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Market Segments
                      </div>
                      {featuredCategories.map(cat => (
                        <div 
                          key={cat.id}
                          onClick={() => { onNavigate(`category/${cat.slug}`); setIsDropdownOpen(false); }}
                          className="px-5 py-3 hover:bg-emerald-50 text-gray-700 hover:text-primary cursor-pointer text-sm font-medium transition-colors border-l-2 border-transparent hover:border-primary"
                        >
                          {cat.name}
                        </div>
                      ))}
                      <div className="h-px bg-gray-100 my-1"></div>
                      <div 
                        onClick={() => { onNavigate('blogs'); setIsDropdownOpen(false); }}
                        className="px-5 py-3 text-primary font-bold cursor-pointer text-sm transition-colors flex items-center justify-between hover:bg-gray-50"
                      >
                        Browse All Articles
                        <span className="text-lg leading-none">→</span>
                      </div>
                   </div>
                </div>
              )}
            </div>

            <span onClick={() => onNavigate('blogs')} className={navLinkClass}>Articles</span>
            <span onClick={() => onNavigate('about')} className={navLinkClass}>About</span>
            
            {currentUser ? (
              <div className="flex items-center space-x-4 pl-6 border-l border-gray-200/20 ml-2">
                <span onClick={() => onNavigate('admin')} className="text-emerald-500 font-semibold cursor-pointer hover:text-emerald-600 transition-colors text-sm">Dashboard</span>
                <button onClick={onLogout} className="text-xs text-red-500 hover:text-red-600 border border-red-200 px-3 py-1.5 rounded-full transition-colors">Sign Out</button>
              </div>
            ) : (
              <button 
                onClick={() => onNavigate('login')}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all transform hover:-translate-y-0.5 ${isScrolled ? 'bg-secondary text-white hover:bg-primary' : 'bg-white text-secondary hover:bg-gray-100'}`}
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Button */}
          <div className="flex items-center md:hidden">
             <button onClick={() => setIsOpen(!isOpen)} className={`p-2 rounded-md transition-colors ${isScrolled ? 'text-secondary hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}>
              {isOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-2xl animate-fade-in z-40 max-h-[90vh] overflow-y-auto">
          <div className="flex flex-col items-center py-12 space-y-8 px-6">
            <span onClick={() => { onNavigate('home'); setIsOpen(false); }} className={mobileNavLinkClass}>Home</span>
            
            {/* Mobile Categories Accordion */}
            <div className="w-full flex flex-col items-center">
               <div 
                 onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)}
                 className={`${mobileNavLinkClass} flex items-center space-x-2`}
               >
                 <span>Topics</span>
                 <span className={`transform transition-transform ${isMobileCategoryOpen ? 'rotate-180' : ''} opacity-50`}><ChevronDown /></span>
               </div>
               
               {isMobileCategoryOpen && (
                 <div className="flex flex-col items-center space-y-4 mt-6 w-full bg-slate-50 py-6 rounded-2xl border border-slate-100 animate-slide-up">
                    {featuredCategories.map(cat => (
                      <span 
                        key={cat.id}
                        onClick={() => { onNavigate(`category/${cat.slug}`); setIsOpen(false); }}
                        className="text-slate-600 hover:text-primary font-medium text-base"
                      >
                        {cat.name}
                      </span>
                    ))}
                    <span 
                      onClick={() => { onNavigate('blogs'); setIsOpen(false); }}
                      className="text-primary font-bold pt-4 border-t border-slate-200 w-2/3 text-center text-sm uppercase tracking-wide"
                    >
                      View All
                    </span>
                 </div>
               )}
            </div>

            <span onClick={() => { onNavigate('blogs'); setIsOpen(false); }} className={mobileNavLinkClass}>Articles</span>
            <span onClick={() => { onNavigate('about'); setIsOpen(false); }} className={mobileNavLinkClass}>About</span>
            {currentUser ? (
              <div className="flex flex-col items-center space-y-4 pt-6 w-full border-t border-gray-100">
                <span onClick={() => { onNavigate('admin'); setIsOpen(false); }} className="text-base font-bold text-emerald-600">Dashboard</span>
                <span onClick={onLogout} className="text-sm font-medium text-red-500 cursor-pointer">Log Out</span>
              </div>
            ) : (
              <div className="pt-6 w-full border-t border-gray-100 flex justify-center">
                <span onClick={() => { onNavigate('login'); setIsOpen(false); }} className="bg-secondary text-white px-8 py-3 rounded-xl font-bold">Sign In</span>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;