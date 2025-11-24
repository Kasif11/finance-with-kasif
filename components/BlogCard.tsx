import React from 'react';
import { BlogPost } from '../types';
import { CalendarIcon, ClockIcon, ChevronRight } from './Icons';

interface BlogCardProps {
  post: BlogPost;
  onClick: (slug: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onClick }) => {
  return (
    <div 
      onClick={() => onClick(post.slug)}
      className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 cursor-pointer flex flex-col h-full transform hover:-translate-y-1 relative"
    >
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-4 right-4 z-20">
           <span className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-secondary uppercase tracking-wider shadow-sm border border-gray-100">
             {post.category}
           </span>
        </div>
      </div>
      
      <div className="p-6 md:p-8 flex-1 flex flex-col relative">
        <div className="flex items-center space-x-3 text-xs text-gray-400 font-medium mb-4 uppercase tracking-wide">
           <span className="flex items-center"><CalendarIcon /> <span className="ml-1.5">{new Date(post.publishedAt).toLocaleDateString()}</span></span>
           <span className="w-1 h-1 rounded-full bg-gray-300"></span>
           <span className="flex items-center text-primary"><ClockIcon /> <span className="ml-1.5">{post.readTime} min</span></span>
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3 group-hover:text-primary transition-colors font-serif leading-tight">
          {post.title}
        </h3>
        
        <p className="text-slate-500 mb-6 text-sm leading-relaxed line-clamp-3 flex-1 font-light">
          {post.excerpt}
        </p>
        
        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
           <div className="flex items-center space-x-2">
             <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
                <img src={`https://ui-avatars.com/api/?name=${post.author || 'Kasif'}&background=059669&color=fff`} alt="Author" />
             </div>
             <span className="text-xs font-bold text-slate-700">{post.author || 'Kasif'}</span>
           </div>
           <span className="text-primary font-bold text-xs flex items-center group-hover:translate-x-1 transition-transform uppercase tracking-wider">
             Read Article <span className="ml-1"><ChevronRight /></span>
           </span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;