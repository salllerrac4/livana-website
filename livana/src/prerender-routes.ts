import { blogPosts } from './data/blogPosts';
import { products } from './data/products';

const staticRoutes = ['/', '/products', '/about', '/blog', '/contact'];
const utilityRoutes = ['/cart'];

export const sitemapRoutes = [
  ...staticRoutes,
  ...products.map((product) => `/products/${product.slug}`),
  ...blogPosts.map((post) => `/blog/${post.slug}`),
];

export const prerenderRoutes = [
  ...sitemapRoutes,
  ...utilityRoutes,
];
