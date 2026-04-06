import { Link, useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import { getPostBySlug } from '../data/blogPosts';
import { createBlogPostingSchema, createBreadcrumbSchema } from '../utils/structuredData';

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="space-y-4 text-center">
        <Seo title="Bai viet khong ton tai" noIndex />
        <p className="text-xl font-semibold">Bai viet khong ton tai.</p>
        <Link to="/blog" className="text-primary">
          Quay ve Blog
        </Link>
      </div>
    );
  }

  const postPath = `/blog/${post.slug}`;

  return (
    <article className="space-y-8">
      <Seo
        title={post.title}
        description={post.excerpt}
        image={post.coverImage}
        url={postPath}
        type="article"
        publishedTime={post.publishedAt}
        jsonLd={[
          createBlogPostingSchema(post),
          createBreadcrumbSchema([
            { name: 'Trang chu', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: postPath },
          ]),
        ]}
      />
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-primary/70">{new Date(post.publishedAt).toLocaleDateString('vi-VN')}</p>
        <h1 className="text-4xl font-semibold text-textMain">{post.title}</h1>
        <div className="flex flex-wrap gap-2 text-xs font-semibold text-primary">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-primary/10 px-3 py-1">
              #{tag}
            </span>
          ))}
        </div>
      </div>
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.coverAlt ?? post.title}
          className="max-h-[420px] w-full rounded-3xl object-cover shadow-sm"
          loading="lazy"
        />
      )}
      <div className="space-y-5 text-base leading-relaxed text-textMain/80">
        {post.content.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <Link to="/blog" className="inline-flex text-sm font-semibold text-primary">
        ← Quay lai danh sach blog
      </Link>
    </article>
  );
};

export default BlogPost;
