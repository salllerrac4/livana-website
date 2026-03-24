import { Link, useParams } from 'react-router-dom';
import { getPostBySlug } from '../data/blogPosts';
import Seo from '../components/Seo';

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="space-y-4 text-center">
        <Seo title="Bài viết không tồn tại" noIndex />
        <p className="text-xl font-semibold">Bài viết không tồn tại.</p>
        <Link to="/blog" className="text-primary">
          Quay về Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="space-y-8">
      <Seo
        title={post.title}
        description={post.excerpt}
        image={post.coverImage}
        type="article"
        publishedTime={post.publishedAt}
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
          className="w-full max-h-[420px] rounded-3xl object-cover shadow-sm"
          loading="lazy"
        />
      )}
      <div className="space-y-5 text-base leading-relaxed text-textMain/80">
        {post.content.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <Link to="/blog" className="inline-flex text-sm font-semibold text-primary">
        ← Quay lại danh sách blog
      </Link>
    </article>
  );
};

export default BlogPost;
