export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  coverAlt?: string;
  publishedAt: string;
  tags: string[];
}
