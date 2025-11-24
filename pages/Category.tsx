import React, { useEffect, useState } from 'react';
import { StorageService } from '../services/storage';
import BlogCard from '../components/BlogCard';
import { MOCK_CATEGORIES, BlogPost } from '../types';

const CategoryPage = ({ slug, onNavigate }: { slug: string, onNavigate: (path: string) => void }) => {
   const [posts, setPosts] = useState<BlogPost[]>([]);
   const categoryName = slug;

   useEffect(() => {
     const loadPosts = async () => {
        let allPosts = await StorageService.getPosts();
        if (slug !== 'all') {
          allPosts = allPosts.filter(p => p.category.toLowerCase().includes(categoryName.toLowerCase().replace('-', ' ')));
        }
        setPosts(allPosts);
     };
     loadPosts();
   }, [slug, categoryName]);
   
   const categoryTitle = slug === 'all' ? 'All Articles' : categoryName.replace('-', ' ');

   return (
     <div className="bg-gray-50 min-h-screen">
       <div className="bg-white border-b border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-serif font-bold capitalize text-secondary mb-4">{categoryTitle}</h1>
            <p className="text-gray-500 max-w-2xl">Browse our collection of expert articles, guides, and insights on {categoryTitle}.</p>
            
            {/* Quick Filter Pills */}
            <div className="flex flex-wrap gap-2 mt-8">
              <button onClick={() => onNavigate('category/all')} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${slug === 'all' ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                 All
              </button>
              {MOCK_CATEGORIES.map(c => (
                <button 
                  key={c.id} 
                  onClick={() => onNavigate(`category/${c.slug}`)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${slug === c.slug ? 'bg-secondary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 py-12">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <BlogCard key={post.id} post={post} onClick={(slug) => onNavigate(`blog/${slug}`)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
               <div className="text-6xl mb-4">📭</div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">No posts found</h3>
               <p className="text-gray-500">We haven't written about this topic yet. Check back soon!</p>
               <button onClick={() => onNavigate('home')} className="mt-6 text-primary font-semibold hover:underline">Return Home</button>
            </div>
          )}
       </div>
     </div>
   );
};

export default CategoryPage;