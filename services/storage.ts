// import { BlogPost, User, UserRole } from '../types';
// import { createClient } from '@supabase/supabase-js';

// // --- INITIAL MOCK DATA (Fallback) ---
// const INITIAL_POSTS: BlogPost[] = [
//   {
//     id: '1',
//     title: 'How to Start Investing with ₹500 in India',
//     slug: 'investing-with-500-rupees',
//     excerpt: 'You don\'t need lakhs to start building wealth. Here is a step-by-step guide to micro-investing in Mutual Funds and Gold.',
//     content: `
//       <h2>Why Start Small?</h2>
//       <p>The biggest myth in personal finance is that you need a lot of money to make money. In India, the SIP (Systematic Investment Plan) revolution has made it possible to start with as little as ₹500.</p>
      
//       <h3>Options for ₹500 Investment</h3>
//       <ul>
//         <li><strong>Index Funds:</strong> Nifty 50 Index funds often have low minimums.</li>
//         <li><strong>Digital Gold:</strong> Buy gold for as low as ₹1.</li>
//         <li><strong>Recurring Deposit (RD):</strong> Safe, guaranteed returns.</li>
//       </ul>

//       <h2>The Power of Compounding</h2>
//       <p>Investing ₹500/month at 12% annual return for 30 years grows to over ₹17 Lakhs. The key is consistency, not just the amount.</p>
//     `,
//     coverImage: 'https://picsum.photos/seed/money/800/400',
//     author: 'Kasif',
//     category: 'Investing',
//     tags: ['SIP', 'Beginners', 'Wealth'],
//     publishedAt: new Date().toISOString(),
//     readTime: 5,
//     isPublished: true,
//     likes: 142,
//     dislikes: 3,
//   },
//   {
//     id: '2',
//     title: 'Best Credit Cards for Students 2025',
//     slug: 'best-student-credit-cards',
//     excerpt: 'Build your credit score early with these entry-level credit cards designed for college students with no income proof.',
//     content: `
//       <h2>Building Credit Early</h2>
//       <p>A good CIBIL score is essential for future loans. Students can start building this utilizing secured credit cards.</p>
      
//       <h3>Top Picks</h3>
//       <ol>
//         <li><strong>IDFC First WOW:</strong> Backed by FD, no income proof needed.</li>
//         <li><strong>Slice (Credit Line):</strong> Popular among GenZ for ease of use.</li>
//         <li><strong>Kotak 811:</strong> Great for digital banking integration.</li>
//       </ol>
//     `,
//     coverImage: 'https://picsum.photos/seed/card/800/400',
//     author: 'Kasif',
//     category: 'Credit Cards',
//     tags: ['Credit Score', 'Students', 'Debt'],
//     publishedAt: new Date(Date.now() - 86400000).toISOString(),
//     readTime: 7,
//     isPublished: true,
//     likes: 89,
//     dislikes: 12,
//   }
// ];

// const STORAGE_KEY_POSTS = 'fk_posts';
// const STORAGE_KEY_USER = 'fk_user';

// // --- BACKEND SETUP (SUPABASE) ---
// const env = (import.meta as any).env || {};
// const supabaseUrl = env.VITE_SUPABASE_URL;
// const supabaseKey = env.VITE_SUPABASE_KEY;

// // Initialize Supabase only if keys exist
// const supabase = (supabaseUrl && supabaseKey) 
//   ? createClient(supabaseUrl, supabaseKey) 
//   : null;

// // Helper to check if we should use Cloud DB
// const isCloudEnabled = !!supabase;

// export const StorageService = {
//   // ASYNC: Get all posts
//   getPosts: async (): Promise<BlogPost[]> => {
//     if (isCloudEnabled && supabase) {
//       try {
//         const { data, error } = await supabase
//           .from('posts')
//           .select('*')
//           .order('published_at', { ascending: false }); // Use snake_case for query

//         if (error) throw error;
        
//         // Map Database (snake_case) to App (camelCase)
//         return (data as any[]).map(row => ({
//             id: row.id,
//             title: row.title,
//             slug: row.slug,
//             excerpt: row.excerpt,
//             content: row.content,
//             coverImage: row.cover_image, // Mapping
//             author: row.author,
//             category: row.category,
//             tags: typeof row.tags === 'string' ? JSON.parse(row.tags) : row.tags || [],
//             publishedAt: row.published_at, // Mapping
//             readTime: row.read_time, // Mapping
//             isPublished: row.is_published, // Mapping
//             likes: row.likes || 0,
//             dislikes: row.dislikes || 0
//         })) as BlogPost[];

//       } catch (err) {
//         console.warn("Supabase Fetch Error (falling back to local):", err);
//       }
//     }

//     // Fallback to LocalStorage
//     const stored = localStorage.getItem(STORAGE_KEY_POSTS);
//     if (!stored) {
//       localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(INITIAL_POSTS));
//       return INITIAL_POSTS;
//     }
//     return JSON.parse(stored);
//   },

//   // ASYNC: Get single post
//   getPostBySlug: async (slug: string): Promise<BlogPost | undefined> => {
//     const posts = await StorageService.getPosts();
//     return posts.find(p => p.slug === slug);
//   },

//   // ASYNC: Save (Create/Update)
//   savePost: async (post: BlogPost): Promise<void> => {
//     if (isCloudEnabled && supabase) {
//       try {
//         // Map App (camelCase) to Database (snake_case)
//         const payload = {
//             id: post.id,
//             title: post.title,
//             slug: post.slug,
//             excerpt: post.excerpt,
//             content: post.content,
//             cover_image: post.coverImage,
//             author: post.author,
//             category: post.category,
//             tags: JSON.stringify(post.tags), // Convert array to string/json
//             published_at: post.publishedAt,
//             read_time: post.readTime,
//             is_published: post.isPublished,
//             likes: post.likes,
//             dislikes: post.dislikes
//         };

//         const { error } = await supabase.from('posts').upsert(payload);
        
//         if (error) {
//             console.error("Supabase Save Details:", error.message, error.details);
//             throw error;
//         }
//       } catch (err: any) {
//         console.error("Supabase Save Error:", err);
//         alert(`Error saving to database: ${err.message || 'Unknown Error'}`);
//         return; // Stop execution if DB save fails
//       }
//     }

//     // Always update local storage for immediate UI feel or offline backup
//     const rawLocal = localStorage.getItem(STORAGE_KEY_POSTS);
//     const localPosts: BlogPost[] = rawLocal ? JSON.parse(rawLocal) : INITIAL_POSTS;
    
//     const index = localPosts.findIndex(p => p.id === post.id);
//     if (index >= 0) {
//       localPosts[index] = post;
//     } else {
//       localPosts.unshift(post);
//     }
//     localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(localPosts));
//   },

//   // ASYNC: Delete
//   deletePost: async (id: string): Promise<void> => {
//     if (isCloudEnabled && supabase) {
//       await supabase.from('posts').delete().eq('id', id);
//     }
//     const rawLocal = localStorage.getItem(STORAGE_KEY_POSTS);
//     if (rawLocal) {
//         const posts: BlogPost[] = JSON.parse(rawLocal);
//         const filtered = posts.filter(p => p.id !== id);
//         localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(filtered));
//     }
//   },

//   // ASYNC: Interact
//   interactWithPost: async (id: string, action: 'like' | 'dislike' | 'unlike' | 'undislike'): Promise<BlogPost | undefined> => {
//     const posts = await StorageService.getPosts();
//     const index = posts.findIndex(p => p.id === id);
    
//     if (index >= 0) {
//       const post = posts[index];
//       post.likes = post.likes || 0;
//       post.dislikes = post.dislikes || 0;
      
//       if (action === 'like') post.likes += 1;
//       else if (action === 'dislike') post.dislikes += 1;
//       else if (action === 'unlike') post.likes = Math.max(0, post.likes - 1);
//       else if (action === 'undislike') post.dislikes = Math.max(0, post.dislikes - 1);
      
//       await StorageService.savePost(post);
//       return post;
//     }
//     return undefined;
//   },

//   // Auth: Uses Environment Variables for Admin Access
//   login: async (email: string, password: string): Promise<User | null> => {
//     const adminEmail = env.VITE_ADMIN_USER;
//     const adminPass = env.VITE_ADMIN_PASS;

//     if (!adminEmail || !adminPass) {
//       console.warn("Login Error: Missing VITE_ADMIN_USER or VITE_ADMIN_PASS in .env");
//       return null;
//     }

//     if (email === adminEmail && password === adminPass) {
//       const user: User = {
//         id: 'admin-fk',
//         name: 'Kasif',
//         email,
//         role: UserRole.ADMIN,
//       };
//       localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
//       return user;
//     }
//     return null;
//   },

//   logout: (): void => {
//     localStorage.removeItem(STORAGE_KEY_USER);
//   },

//   getCurrentUser: (): User | null => {
//     const stored = localStorage.getItem(STORAGE_KEY_USER);
//     return stored ? JSON.parse(stored) : null;
//   }
// };


// import { BlogPost, User, UserRole } from '../types';
// import { createClient } from '@supabase/supabase-js';

// // --- INITIAL MOCK DATA (Fallback) ---
// const INITIAL_POSTS: BlogPost[] = [
//   {
//     id: '1',
//     title: 'How to Start Investing with ₹500 in India',
//     slug: 'investing-with-500-rupees',
//     excerpt: 'You don\'t need lakhs to start building wealth. Here is a step-by-step guide to micro-investing in Mutual Funds and Gold.',
//     content: `
//       <h2>Why Start Small?</h2>
//       <p>The biggest myth in personal finance is that you need a lot of money to make money. In India, the SIP (Systematic Investment Plan) revolution has made it possible to start with as little as ₹500.</p>
      
//       <h3>Options for ₹500 Investment</h3>
//       <ul>
//         <li><strong>Index Funds:</strong> Nifty 50 Index funds often have low minimums.</li>
//         <li><strong>Digital Gold:</strong> Buy gold for as low as ₹1.</li>
//         <li><strong>Recurring Deposit (RD):</strong> Safe, guaranteed returns.</li>
//       </ul>

//       <h2>The Power of Compounding</h2>
//       <p>Investing ₹500/month at 12% annual return for 30 years grows to over ₹17 Lakhs. The key is consistency, not just the amount.</p>
//     `,
//     coverImage: 'https://picsum.photos/seed/money/800/400',
//     author: 'Kasif',
//     category: 'Investing',
//     tags: ['SIP', 'Beginners', 'Wealth'],
//     publishedAt: new Date().toISOString(),
//     readTime: 5,
//     isPublished: true,
//     likes: 142,
//     dislikes: 3,
//   },
//   {
//     id: '2',
//     title: 'Best Credit Cards for Students 2025',
//     slug: 'best-student-credit-cards',
//     excerpt: 'Build your credit score early with these entry-level credit cards designed for college students with no income proof.',
//     content: `
//       <h2>Building Credit Early</h2>
//       <p>A good CIBIL score is essential for future loans. Students can start building this utilizing secured credit cards.</p>
      
//       <h3>Top Picks</h3>
//       <ol>
//         <li><strong>IDFC First WOW:</strong> Backed by FD, no income proof needed.</li>
//         <li><strong>Slice (Credit Line):</strong> Popular among GenZ for ease of use.</li>
//         <li><strong>Kotak 811:</strong> Great for digital banking integration.</li>
//       </ol>
//     `,
//     coverImage: 'https://picsum.photos/seed/card/800/400',
//     author: 'Kasif',
//     category: 'Credit Cards',
//     tags: ['Credit Score', 'Students', 'Debt'],
//     publishedAt: new Date(Date.now() - 86400000).toISOString(),
//     readTime: 7,
//     isPublished: true,
//     likes: 89,
//     dislikes: 12,
//   }
// ];

// const STORAGE_KEY_POSTS = 'fk_posts';
// const STORAGE_KEY_USER = 'fk_user';

// // --- BACKEND SETUP (SUPABASE) ---
// const env = (import.meta as any).env || {};
// const supabaseUrl = env.VITE_SUPABASE_URL;
// const supabaseKey = env.VITE_SUPABASE_KEY;

// // Initialize Supabase only if keys exist
// const supabase = (supabaseUrl && supabaseKey) 
//   ? createClient(supabaseUrl, supabaseKey) 
//   : null;

// // Helper to check if we should use Cloud DB
// const isCloudEnabled = !!supabase;

// export const StorageService = {
//   // ASYNC: Get all posts
//   getPosts: async (): Promise<BlogPost[]> => {
//     if (isCloudEnabled && supabase) {
//       try {
//         const { data, error } = await supabase
//           .from('posts')
//           .select('*')
//           .order('published_at', { ascending: false }); // Use snake_case for query

//         if (error) throw error;
        
//         // Map Database (snake_case) to App (camelCase)
//         return (data as any[]).map(row => ({
//             id: row.id,
//             title: row.title,
//             slug: row.slug,
//             excerpt: row.excerpt,
//             content: row.content,
//             coverImage: row.cover_image, // Mapping
//             author: row.author,
//             category: row.category,
//             tags: typeof row.tags === 'string' ? JSON.parse(row.tags) : row.tags || [],
//             publishedAt: row.published_at, // Mapping
//             readTime: row.read_time, // Mapping
//             isPublished: row.is_published, // Mapping
//             likes: row.likes || 0,
//             dislikes: row.dislikes || 0
//         })) as BlogPost[];

//       } catch (err) {
//         console.warn("Supabase Fetch Error (falling back to local):", err);
//       }
//     }

//     // Fallback to LocalStorage
//     const stored = localStorage.getItem(STORAGE_KEY_POSTS);
//     if (!stored) {
//       localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(INITIAL_POSTS));
//       return INITIAL_POSTS;
//     }
//     return JSON.parse(stored);
//   },

//   // ASYNC: Get single post
//   getPostBySlug: async (slug: string): Promise<BlogPost | undefined> => {
//     const posts = await StorageService.getPosts();
//     return posts.find(p => p.slug === slug);
//   },

//   // ASYNC: Save (Create/Update)
//   savePost: async (post: BlogPost): Promise<void> => {
//     if (isCloudEnabled && supabase) {
//       try {
//         // Map App (camelCase) to Database (snake_case)
//         const payload = {
//             id: post.id,
//             title: post.title,
//             slug: post.slug,
//             excerpt: post.excerpt,
//             content: post.content,
//             cover_image: post.coverImage,
//             author: post.author,
//             category: post.category,
//             tags: JSON.stringify(post.tags), // Convert array to string/json
//             published_at: post.publishedAt,
//             read_time: post.readTime,
//             is_published: post.isPublished,
//             likes: post.likes,
//             dislikes: post.dislikes
//         };

//         const { error } = await supabase.from('posts').upsert(payload);
        
//         if (error) throw error;

//         // SUCCESS: If cloud save works, we STOP here.
//         // We do NOT write to localStorage to prevent "QuotaExceededError".
//         return; 
        
//       } catch (err: any) {
//         // Handle Duplicate Slug Error (Postgres code 23505 OR HTTP 409)
//         if (err.code === '23505' || err.status === 409 || err.message?.includes('duplicate key') || err.message?.includes('slug')) {
//            const newSlug = `${post.slug}-${Math.floor(Math.random() * 10000)}`;
//            console.warn(`Duplicate slug detected. Auto-resolving to: ${newSlug}`);
//            post.slug = newSlug;
//            return StorageService.savePost(post); // Recursive retry with new slug
//         }

//         console.error("Supabase Save Error:", err);
//         alert(`Error saving to database: ${err.message || 'Unknown Error'}`);
//         return; // Stop execution if DB save fails
//       }
//     }

//     // --- LOCAL STORAGE LOGIC (Only runs if Supabase is NOT connected) ---
//     try {
//       const rawLocal = localStorage.getItem(STORAGE_KEY_POSTS);
//       const localPosts: BlogPost[] = rawLocal ? JSON.parse(rawLocal) : INITIAL_POSTS;
      
//       const index = localPosts.findIndex(p => p.id === post.id);
//       if (index >= 0) {
//         localPosts[index] = post;
//       } else {
//         localPosts.unshift(post);
//       }
//       localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(localPosts));
//     } catch (e) {
//       console.error("LocalStorage Save Error (Quota Exceeded?):", e);
//       alert("Local storage is full. Please use the Cloud Database (Supabase) to save more posts.");
//     }
//   },

//   // ASYNC: Delete
//   deletePost: async (id: string): Promise<void> => {
//     if (isCloudEnabled && supabase) {
//       await supabase.from('posts').delete().eq('id', id);
//     }
//     // Try to cleanup local storage too if it exists
//     const rawLocal = localStorage.getItem(STORAGE_KEY_POSTS);
//     if (rawLocal) {
//         const posts: BlogPost[] = JSON.parse(rawLocal);
//         const filtered = posts.filter(p => p.id !== id);
//         localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(filtered));
//     }
//   },

//   // ASYNC: Interact
//   interactWithPost: async (id: string, action: 'like' | 'dislike' | 'unlike' | 'undislike'): Promise<BlogPost | undefined> => {
//     const posts = await StorageService.getPosts();
//     const index = posts.findIndex(p => p.id === id);
    
//     if (index >= 0) {
//       const post = posts[index];
//       post.likes = post.likes || 0;
//       post.dislikes = post.dislikes || 0;
      
//       if (action === 'like') post.likes += 1;
//       else if (action === 'dislike') post.dislikes += 1;
//       else if (action === 'unlike') post.likes = Math.max(0, post.likes - 1);
//       else if (action === 'undislike') post.dislikes = Math.max(0, post.dislikes - 1);
      
//       await StorageService.savePost(post);
//       return post;
//     }
//     return undefined;
//   },

//   // Auth: Uses Environment Variables for Admin Access
//   login: async (email: string, password: string): Promise<User | null> => {
//     const adminEmail = env.VITE_ADMIN_USER;
//     const adminPass = env.VITE_ADMIN_PASS;

//     if (!adminEmail || !adminPass) {
//       console.warn("Login Error: Missing VITE_ADMIN_USER or VITE_ADMIN_PASS in .env");
//       return null;
//     }

//     if (email === adminEmail && password === adminPass) {
//       const user: User = {
//         id: 'admin-fk',
//         name: 'Kasif',
//         email,
//         role: UserRole.ADMIN,
//       };
//       localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
//       return user;
//     }
//     return null;
//   },

//   logout: (): void => {
//     localStorage.removeItem(STORAGE_KEY_USER);
//   },

//   getCurrentUser: (): User | null => {
//     const stored = localStorage.getItem(STORAGE_KEY_USER);
//     return stored ? JSON.parse(stored) : null;
//   }
// };


import { BlogPost, User, UserRole } from '../types';
import { createClient } from '@supabase/supabase-js';

// --- INITIAL MOCK DATA (Fallback) ---
const INITIAL_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'How to Start Investing with ₹500 in India',
    slug: 'investing-with-500-rupees',
    excerpt: 'You don\'t need lakhs to start building wealth. Here is a step-by-step guide to micro-investing in Mutual Funds and Gold.',
    content: `
      <h2>Why Start Small?</h2>
      <p>The biggest myth in personal finance is that you need a lot of money to make money. In India, the SIP (Systematic Investment Plan) revolution has made it possible to start with as little as ₹500.</p>
      
      <h3>Options for ₹500 Investment</h3>
      <ul>
        <li><strong>Index Funds:</strong> Nifty 50 Index funds often have low minimums.</li>
        <li><strong>Digital Gold:</strong> Buy gold for as low as ₹1.</li>
        <li><strong>Recurring Deposit (RD):</strong> Safe, guaranteed returns.</li>
      </ul>

      <h2>The Power of Compounding</h2>
      <p>Investing ₹500/month at 12% annual return for 30 years grows to over ₹17 Lakhs. The key is consistency, not just the amount.</p>
    `,
    coverImage: 'https://picsum.photos/seed/money/800/400',
    author: 'Kasif',
    category: 'Investing',
    tags: ['SIP', 'Beginners', 'Wealth'],
    publishedAt: new Date().toISOString(),
    readTime: 5,
    isPublished: true,
    likes: 142,
    dislikes: 3,
  },
  {
    id: '2',
    title: 'Best Credit Cards for Students 2025',
    slug: 'best-student-credit-cards',
    excerpt: 'Build your credit score early with these entry-level credit cards designed for college students with no income proof.',
    content: `
      <h2>Building Credit Early</h2>
      <p>A good CIBIL score is essential for future loans. Students can start building this utilizing secured credit cards.</p>
      
      <h3>Top Picks</h3>
      <ol>
        <li><strong>IDFC First WOW:</strong> Backed by FD, no income proof needed.</li>
        <li><strong>Slice (Credit Line):</strong> Popular among GenZ for ease of use.</li>
        <li><strong>Kotak 811:</strong> Great for digital banking integration.</li>
      </ol>
    `,
    coverImage: 'https://picsum.photos/seed/card/800/400',
    author: 'Kasif',
    category: 'Credit Cards',
    tags: ['Credit Score', 'Students', 'Debt'],
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    readTime: 7,
    isPublished: true,
    likes: 89,
    dislikes: 12,
  }
];

const STORAGE_KEY_POSTS = 'fk_posts';
const STORAGE_KEY_USER = 'fk_user';

// --- BACKEND SETUP (SUPABASE) ---
const env = (import.meta as any).env || {};
const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_KEY;

// Initialize Supabase only if keys exist
const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

// Helper to check if we should use Cloud DB
const isCloudEnabled = !!supabase;

// Helper to map DB row to App Object
const mapRowToPost = (row: any): BlogPost => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content || '', // Content might be empty in list view
    coverImage: row.cover_image, 
    author: row.author,
    category: row.category,
    tags: typeof row.tags === 'string' ? JSON.parse(row.tags) : row.tags || [],
    publishedAt: row.published_at, 
    readTime: row.read_time, 
    isPublished: row.is_published, 
    likes: row.likes || 0,
    dislikes: row.dislikes || 0
});

export const StorageService = {
  // ASYNC: Get all posts (Summary only for speed)
  getPosts: async (): Promise<BlogPost[]> => {
    if (isCloudEnabled && supabase) {
      try {
        // PERF: Exclude 'content' to make the list load instant
        const { data, error } = await supabase
          .from('posts')
          .select('id, title, slug, excerpt, cover_image, author, category, tags, published_at, read_time, is_published, likes, dislikes')
          .order('published_at', { ascending: false });

        if (error) throw error;
        
        return (data as any[]).map(mapRowToPost);

      } catch (err) {
        console.warn("Supabase Fetch Error (falling back to local):", err);
      }
    }

    // Fallback to LocalStorage
    const stored = localStorage.getItem(STORAGE_KEY_POSTS);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(INITIAL_POSTS));
      return INITIAL_POSTS;
    }
    return JSON.parse(stored);
  },

  // ASYNC: Get single post by slug (Optimized Single Fetch)
  getPostBySlug: async (slug: string): Promise<BlogPost | undefined> => {
    if (isCloudEnabled && supabase) {
        try {
            // PERF: Fetch ONLY the single row we need
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('slug', slug)
                .single();
            
            if (error) throw error;
            if (data) return mapRowToPost(data);
            
        } catch (err) {
            console.error("Supabase Single Fetch Error:", err);
            // Fallback continues below
        }
    }

    // Fallback logic
    const posts = await StorageService.getPosts(); // Note: this uses local storage if cloud failed
    // If we are in local fallback, getPosts returns full objects so .find works
    return posts.find(p => p.slug === slug);
  },

  // ASYNC: Get single post by ID (Used for Editing)
  getPostById: async (id: string): Promise<BlogPost | undefined> => {
     if (isCloudEnabled && supabase) {
         const { data } = await supabase.from('posts').select('*').eq('id', id).single();
         if (data) return mapRowToPost(data);
     }
     const posts = await StorageService.getPosts();
     return posts.find(p => p.id === id);
  },

  // ASYNC: Save (Create/Update)
  savePost: async (post: BlogPost): Promise<void> => {
    if (isCloudEnabled && supabase) {
      try {
        const payload = {
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            cover_image: post.coverImage,
            author: post.author,
            category: post.category,
            tags: JSON.stringify(post.tags),
            published_at: post.publishedAt,
            read_time: post.readTime,
            is_published: post.isPublished,
            likes: post.likes,
            dislikes: post.dislikes
        };

        const { error } = await supabase.from('posts').upsert(payload);
        
        if (error) throw error;
        return; 
        
      } catch (err: any) {
        if (err.code === '23505' || err.status === 409 || err.message?.includes('duplicate key') || err.message?.includes('slug')) {
           const newSlug = `${post.slug}-${Math.floor(Math.random() * 10000)}`;
           console.warn(`Duplicate slug detected. Auto-resolving to: ${newSlug}`);
           post.slug = newSlug;
           return StorageService.savePost(post); 
        }

        console.error("Supabase Save Error:", err);
        alert(`Error saving to database: ${err.message || 'Unknown Error'}`);
        return;
      }
    }

    // --- LOCAL STORAGE ---
    try {
      const rawLocal = localStorage.getItem(STORAGE_KEY_POSTS);
      const localPosts: BlogPost[] = rawLocal ? JSON.parse(rawLocal) : INITIAL_POSTS;
      
      const index = localPosts.findIndex(p => p.id === post.id);
      if (index >= 0) {
        localPosts[index] = post;
      } else {
        localPosts.unshift(post);
      }
      localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(localPosts));
    } catch (e) {
      console.error("LocalStorage Save Error:", e);
      alert("Local storage is full. Please use the Cloud Database (Supabase).");
    }
  },

  // ASYNC: Delete
  deletePost: async (id: string): Promise<void> => {
    if (isCloudEnabled && supabase) {
      await supabase.from('posts').delete().eq('id', id);
    }
    const rawLocal = localStorage.getItem(STORAGE_KEY_POSTS);
    if (rawLocal) {
        const posts: BlogPost[] = JSON.parse(rawLocal);
        const filtered = posts.filter(p => p.id !== id);
        localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(filtered));
    }
  },

  // ASYNC: Interact (Optimized to NOT fetch all posts)
  interactWithPost: async (id: string, action: 'like' | 'dislike' | 'unlike' | 'undislike'): Promise<BlogPost | undefined> => {
    
    // 1. Calculate the delta
    let likeDelta = 0;
    let dislikeDelta = 0;
    if (action === 'like') likeDelta = 1;
    else if (action === 'dislike') dislikeDelta = 1;
    else if (action === 'unlike') likeDelta = -1;
    else if (action === 'undislike') dislikeDelta = -1;

    // 2. Cloud Update (Optimized)
    if (isCloudEnabled && supabase) {
        try {
            // First get current counts for this ID only
            const { data: current, error: fetchError } = await supabase
                .from('posts')
                .select('likes, dislikes')
                .eq('id', id)
                .single();

            if (fetchError || !current) throw fetchError;

            // Calculate new values safely
            const newLikes = Math.max(0, (current.likes || 0) + likeDelta);
            const newDislikes = Math.max(0, (current.dislikes || 0) + dislikeDelta);

            // Update DB
            const { data: updated, error: updateError } = await supabase
                .from('posts')
                .update({ likes: newLikes, dislikes: newDislikes })
                .eq('id', id)
                .select('*')
                .single();

            if (updateError) throw updateError;
            return mapRowToPost(updated);

        } catch (err) {
            console.error("Interaction Error:", err);
            return undefined;
        }
    }

    // 3. Local Fallback
    const posts = await StorageService.getPosts();
    const index = posts.findIndex(p => p.id === id);
    
    if (index >= 0) {
      const post = posts[index];
      post.likes = Math.max(0, (post.likes || 0) + likeDelta);
      post.dislikes = Math.max(0, (post.dislikes || 0) + dislikeDelta);
      await StorageService.savePost(post);
      return post;
    }
    return undefined;
  },

  // Auth
  login: async (email: string, password: string): Promise<User | null> => {
    const adminEmail = env.VITE_ADMIN_USER;
    const adminPass = env.VITE_ADMIN_PASS;

    if (!adminEmail || !adminPass) {
      console.warn("Login Error: Missing VITE_ADMIN_USER in .env");
      return null;
    }

    if (email === adminEmail && password === adminPass) {
      const user: User = {
        id: 'admin-fk',
        name: 'Kasif',
        email,
        role: UserRole.ADMIN,
      };
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
      return user;
    }
    return null;
  },

  logout: (): void => {
    localStorage.removeItem(STORAGE_KEY_USER);
  },

  getCurrentUser: (): User | null => {
    const stored = localStorage.getItem(STORAGE_KEY_USER);
    return stored ? JSON.parse(stored) : null;
  }
};