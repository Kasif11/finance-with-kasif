
import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedAt?: string;
  author?: string;
  schema?: object; // JSON-LD Structured Data
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords = [], 
  image = 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop', 
  url = window.location.href, 
  type = 'website',
  publishedAt,
  author,
  schema
}) => {
  
  useEffect(() => {
    // 1. Update Title
    document.title = title.includes('Finance with Kasif') ? title : `${title} | Finance with Kasif`;

    // 2. Helper to update meta tags
    const updateMeta = (name: string, content: string, attribute = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 3. Update Standard Meta Tags
    updateMeta('description', description);
    updateMeta('keywords', keywords.join(', '));
    updateMeta('author', author || 'Kasif');

    // 4. Update Open Graph (Facebook/WhatsApp/LinkedIn)
    updateMeta('og:title', title, 'property');
    updateMeta('og:description', description, 'property');
    updateMeta('og:image', image, 'property');
    updateMeta('og:url', url, 'property');
    updateMeta('og:type', type, 'property');
    
    // 5. Update Twitter Cards
    updateMeta('twitter:title', title, 'property');
    updateMeta('twitter:description', description, 'property');
    updateMeta('twitter:image', image, 'property');

    // 6. Inject JSON-LD (Structured Data for Google Rich Snippets)
    if (schema) {
      let script = document.querySelector('#seo-schema');
      if (!script) {
        script = document.createElement('script');
        script.id = 'seo-schema';
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    }

    // Cleanup isn't strictly necessary for meta tags in SPA as next page overwrites them,
    // but good practice to reset if needed.
  }, [title, description, keywords, image, url, type, publishedAt, author, schema]);

  return null; // This component renders nothing visually
};

export default SEO;
