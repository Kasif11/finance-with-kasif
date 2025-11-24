import React, { useEffect, useState } from 'react';
import { StorageService } from '../services/storage';
import BlogCard from '../components/BlogCard';
import { MOCK_CATEGORIES, BlogPost } from '../types';
import { ChevronRight } from '../components/Icons';

const HomePage = ({ onNavigate }: { onNavigate: (path: string) => void }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
        const data = await StorageService.getPosts();
        setPosts(data);
        setLoading(false);
    };
    loadData();
  }, []);

  const featured = posts[0];

  const handleExternalLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-secondary relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-primary rounded-full filter blur-[120px] translate-x-1/3 -translate-y-1/3"></div>
           <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-blue-900 rounded-full filter blur-[100px] -translate-x-1/3 translate-y-1/3"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 w-full relative z-10 pt-20 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="animate-slide-up">
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-8">
                   <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                   <span className="text-emerald-300 text-xs font-bold tracking-widest uppercase">The #1 Personal Finance Blog</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-serif font-black text-white mb-8 leading-[1.1] tracking-tight">
                  Invest with <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">Confidence.</span>
                </h1>
                
                <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-lg font-light">
                  Unbiased, data-driven financial insights for the modern Indian investor. From SIPs to Stock Analysis, we decode the market so you don't have to.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => onNavigate('category/investing')} className="bg-primary hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-glow hover:-translate-y-1 text-sm tracking-wide">
                    Start Your Journey
                  </button>
                  <button onClick={() => onNavigate('about')} className="bg-transparent hover:bg-white/5 text-white border border-white/20 px-8 py-4 rounded-xl font-bold transition-all hover:-translate-y-1 text-sm tracking-wide flex items-center justify-center">
                    Our Philosophy <span className="ml-2">→</span>
                  </button>
                </div>

                <div className="mt-16 pt-8 border-t border-white/10 flex items-center space-x-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                   {/* Trusted By Logos (Mock) */}
                   <span className="text-white/50 text-sm font-semibold uppercase tracking-widest">Featured In</span>
                   <div className="h-8 w-20 bg-white/20 rounded"></div>
                   <div className="h-8 w-20 bg-white/20 rounded"></div>
                   <div className="h-8 w-20 bg-white/20 rounded"></div>
                </div>
             </div>

             <div className="hidden lg:block relative">
                {/* 3D Card Illustration */}
                <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700">
                   <div className="flex justify-between items-center mb-8">
                      <div>
                         <p className="text-gray-400 text-sm">Portfolio Value</p>
                         <h3 className="text-3xl font-bold text-white">₹ 24,50,000</h3>
                      </div>
                      <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-lg text-sm font-bold">+18.2%</div>
                   </div>
                   <div className="space-y-4">
                      <div className="h-3 bg-white/10 rounded-full w-3/4"></div>
                      <div className="h-3 bg-white/10 rounded-full w-full"></div>
                      <div className="h-3 bg-white/10 rounded-full w-5/6"></div>
                   </div>
                   <div className="mt-8 flex justify-between items-end h-32 space-x-4 opacity-80">
                      <div className="w-1/5 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg h-[40%]"></div>
                      <div className="w-1/5 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg h-[60%]"></div>
                      <div className="w-1/5 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg h-[50%]"></div>
                      <div className="w-1/5 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg h-[80%]"></div>
                      <div className="w-1/5 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg h-[100%]"></div>
                   </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold rounded-full opacity-20 blur-2xl"></div>
             </div>
          </div>
        </div>
      </section>

      {/* Featured Section (Magazine Style) */}
      {featured && !loading && (
        <section className="py-24 bg-surface">
           <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 items-center">
                 <div className="lg:col-span-8 relative group cursor-pointer" onClick={() => onNavigate(`blog/${featured.slug}`)}>
                    <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[16/9] relative">
                       <img src={featured.coverImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Featured" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                       <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                          <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded mb-4 inline-block uppercase tracking-wider">{featured.category}</span>
                          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight group-hover:underline decoration-primary decoration-2 underline-offset-8">
                             {featured.title}
                          </h2>
                          <div className="flex items-center text-gray-300 text-sm font-medium space-x-6">
                             <span>By {featured.author || 'Kasif'}</span>
                             <span>{new Date(featured.publishedAt).toLocaleDateString()}</span>
                          </div>
                       </div>
                    </div>
                 </div>
                 
                 {/* Sidebar / Teasers */}
                 <div className="lg:col-span-4 mt-8 lg:mt-0 flex flex-col justify-center space-y-8 pl-0 lg:pl-8">
                    <div>
                       <h3 className="text-secondary font-bold uppercase tracking-widest text-xs mb-6 border-b border-gray-200 pb-2">Trending Now</h3>
                       {posts.slice(1, 4).map((post) => (
                          <div key={post.id} onClick={() => onNavigate(`blog/${post.slug}`)} className="group cursor-pointer mb-6 last:mb-0">
                             <div className="text-xs text-primary font-bold mb-1">{post.category}</div>
                             <h4 className="font-serif font-bold text-lg text-slate-800 group-hover:text-primary transition-colors leading-snug mb-2">
                                {post.title}
                             </h4>
                             <p className="text-xs text-gray-400">{post.readTime} min read</p>
                          </div>
                       ))}
                    </div>
                    <button onClick={() => onNavigate('blogs')} className="text-primary font-bold text-sm hover:underline decoration-2 underline-offset-4 self-start">
                       View All Articles →
                    </button>
                 </div>
              </div>
           </div>
        </section>
      )}

      {/* Market Decoded (Professional Grid) */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
           <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-serif font-bold text-secondary mb-4">The Market Decoded</h2>
              <p className="text-slate-500 text-lg">Essential pillars of modern investing, simplified for you.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                 { title: 'Equity', desc: 'Direct ownership in businesses.', color: 'bg-blue-50 text-blue-600', link: 'https://www.nseindia.com/', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
                 { title: 'Mutual Funds', desc: 'Expertly managed baskets.', color: 'bg-green-50 text-green-600', link: 'https://www.nseindia.com/static/products-services/mf-about-mfss', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                 { title: 'IPOs', desc: 'Early access to public listings.', color: 'bg-purple-50 text-purple-600', link: 'https://www.nseindia.com/market-data/all-upcoming-issues-ipo', icon: 'M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z' },
                 { title: 'Market Data', desc: 'Real-time charts & analysis.', color: 'bg-orange-50 text-orange-600', link: 'https://www.nseindia.com/market-data/52-week-high-equity-market', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
              ].map((item, idx) => (
                 <div key={idx} onClick={() => handleExternalLink(item.link)} className="group p-8 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer bg-white relative overflow-hidden">
                    <div className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                       <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-500 text-sm mb-6">{item.desc}</p>
                    <span className="text-sm font-bold text-slate-900 flex items-center group-hover:text-primary transition-colors">
                       Learn More <ChevronRight />
                    </span>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-full -mr-12 -mt-12 transition-all group-hover:bg-primary/5"></div>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* Compounding Section (Modern) */}
      <section className="py-24 bg-secondary text-white overflow-hidden relative">
         <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-16">
               <div className="md:w-1/2">
                  <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Wealth Strategy</h2>
                  <h3 className="text-4xl font-serif font-bold mb-6">The Power of <br/><span className="text-emerald-400 italic">Compound Interest</span></h3>
                  <p className="text-slate-300 text-lg mb-8 leading-relaxed font-light">
                     Albert Einstein called it the "eighth wonder of the world". He who understands it, earns it; he who doesn't, pays it.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                     <div>
                        <div className="text-3xl font-bold text-white mb-1">30%</div>
                        <div className="text-sm text-gray-400">Avg. SIP Returns (5yr)</div>
                     </div>
                     <div>
                        <div className="text-3xl font-bold text-white mb-1">15x</div>
                        <div className="text-sm text-gray-400">Growth Potential</div>
                     </div>
                  </div>
               </div>

               <div className="md:w-1/2 w-full">
                  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                     <div className="flex items-end justify-between h-64 space-x-6 px-4">
                        {[
                           { val: '20%', label: 'Year 1' },
                           { val: '35%', label: 'Year 5' },
                           { val: '55%', label: 'Year 10' },
                           { val: '100%', label: 'Year 20' },
                        ].map((bar, i) => (
                           <div key={i} className="flex-1 flex flex-col justify-end h-full group">
                              <div className={`w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-sm transition-all duration-1000 group-hover:to-emerald-300 relative`} style={{ height: bar.val }}>
                                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-white text-secondary px-2 py-1 rounded">
                                    {bar.val}
                                 </div>
                              </div>
                              <div className="text-center text-xs text-gray-400 mt-4 font-medium">{bar.label}</div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Blog Grid Section */}
      <section className="py-24 bg-surface">
         <div className="max-w-7xl mx-auto px-4 text-center mb-16">
            <h2 className="text-3xl font-bold font-serif text-secondary mb-4">Latest Insights</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
         </div>
         <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {posts.slice(0, 6).map(post => (
                  <BlogCard key={post.id} post={post} onClick={(slug) => onNavigate(`blog/${slug}`)} />
               ))}
            </div>
            
            <div className="mt-16 text-center">
               <button 
                 onClick={() => onNavigate('blogs')}
                 className="bg-white border border-gray-200 text-secondary hover:bg-secondary hover:text-white px-10 py-4 rounded-xl font-bold transition-all shadow-soft hover:shadow-xl uppercase tracking-widest text-xs"
               >
                 View All Articles
               </button>
            </div>
         </div>
      </section>
    </>
  );
};

export default HomePage;