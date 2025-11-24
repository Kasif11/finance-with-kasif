import React, { useState } from 'react';
import { StorageService } from '../services/storage';
import { User } from '../types';

const LoginPage = ({ onLogin }: { onLogin: (user: User) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Small artificial delay for UX smoothness if needed, or real network request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const user = await StorageService.login(email, password);
      if (user) {
        onLogin(user);
      } else {
        setError('Invalid credentials.');
        setLoading(false);
      }
    } catch (err) {
      setError('An error occurred during login.');
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 p-4">
       <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 mb-4">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect x="3" y="11" width="18" height="10" rx="2" ry="2"></rect><circle cx="12" cy="16" r="1"></circle><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <h2 className="text-2xl font-bold text-secondary font-serif">Finance with Kasif</h2>
            <p className="text-gray-500 mt-2">Sign in to manage your content</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-lg mb-6 text-sm flex items-start">
               <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="w-full p-3 border border-gray-300 bg-gray-50 text-gray-900 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="w-full p-3 border border-gray-300 bg-gray-50 text-gray-900 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                required 
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full bg-primary text-white py-3.5 rounded-lg font-bold shadow-lg hover:bg-emerald-600 transition-all transform active:scale-95 flex justify-center items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : 'Sign In'}
            </button>
          </form>
       </div>
    </div>
  );
};

export default LoginPage;