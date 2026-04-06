import { blogPosts } from './data/blogPosts';
import { products } from './data/products';

const staticRoutes = ['/', '/products', '/about', '/blog', '/contact'];

export const prerenderRoutes = [
  ...staticRoutes,
  ...products.map((product) => `/products/${product.slug}`),
  ...blogPosts.map((post) => `/blog/${post.slug}`),
];
