// import React, { useEffect, useState, useMemo } from 'react';
// import { StorageService } from '../services/storage';
// import BlogCard from '../components/BlogCard';
// import { TwitterIcon, LinkedInIcon, FacebookIcon, ThumbsUpIcon, ThumbsDownIcon } from '../components/Icons';
// import { BlogPost } from '../types';

// const BlogDetailPage = ({ slug, onNavigate }: { slug: string, onNavigate: (path: string) => void }) => {
//   const [post, setPost] = useState<BlogPost | undefined>(undefined);
//   const [related, setRelated] = useState<BlogPost[]>([]);
//   const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null);
//   const [scrollProgress, setScrollProgress] = useState(0);

//   useEffect(() => {
//     const fetchPost = async () => {
//         const fetchedPost = await StorageService.getPostBySlug(slug);
//         setPost(fetchedPost);
//         window.scrollTo(0, 0);

//         if (fetchedPost) {
//           const savedVote = localStorage.getItem(`vote_${fetchedPost.id}`);
//           if (savedVote === 'like' || savedVote === 'dislike') {
//             setUserVote(savedVote);
//           } else {
//             setUserVote(null);
//           }
          
//           const allPosts = await StorageService.getPosts();
//           const relatedPosts = allPosts
//             .filter(p => p.category === fetchedPost.category && p.id !== fetchedPost.id)
//             .slice(0, 3);
//           setRelated(relatedPosts);
//         }
//     }
//     fetchPost();
//   }, [slug]);

//   useEffect(() => {
//     const handleScroll = () => {
//       const totalScroll = document.documentElement.scrollTop;
//       const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
//       if (windowHeight > 0) {
//         const scroll = totalScroll / windowHeight;
//         setScrollProgress(scroll);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const enhancedContent = useMemo(() => {
//     if (!post) return '';
//     let content = post.content;
    
//     // Add Drop Cap class to the first paragraph
//     content = content.replace('<p>', '<p class="first-letter:float-left first-letter:text-5xl first-letter:pr-3 first-letter:font-serif first-letter:font-bold first-letter:text-secondary">');

//     const GLOSSARY: Record<string, string> = {
//       "SIP": "Systematic Investment Plan: A disciplined approach to investing a fixed sum regularly.",
//       "Mutual Funds": "Investment vehicles that pool money from many investors to buy securities.",
//       "Index Funds": "Mutual funds that mimic a stock market index like Nifty 50 or Sensex.",
//       "Nifty 50": "Benchmark Indian stock market index representing the weighted average of 50 largest Indian companies.",
//       "Digital Gold": "A virtual way of buying and holding pure gold without storage worries.",
//       "Recurring Deposit": "A term deposit offered by banks where you deposit a fixed amount every month.",
//       "CIBIL": "Credit Information Bureau (India) Limited: A score that reflects your creditworthiness.",
//       "FD": "Fixed Deposit: A safe investment with guaranteed returns.",
//       "IPO": "Initial Public Offering: When a private company lists shares on the stock market.",
//       "Equity": "Ownership in a company, usually via stocks.",
//       "Compounding": "Earning interest on both the principal and accumulated interest.",
//       "Inflation": "The rate at which prices for goods and services rise.",
//       "Portfolio": "A collection of financial investments like stocks, bonds, and cash equivalents.",
//       "Asset Allocation": "Dividing investments among different categories like stocks, bonds, and cash.",
//       "Expense Ratio": "The annual fee charged by mutual funds to manage your money.",
//       "Dividend": "A distribution of profits by a corporation to its shareholders."
//     };

//     const terms = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);

//     terms.forEach(term => {
//         const regex = new RegExp(`\\b(${term})\\b(?![^<]*>)`, 'g');
//         content = content.replace(regex, (match) => 
//             `<span class="group relative cursor-help border-b border-dashed border-emerald-400 hover:bg-emerald-50 transition-colors inline-block text-secondary font-medium">
//                 ${match}
//                 <span class="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-secondary text-white text-xs p-4 rounded-lg shadow-xl z-50 transition-all duration-200 pointer-events-none text-center leading-relaxed">
//                     <span class="font-bold block mb-1 text-primary uppercase tracking-wider text-[10px]">Definition</span>
//                     <span class="block text-gray-200 font-serif italic">${GLOSSARY[term]}</span>
//                     <svg class="absolute top-full left-1/2 -translate-x-1/2 -mt-px text-secondary h-2 w-4 fill-current" viewBox="0 0 255 255"><polygon points="0,0 127.5,127.5 255,0"/></svg>
//                 </span>
//             </span>`
//         );
//     });

//     return content;
//   }, [post]);
  
//   if (!post) return <div className="text-center py-32 text-xl text-gray-500 font-serif">Post not found.</div>;
  
//   const handleShare = (platform: string) => {
//     const url = encodeURIComponent(window.location.href);
//     const text = encodeURIComponent(post.title);
//     let shareLink = '';

//     switch (platform) {
//       case 'twitter': shareLink = `https://twitter.com/intent/tweet?text=${text}&url=${url}`; break;
//       case 'linkedin': shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`; break;
//       case 'facebook': shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`; break;
//     }

//     if (shareLink) window.open(shareLink, '_blank', 'width=600,height=400');
//   };

//   const handleVote = async (type: 'like' | 'dislike') => {
//     if (!post) return;
//     let updatedPost: BlogPost | undefined;

//     if (userVote === type) {
//       updatedPost = await StorageService.interactWithPost(post.id, type === 'like' ? 'unlike' : 'undislike');
//       setUserVote(null);
//       localStorage.removeItem(`vote_${post.id}`);
//     } else if (userVote) {
//       await StorageService.interactWithPost(post.id, userVote === 'like' ? 'unlike' : 'undislike');
//       updatedPost = await StorageService.interactWithPost(post.id, type);
//       setUserVote(type);
//       localStorage.setItem(`vote_${post.id}`, type);
//     } else {
//       updatedPost = await StorageService.interactWithPost(post.id, type);
//       setUserVote(type);
//       localStorage.setItem(`vote_${post.id}`, type);
//     }

//     if (updatedPost) setPost(updatedPost);
//   };

//   return (
//     <article className="bg-slate-50 min-h-screen">
//       {/* Progress Bar */}
//       <div className="fixed top-0 left-0 h-1 bg-primary z-50 transition-all duration-100 ease-out" style={{ width: `${scrollProgress * 100}%` }}></div>

//       {/* Hero Header */}
//       <div className="relative bg-secondary pt-32 pb-40 px-4 overflow-hidden">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(5,150,105,0.2),transparent_50%)]"></div>
        
//         <div className="max-w-4xl mx-auto relative z-20 text-center">
//           <div className="flex justify-center items-center space-x-3 mb-8 text-xs font-bold text-emerald-200 tracking-widest uppercase flex-wrap">
//              <span onClick={() => onNavigate('home')} className="cursor-pointer hover:text-white transition-colors border-b border-transparent hover:border-white">Home</span>
//              <span className="text-white/20">/</span>
//              <span onClick={() => onNavigate(`category/${post.category.toLowerCase()}`)} className="cursor-pointer hover:text-white transition-colors border-b border-transparent hover:border-white">{post.category}</span>
//           </div>
//           <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight">{post.title}</h1>
          
//           <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-slate-300 font-medium">
//              {/* <div className="flex items-center space-x-2">
//                 <img src={`https://ui-avatars.com/api/?name=${post.author}&background=d1fae5&color=065f46`} alt="Author" className="w-8 h-8 rounded-full border border-white/20" />
//                 <span>By {post.author}</span>
//              </div> */}
//              <span className="hidden md:block w-1 h-1 bg-gray-500 rounded-full"></span>
//              <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
//              <span className="hidden md:block w-1 h-1 bg-gray-500 rounded-full"></span>
//              <span>{post.readTime} min read</span>
//           </div>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="max-w-3xl mx-auto px-4 relative z-30 -mt-24">
//          {post.coverImage && (
//             <div className="rounded-xl overflow-hidden shadow-2xl mb-12 bg-gray-200 aspect-video">
//                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
//             </div>
//          )}

//          <div className="bg-white p-8 md:p-14 rounded-xl shadow-soft border border-gray-100 mb-16 overflow-hidden">
//             <div className="prose prose-lg prose-slate max-w-none font-serif leading-8 break-words" dangerouslySetInnerHTML={{__html: enhancedContent}} />
//          </div>
         
//          {/* Interaction & Author Box */}
//          <div className="max-w-3xl mx-auto mb-20 space-y-8">
//             {/* Voting */}
//             <div className="flex justify-center gap-4">
//                <button onClick={() => handleVote('like')} className={`flex items-center gap-2 px-6 py-3 rounded-full border font-bold transition-all ${userVote === 'like' ? 'bg-emerald-50 border-primary text-primary' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}>
//                  <ThumbsUpIcon /> {post.likes || 0}
//                </button>
//                <button onClick={() => handleVote('dislike')} className={`flex items-center gap-2 px-6 py-3 rounded-full border font-bold transition-all ${userVote === 'dislike' ? 'bg-red-50 border-red-500 text-red-500' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}>
//                  <ThumbsDownIcon /> {post.dislikes || 0}
//                </button>
//             </div>

//             {/* Author Bio */}
//             {/* <div className="bg-white p-8 rounded-xl border border-gray-100 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-sm">
//                 <img src={`https://ui-avatars.com/api/?name=${post.author}&size=128&background=022c22&color=fff`} className="w-20 h-20 rounded-full flex-shrink-0" alt="Author" />
//                 <div className="text-center md:text-left">
//                    <h3 className="text-lg font-bold text-secondary mb-2">Written by {post.author}</h3>
//                    <p className="text-gray-500 text-sm mb-4 leading-relaxed">Financial Analyst and Content Creator. Dedicated to simplifying complex market concepts for the everyday Indian investor. Passionate about wealth creation through SIPs and long-term equity.</p>
//                    <div className="flex justify-center md:justify-start gap-4">
//                       <button className="text-gray-400 hover:text-blue-500 transition-colors"><TwitterIcon /></button>
//                       <button className="text-gray-400 hover:text-blue-700 transition-colors"><LinkedInIcon /></button>
//                    </div>
//                 </div>
//             </div> */}

//             {/* Share & Tags */}
//             <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-gray-200 pt-8 w-full">
//                <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full md:w-auto">
//                  {post.tags.map(tag => (
//                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-xs font-bold uppercase tracking-wide hover:bg-gray-200 cursor-pointer">#{tag}</span>
//                  ))}
//                </div>
//                <div className="flex flex-wrap gap-4 justify-center w-full md:w-auto">
//                   <span className="text-xs font-bold text-gray-400 uppercase tracking-widest pt-2 flex-shrink-0">Share</span>
//                   <button onClick={() => handleShare('twitter')} className="p-2 rounded-full bg-white border border-gray-200 hover:border-primary hover:text-primary transition-all"><TwitterIcon /></button>
//                   <button onClick={() => handleShare('linkedin')} className="p-2 rounded-full bg-white border border-gray-200 hover:border-primary hover:text-primary transition-all"><LinkedInIcon /></button>
//                   <button onClick={() => handleShare('facebook')} className="p-2 rounded-full bg-white border border-gray-200 hover:border-primary hover:text-primary transition-all"><FacebookIcon /></button>
//                </div>
//             </div>
//          </div>
//       </div>

//       {/* Related Posts */}
//       {related.length > 0 && (
//         <div className="bg-white py-20 border-t border-gray-100">
//           <div className="max-w-7xl mx-auto px-4">
//             <h3 className="text-2xl font-bold mb-10 text-secondary font-serif">More on this topic</h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                {related.map(p => (
//                  <BlogCard key={p.id} post={p} onClick={(s) => onNavigate(`blog/${s}`)} />
//                ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </article>
//   );
// };

// export default BlogDetailPage;




import React, { useEffect, useState, useMemo } from 'react';
import { StorageService } from '../services/storage';
import BlogCard from '../components/BlogCard';
import SEO from '../components/SEO'; // Import SEO
import { TwitterIcon, LinkedInIcon, FacebookIcon, ThumbsUpIcon, ThumbsDownIcon } from '../components/Icons';
import { BlogPost } from '../types';

const BlogDetailPage = ({ slug, onNavigate }: { slug: string, onNavigate: (path: string) => void }) => {
  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
        const fetchedPost = await StorageService.getPostBySlug(slug);
        setPost(fetchedPost);
        window.scrollTo(0, 0);

        if (fetchedPost) {
          const savedVote = localStorage.getItem(`vote_${fetchedPost.id}`);
          if (savedVote === 'like' || savedVote === 'dislike') {
            setUserVote(savedVote);
          } else {
            setUserVote(null);
          }
          
          const allPosts = await StorageService.getPosts();
          const relatedPosts = allPosts
            .filter(p => p.category === fetchedPost.category && p.id !== fetchedPost.id)
            .slice(0, 3);
          setRelated(relatedPosts);
        }
    }
    fetchPost();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scroll = totalScroll / windowHeight;
        setScrollProgress(scroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const enhancedContent = useMemo(() => {
    if (!post) return '';
    let content = post.content;
    
    // Add Drop Cap class to the first paragraph
    content = content.replace('<p>', '<p class="first-letter:float-left first-letter:text-5xl first-letter:pr-3 first-letter:font-serif first-letter:font-bold first-letter:text-secondary">');

    const GLOSSARY: Record<string, string> = {
      "SIP": "Systematic Investment Plan: A disciplined approach to investing a fixed sum regularly.",
      "Mutual Funds": "Investment vehicles that pool money from many investors to buy securities.",
      "Index Funds": "Mutual funds that mimic a stock market index like Nifty 50 or Sensex.",
      "Nifty 50": "Benchmark Indian stock market index representing the weighted average of 50 largest Indian companies.",
      "Digital Gold": "A virtual way of buying and holding pure gold without storage worries.",
      "Recurring Deposit": "A term deposit offered by banks where you deposit a fixed amount every month.",
      "CIBIL": "Credit Information Bureau (India) Limited: A score that reflects your creditworthiness.",
      "FD": "Fixed Deposit: A safe investment with guaranteed returns.",
      "IPO": "Initial Public Offering: When a private company lists shares on the stock market.",
      "Equity": "Ownership in a company, usually via stocks.",
      "Compounding": "Earning interest on both the principal and accumulated interest.",
      "Inflation": "The rate at which prices for goods and services rise.",
      "Portfolio": "A collection of financial investments like stocks, bonds, and cash equivalents.",
      "Asset Allocation": "Dividing investments among different categories like stocks, bonds, and cash.",
      "Expense Ratio": "The annual fee charged by mutual funds to manage your money.",
      "Dividend": "A distribution of profits by a corporation to its shareholders."
    };

    const terms = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);

    terms.forEach(term => {
        const regex = new RegExp(`\\b(${term})\\b(?![^<]*>)`, 'g');
        content = content.replace(regex, (match) => 
            `<span class="group relative cursor-help border-b border-dashed border-emerald-400 hover:bg-emerald-50 transition-colors inline-block text-secondary font-medium">
                ${match}
                <span class="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-secondary text-white text-xs p-4 rounded-lg shadow-xl z-50 transition-all duration-200 pointer-events-none text-center leading-relaxed">
                    <span class="font-bold block mb-1 text-primary uppercase tracking-wider text-[10px]">Definition</span>
                    <span class="block text-gray-200 font-serif italic">${GLOSSARY[term]}</span>
                    <svg class="absolute top-full left-1/2 -translate-x-1/2 -mt-px text-secondary h-2 w-4 fill-current" viewBox="0 0 255 255"><polygon points="0,0 127.5,127.5 255,0"/></svg>
                </span>
            </span>`
        );
    });

    return content;
  }, [post]);
  
  if (!post) return <div className="text-center py-32 text-xl text-gray-500 font-serif">Post not found.</div>;
  
  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.title);
    let shareLink = '';

    switch (platform) {
      case 'twitter': shareLink = `https://twitter.com/intent/tweet?text=${text}&url=${url}`; break;
      case 'linkedin': shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`; break;
      case 'facebook': shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`; break;
    }

    if (shareLink) window.open(shareLink, '_blank', 'width=600,height=400');
  };

  const handleVote = async (type: 'like' | 'dislike') => {
    if (!post) return;
    let updatedPost: BlogPost | undefined;

    if (userVote === type) {
      updatedPost = await StorageService.interactWithPost(post.id, type === 'like' ? 'unlike' : 'undislike');
      setUserVote(null);
      localStorage.removeItem(`vote_${post.id}`);
    } else if (userVote) {
      await StorageService.interactWithPost(post.id, userVote === 'like' ? 'unlike' : 'undislike');
      updatedPost = await StorageService.interactWithPost(post.id, type);
      setUserVote(type);
      localStorage.setItem(`vote_${post.id}`, type);
    } else {
      updatedPost = await StorageService.interactWithPost(post.id, type);
      setUserVote(type);
      localStorage.setItem(`vote_${post.id}`, type);
    }

    if (updatedPost) setPost(updatedPost);
  };

  // Article Schema for Google
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.coverImage,
    "editor": post.author,
    "genre": post.category,
    "keywords": post.tags.join(" "),
    "url": window.location.href,
    "datePublished": post.publishedAt,
    "dateCreated": post.publishedAt,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Finance with Kasif",
      "logo": {
        "@type": "ImageObject",
        "url": "https://api.iconify.design/heroicons:banknotes-solid.svg?color=%23059669"
      }
    }
  };

  return (
    <article className="bg-slate-50 min-h-screen">
      {/* Dynamic SEO */}
      <SEO 
        title={post.title}
        description={post.excerpt}
        keywords={post.tags}
        image={post.coverImage}
        type="article"
        publishedAt={post.publishedAt}
        author={post.author}
        schema={articleSchema}
      />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-primary z-50 transition-all duration-100 ease-out" style={{ width: `${scrollProgress * 100}%` }}></div>

      {/* Hero Header */}
      <div className="relative bg-secondary pt-32 pb-40 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(5,150,105,0.2),transparent_50%)]"></div>
        
        <div className="max-w-4xl mx-auto relative z-20 text-center">
          <div className="flex justify-center items-center space-x-3 mb-8 text-xs font-bold text-emerald-200 tracking-widest uppercase flex-wrap">
             <span onClick={() => onNavigate('home')} className="cursor-pointer hover:text-white transition-colors border-b border-transparent hover:border-white">Home</span>
             <span className="text-white/20">/</span>
             <span onClick={() => onNavigate(`category/${post.category.toLowerCase()}`)} className="cursor-pointer hover:text-white transition-colors border-b border-transparent hover:border-white">{post.category}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight">{post.title}</h1>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-slate-300 font-medium">
             <div className="flex items-center space-x-2">
                <img src={`https://ui-avatars.com/api/?name=${post.author}&background=d1fae5&color=065f46`} alt="Author" className="w-8 h-8 rounded-full border border-white/20" />
                <span>By {post.author}</span>
             </div>
             <span className="hidden md:block w-1 h-1 bg-gray-500 rounded-full"></span>
             <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
             <span className="hidden md:block w-1 h-1 bg-gray-500 rounded-full"></span>
             <span>{post.readTime} min read</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-3xl mx-auto px-4 relative z-30 -mt-24">
         {post.coverImage && (
            <div className="rounded-xl overflow-hidden shadow-2xl mb-12 bg-gray-200 aspect-video">
               <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
            </div>
         )}

         <div className="bg-white p-8 md:p-14 rounded-xl shadow-soft border border-gray-100 mb-16 overflow-hidden">
            <div className="prose prose-lg prose-slate max-w-none font-serif leading-8 break-words" dangerouslySetInnerHTML={{__html: enhancedContent}} />
         </div>
         
         {/* Interaction & Author Box */}
         <div className="max-w-3xl mx-auto mb-20 space-y-8">
            {/* Voting */}
            <div className="flex justify-center gap-4">
               <button onClick={() => handleVote('like')} className={`flex items-center gap-2 px-6 py-3 rounded-full border font-bold transition-all ${userVote === 'like' ? 'bg-emerald-50 border-primary text-primary' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                 <ThumbsUpIcon /> {post.likes || 0}
               </button>
               <button onClick={() => handleVote('dislike')} className={`flex items-center gap-2 px-6 py-3 rounded-full border font-bold transition-all ${userVote === 'dislike' ? 'bg-red-50 border-red-500 text-red-500' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                 <ThumbsDownIcon /> {post.dislikes || 0}
               </button>
            </div>

            {/* Author Bio */}
            <div className="bg-white p-8 rounded-xl border border-gray-100 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-sm">
                <img src={`https://ui-avatars.com/api/?name=${post.author}&size=128&background=022c22&color=fff`} className="w-20 h-20 rounded-full flex-shrink-0" alt="Author" />
                <div className="text-center md:text-left">
                   <h3 className="text-lg font-bold text-secondary mb-2">Written by {post.author}</h3>
                   <p className="text-gray-500 text-sm mb-4 leading-relaxed">Financial Analyst and Content Creator. Dedicated to simplifying complex market concepts for the everyday Indian investor. Passionate about wealth creation through SIPs and long-term equity.</p>
                   <div className="flex justify-center md:justify-start gap-4">
                      <button className="text-gray-400 hover:text-blue-500 transition-colors"><TwitterIcon /></button>
                      <button className="text-gray-400 hover:text-blue-700 transition-colors"><LinkedInIcon /></button>
                   </div>
                </div>
            </div>

            {/* Share & Tags */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-gray-200 pt-8 w-full">
               <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full md:w-auto">
                 {post.tags.map(tag => (
                   <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-xs font-bold uppercase tracking-wide hover:bg-gray-200 cursor-pointer">#{tag}</span>
                 ))}
               </div>
               <div className="flex flex-wrap gap-4 justify-center w-full md:w-auto">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest pt-2 flex-shrink-0">Share</span>
                  <button onClick={() => handleShare('twitter')} className="p-2 rounded-full bg-white border border-gray-200 hover:border-primary hover:text-primary transition-all"><TwitterIcon /></button>
                  <button onClick={() => handleShare('linkedin')} className="p-2 rounded-full bg-white border border-gray-200 hover:border-primary hover:text-primary transition-all"><LinkedInIcon /></button>
                  <button onClick={() => handleShare('facebook')} className="p-2 rounded-full bg-white border border-gray-200 hover:border-primary hover:text-primary transition-all"><FacebookIcon /></button>
               </div>
            </div>
         </div>
      </div>

      {/* Related Posts */}
      {related.length > 0 && (
        <div className="bg-white py-20 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-2xl font-bold mb-10 text-secondary font-serif">More on this topic</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {related.map(p => (
                 <BlogCard key={p.id} post={p} onClick={(s) => onNavigate(`blog/${s}`)} />
               ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default BlogDetailPage;
