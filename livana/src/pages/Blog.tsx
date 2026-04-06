import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import Seo from '../components/Seo';
import heroCover from '../assets/hero-1-desktop.jpg';
import { blogPosts } from '../data/blogPosts';
import { createBreadcrumbSchema } from '../utils/structuredData';

const Blog = () => (
  <div className="space-y-10">
    <Seo
      title="Blog"
      description="Nhat ky tinh dau, meo khuech tan an toan va cam hung song xanh tu LIVANA."
      image={heroCover}
      url="/blog"
      jsonLd={createBreadcrumbSchema([
        { name: 'Trang chu', path: '/' },
        { name: 'Blog', path: '/blog' },
      ])}
    />
    <SectionTitle
      as="h1"
      heading="Chuyen tinh dau va loi song xanh"
      subheading="Nhat ky mui huong, meo an toan va cam hung bai tri tu doi ngu LIVANA."
    />

    <div className="grid gap-6 md:grid-cols-2">
      {blogPosts.map((post) => (
        <article key={post.id} className="rounded-3xl border border-primary/10 bg-white/80 p-6 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-primary/70">{new Date(post.publishedAt).toLocaleDateString('vi-VN')}</p>
          <h2 className="mt-2 text-2xl font-semibold text-textMain">
            <Link to={`/blog/${post.slug}`} className="hover:text-primary">
              {post.title}
            </Link>
          </h2>
          <p className="mt-3 text-sm text-textMain/75">{post.excerpt}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-primary">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-primary/10 px-3 py-1">
                #{tag}
              </span>
            ))}
          </div>
          <Link to={`/blog/${post.slug}`} className="mt-6 inline-flex text-sm font-semibold text-primary">
            Doc tiep →
          </Link>
        </article>
      ))}
    </div>
  </div>
);

export default Blog;
