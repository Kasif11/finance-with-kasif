

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML or Markdown
  coverImage: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number; // in minutes
  isPublished: boolean;
  likes: number;
  dislikes: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Investing', slug: 'investing' },
  { id: '2', name: 'Savings', slug: 'savings' },
  { id: '3', name: 'Credit Cards', slug: 'credit-cards' },
  { id: '4', name: 'Mutual Funds', slug: 'mutual-funds' },
  { id: '5', name: 'Stock Analysis', slug: 'stock-analysis' },
  { id: '6', name: 'IPO Watch', slug: 'ipo-watch' },
  { id: '7', name: 'F&O Strategies', slug: 'f-and-o' },
  { id: '8', name: 'Intraday', slug: 'intraday' },
  { id: '9', name: 'Tax Planning', slug: 'tax-planning' },
  { id: '10', name: 'Technical Analysis', slug: 'technical-analysis' },
  { id: '11', name: 'Fundamental Analysis', slug: 'fundamental-analysis' },
  { id: '12', name: 'Dividend Stocks', slug: 'dividend-stocks' },
  { id: '13', name: 'Small Cap Picks', slug: 'small-cap-picks' },
  { id: '14', name: 'Commodities', slug: 'commodities' },
  { id: '15', name: 'Market News', slug: 'market-news' },
];