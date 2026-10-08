import banksData from '@/data/banks.json';
import blogData from '@/data/blog-posts.json';
import { BankOffer } from '@/types/bank';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  read_time: string;
  date: string;
  author: string;
  content: {
    type: 'p' | 'h2' | 'h3';
    text: string;
  }[];
}

export function getAllBanks(): BankOffer[] {
  return banksData as BankOffer[];
}

export function getBankBySlug(slug: string): BankOffer | undefined {
  return (banksData as BankOffer[]).find((b) => b.slug === slug);
}

export function getBanksByCategory(category: string): BankOffer[] {
  const all = getAllBanks();
  switch (category) {
    case 'darmowe':
      return all.filter((b) => b.category_tags.includes('darmowe') || b.monthly_fee === '0 zł');
    case 'bonus':
      return all.filter((b) => b.category_tags.includes('bonus') || b.bonus.includes('zł'));
    case 'dla-mlodych':
      return all.filter((b) => b.category_tags.includes('dla-mlodych') || b.category_tags.includes('najlepsze'));
    case 'mobilne':
      return all.filter((b) => b.category_tags.includes('mobilne') || b.blik);
    case 'bez-oplat':
      return all.filter((b) => b.monthly_fee === '0 zł');
    case 'najlepsze':
      return all.filter((b) => b.rating >= 9.2);
    default:
      return all;
  }
}

export function getAllBlogPosts(): BlogPost[] {
  return blogData as BlogPost[];
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return (blogData as BlogPost[]).find((p) => p.slug === slug);
}
