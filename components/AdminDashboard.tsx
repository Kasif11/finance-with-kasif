import React, { useState, useEffect, useRef } from 'react';
import { BlogPost, MOCK_CATEGORIES } from '../types';
import { StorageService } from '../services/storage';
import { EditIcon, TrashIcon, PlusIcon } from './Icons';

// --- RICH TEXT EDITOR COMPONENT ---
interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML && value) {
      editorRef.current.innerHTML = value;
    }
  }, []); 

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCmd = (command: string, arg: string | undefined = undefined) => {
    document.execCommand(command, false, arg);
    if (editorRef.current) {
        onChange(editorRef.current.innerHTML);
        editorRef.current.focus();
    }
  };

  const ToolbarButton = ({ cmd, arg, label, icon }: { cmd: string, arg?: string, label?: string, icon?: React.ReactNode }) => (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); execCmd(cmd, arg); }}
      className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded transition-colors font-medium text-sm min-w-[36px] flex items-center justify-center"
      title={label || cmd}
    >
      {icon || label}
    </button>
  );

  return (
    <div className={`border rounded-lg overflow-hidden transition-all bg-white shadow-sm ${isFocused ? 'border-primary ring-2 ring-primary/10' : 'border-gray-300'}`}>
      <div className="flex flex-wrap items-center gap-1 bg-gray-50 border-b border-gray-200 p-2">
        <ToolbarButton cmd="bold" label="B" icon={<strong className="font-serif text-lg">B</strong>} />
        <ToolbarButton cmd="italic" label="I" icon={<em className="font-serif text-lg">I</em>} />
        <ToolbarButton cmd="underline" label="U" icon={<span className="underline text-lg">U</span>} />
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <ToolbarButton cmd="formatBlock" arg="H2" label="H2" />
        <ToolbarButton cmd="formatBlock" arg="H3" label="H3" />
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <ToolbarButton cmd="insertUnorderedList" icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>} />
        <ToolbarButton cmd="insertOrderedList" icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="10" y1="6" x2="21" y2="6"></line><line x1="10" y1="12" x2="21" y2="12"></line><line x1="10" y1="18" x2="21" y2="18"></line><path d="M4 6h1v4"></path><path d="M4 10h2"></path><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path></svg>} />
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full p-6 min-h-[400px] max-h-[600px] overflow-y-auto bg-white text-gray-900 prose prose-emerald prose-sm max-w-none outline-none"
      />
    </div>
  );
};

// --- MAIN ADMIN COMPONENT ---

const AdminDashboard: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const data = await StorageService.getPosts();
    setPosts(data);
  };

  const handleCreateNew = () => {
    setCurrentPost({
      id: Date.now().toString(),
      title: '',
      slug: '',
      content: '', 
      excerpt: '',
      category: 'Investing',
      publishedAt: new Date().toISOString(),
      readTime: 5,
      coverImage: '',
      isPublished: false,
      tags: [],
      likes: 0,
      dislikes: 0
    });
    setIsEditing(true);
  };

  const handleEdit = (post: BlogPost) => {
    setCurrentPost(post);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await StorageService.deletePost(id);
      loadPosts();
    }
  };

  const handleSave = async () => {
    if (!currentPost.title || !currentPost.content) {
      alert('Title and Content are required');
      return;
    }
    
    setIsSaving(true);
    try {
      if (!currentPost.slug) {
        currentPost.slug = currentPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      }
      if (!currentPost.coverImage) {
        currentPost.coverImage = 'https://picsum.photos/800/400';
      }
      if (currentPost.likes === undefined) currentPost.likes = 0;
      if (currentPost.dislikes === undefined) currentPost.dislikes = 0;
      
      currentPost.isPublished = true;

      await StorageService.savePost(currentPost as BlogPost);
      setIsEditing(false);
      loadPosts();
    } catch (e) {
      console.error(e);
      // Alert handled in StorageService, but we stop loading state here
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File is too large. Please upload an image under 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentPost(prev => ({ ...prev, coverImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (isEditing) {
    return (
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-secondary font-serif">Editor</h2>
          <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Blog Title</label>
              <input 
                type="text" 
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg text-xl font-serif text-gray-900 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                value={currentPost.title || ''}
                onChange={e => setCurrentPost({...currentPost, title: e.target.value})}
                placeholder="Enter an engaging title..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                  <select 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:bg-white focus:ring-2 focus:ring-primary outline-none"
                    value={currentPost.category}
                    onChange={e => setCurrentPost({...currentPost, category: e.target.value})}
                  >
                    {MOCK_CATEGORIES.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
               </div>
               
               <div>
                 <label className="block text-sm font-bold text-gray-700 mb-2">Cover Image</label>
                 {!currentPost.coverImage ? (
                   <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
                     <div className="flex flex-col items-center justify-center pt-5 pb-6">
                       <p className="text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                       <p className="text-xs text-gray-500">SVG, PNG, JPG (MAX. 5MB)</p>
                     </div>
                     <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                   </label>
                 ) : (
                   <div className="relative h-32 w-full rounded-lg overflow-hidden group">
                      <img src={currentPost.coverImage} alt="Cover" className="w-full h-full object-cover" />
                      <button 
                        onClick={() => setCurrentPost({...currentPost, coverImage: ''})} 
                        className="absolute top-2 right-2 bg-white/90 text-red-600 p-2 rounded-full hover:bg-red-100 shadow-md opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <TrashIcon />
                      </button>
                   </div>
                 )}
               </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Content</label>
              <RichTextEditor 
                value={currentPost.content || ''} 
                onChange={(html) => setCurrentPost({...currentPost, content: html})} 
              />
            </div>

            {/* SEO Metadata Manual Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
                <div className="col-span-1 md:col-span-2">
                   <h3 className="font-bold text-gray-800 mb-2 text-lg">SEO & Metadata</h3>
                   <p className="text-sm text-gray-500 mb-4">Manually optimize how this post appears in search results and cards.</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Excerpt / Description</label>
                  <textarea 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm h-32 text-gray-900 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                    value={currentPost.excerpt || ''}
                    onChange={e => setCurrentPost({...currentPost, excerpt: e.target.value})}
                    placeholder="Enter a concise summary..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Keywords (Comma separated)</label>
                  <textarea 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm h-32 text-gray-900 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                    value={currentPost.tags?.join(', ') || ''}
                    onChange={e => setCurrentPost({...currentPost, tags: e.target.value.split(',').map(t => t.trim())})}
                    placeholder="investing, savings, tax..."
                  />
                </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t">
               <button 
                 onClick={handleSave}
                 disabled={isSaving}
                 className="bg-secondary hover:bg-primary text-white px-8 py-3.5 rounded-lg transition-all shadow-lg transform hover:-translate-y-0.5 font-bold flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 {isSaving ? 'Saving...' : 'Save & Publish Post'}
               </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8">
      <div className="flex justify-between items-center mb-10">
        <div>
           <h1 className="text-4xl font-bold text-secondary font-serif">Dashboard</h1>
           <p className="text-gray-500 mt-2">Welcome back, Kasif. Here's what's happening.</p>
        </div>
        <button 
          onClick={handleCreateNew}
          className="bg-primary text-white px-6 py-3 rounded-lg flex items-center hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200 font-semibold transform hover:scale-105"
        >
          <span className="mr-2"><PlusIcon /></span> New Article
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl mr-4">
               📝
            </div>
            <div>
               <p className="text-sm text-gray-500 font-medium">Total Posts</p>
               <h4 className="text-2xl font-bold text-gray-900">{posts.length}</h4>
            </div>
         </div>
         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xl mr-4">
               👁️
            </div>
            <div>
               <p className="text-sm text-gray-500 font-medium">Total Views</p>
               <h4 className="text-2xl font-bold text-gray-900">12.5K</h4>
            </div>
         </div>
         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
            <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xl mr-4">
               📄
            </div>
            <div>
               <p className="text-sm text-gray-500 font-medium">Drafts</p>
               <h4 className="text-2xl font-bold text-gray-900">{posts.filter(p => !p.isPublished).length}</h4>
            </div>
         </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
           <h3 className="font-bold text-gray-800">Recent Articles</h3>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold tracking-wider">
            <tr>
              <th className="px-6 py-4 border-b">Title</th>
              <th className="px-6 py-4 border-b hidden md:table-cell">Category</th>
              <th className="px-6 py-4 border-b hidden sm:table-cell">Date</th>
              <th className="px-6 py-4 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.map(post => (
              <tr key={post.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{post.title}</div>
                  <div className="md:hidden text-xs text-gray-500 mt-1">{post.category}</div>
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm hidden md:table-cell">
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">{post.category}</span>
                </td>
                <td className="px-6 py-4 text-gray-500 text-sm hidden sm:table-cell">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => handleEdit(post)} className="text-gray-400 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-full transition-colors" title="Edit">
                    <EditIcon />
                  </button>
                  <button onClick={() => handleDelete(post.id)} className="text-gray-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors" title="Delete">
                    <TrashIcon />
                  </button>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
               <tr><td colSpan={4} className="p-16 text-center text-gray-500">No posts found. Start writing your first blog!</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;