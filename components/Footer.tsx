import React, { useState } from 'react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }
    const adminEmail = 'kasif2005quamar@gmail.com';
    const subject = encodeURIComponent('New Newsletter Subscription - FK');
    const body = encodeURIComponent(`Hello,\n\nI would like to subscribe to the Finance with Kasif Weekly Digest.\n\nSubscriber Email: ${email}\n\nPlease add me to your mailing list.\n\nThanks!`);
    window.location.href = `mailto:${adminEmail}?subject=${subject}&body=${body}`;
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <footer className="bg-secondary text-slate-400 py-20 border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/10 pb-12 mb-12">
           <div className="md:col-span-5 space-y-6">
              <div className="flex items-center space-x-3">
                 <div className="relative w-10 h-10 flex items-center justify-center bg-primary rounded-lg shadow-lg">
                    <span className="font-serif font-black text-white text-xl">FK</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="font-serif font-bold text-white text-lg leading-none">Finance</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-medium mt-1 text-emerald-500">With Kasif</span>
                 </div>
              </div>
              <p className="text-sm leading-relaxed max-w-sm font-light text-slate-300">
                Democratizing financial literacy for Bharat. Bridging the gap between simple savings and long-term wealth creation with data-driven insights.
              </p>
           </div>
           
           <div className="md:col-span-3">
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Company</h4>
              <ul className="space-y-4 text-sm">
                <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => onNavigate('about')}>About Us</li>
                <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => onNavigate('privacy')}>Privacy Policy</li>
                <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => onNavigate('terms')}>Terms of Service</li>
                <li className="hover:text-primary cursor-pointer transition-colors" onClick={() => onNavigate('login')}>Admin Login</li>
              </ul>
           </div>

           <div className="md:col-span-4">
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Weekly Digest</h4>
              <form onSubmit={handleSubscribe} className="flex flex-col space-y-3">
                <div className="relative">
                   <input 
                     type="email" 
                     value={email}
                     onChange={(e) => { setEmail(e.target.value); if(status === 'error') setStatus('idle'); }}
                     placeholder="your@email.com" 
                     className={`w-full bg-white/5 border ${status === 'error' ? 'border-red-500' : 'border-white/10'} text-white px-4 py-3 rounded-lg outline-none focus:border-primary focus:bg-white/10 transition-all placeholder-white/30 text-sm`}
                   />
                </div>
                <button 
                  type="submit" 
                  className={`bg-primary text-white px-4 py-3 rounded-lg hover:bg-emerald-500 font-bold text-sm transition-all shadow-lg hover:shadow-primary/20 ${status === 'success' ? 'bg-emerald-800 cursor-default' : ''}`}
                  disabled={status === 'success'}
                >
                  {status === 'success' ? '✓ Request Sent' : 'Subscribe to Newsletter'}
                </button>
                {status === 'error' && <p className="text-red-400 text-xs">Please enter a valid email.</p>}
              </form>
           </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-xs font-medium text-slate-500">
           <p>© {new Date().getFullYear()} Finance with Kasif. All rights reserved.</p>
           <div className="flex space-x-6 mt-4 md:mt-0">
              <span>Made in India 🇮🇳</span>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;