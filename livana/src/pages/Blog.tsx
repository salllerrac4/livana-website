import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import Seo from '../components/Seo';
import heroCover from '../assets/hero-1-desktop.jpg';
import { blogPosts } from '../data/blogPosts';
import { createBreadcrumbSchema, createFAQSchema, type JsonLd } from '../utils/structuredData';

const blogHighlights = [
  {
    title: 'Hướng dẫn sử dụng tinh dầu an toàn',
    description: 'Giải thích cách pha loãng, cách khuếch tán và những lưu ý khi trong nhà có trẻ nhỏ hoặc thú cưng.',
  },
  {
    title: 'Gợi ý mùi hương theo từng nhu cầu',
    description: 'Từ ngủ ngon, thư giãn đến tập trung làm việc, mỗi bài viết đều được viết theo tình huống sử dụng cụ thể.',
  },
  {
    title: 'Nội dung hữu ích để Google hiểu website',
    description: 'Trang blog bao phủ các từ khóa liên quan đến tinh dầu thiên nhiên, chăm sóc không gian và lối sống xanh.',
  },
];

const blogFaqs = [
  {
    question: 'Nên đọc bài viết nào nếu mới bắt đầu tìm hiểu về tinh dầu?',
    answer: 'Hãy bắt đầu từ các bài viết hướng dẫn cơ bản về khuếch tán, pha loãng và chọn mùi hương theo mục tiêu sử dụng.',
  },
  {
    question: 'Blog LIVANA có phù hợp để tìm mẹo dùng tinh dầu tại nhà không?',
    answer: 'Có. Nội dung tập trung vào tình huống thực tế tại nhà, phòng ngủ, phòng khách và góc làm việc thay vì chỉ mô tả sản phẩm.',
  },
  {
    question: 'Tại sao trang blog quan trọng với SEO?',
    answer: 'Blog giúp website bao phủ nhiều truy vấn tìm kiếm thông tin, tăng cơ hội được index và tạo thêm điểm chạm nội dung cho thương hiệu.',
  },
];

const Blog = () => {
  const breadcrumbJsonLd = createBreadcrumbSchema([
    { name: 'Trang chủ', path: '/' },
    { name: 'Blog', path: '/blog' },
  ]);
  const faqJsonLd = createFAQSchema(blogFaqs);
  const seoSchemas = [breadcrumbJsonLd, faqJsonLd].filter((schema): schema is JsonLd => Boolean(schema));

  return (
    <div className="space-y-10">
      <Seo
        title="Blog"
        description="Blog tinh dầu LIVANA chia sẻ mẹo khuếch tán an toàn, cách chọn mùi hương theo nhu cầu và cảm hứng sống xanh cho mọi không gian."
        image={heroCover}
        url="/blog"
        jsonLd={seoSchemas}
      />
      <SectionTitle
        as="h1"
        heading="Chuyện tinh dầu và lối sống xanh"
        subheading="Nội dung về tinh dầu thiên nhiên, mẹo an toàn và cách tạo không gian sống dễ chịu từ đội ngũ LIVANA."
      />

      <section className="grid gap-5 md:grid-cols-3">
        {blogHighlights.map((item) => (
          <article key={item.title} className="rounded-3xl border border-primary/10 bg-white/90 p-5">
            <h2 className="text-lg font-semibold text-textMain">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-textMain/75">{item.description}</p>
          </article>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-textMain">Blog này giúp gì cho người đang tìm tinh dầu?</h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-textMain/80 md:text-[15px]">
          <p>
            Trang blog của LIVANA được xây để trả lời những câu hỏi mà người dùng thường tìm trên Google, từ cách chọn tinh dầu cho phòng ngủ, phòng khách đến
            hướng dẫn khuếch tán an toàn tại nhà. Đây là lớp nội dung hỗ trợ rất quan trọng bên cạnh trang sản phẩm.
          </p>
          <p>
            Khi website có thêm bài viết hữu ích, Google sẽ dễ hiểu hơn về chủ đề chính của thương hiệu: tinh dầu thiên nhiên, lối sống xanh, mẹo chăm sóc
            không gian và sự thư giãn trong sinh hoạt hằng ngày. Điều này giúp tăng khả năng index và mở rộng tập từ khóa có thể hiển thị.
          </p>
        </div>
      </section>

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
              Đọc tiếp {'->'}
            </Link>
          </article>
        ))}
      </div>

      <section className="space-y-5">
        <h2 className="text-2xl font-semibold text-textMain">Câu hỏi thường gặp về blog tinh dầu</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {blogFaqs.map((item) => (
            <article key={item.question} className="rounded-3xl border border-primary/10 bg-white p-5">
              <h3 className="text-base font-semibold text-textMain">{item.question}</h3>
              <p className="mt-3 text-sm leading-6 text-textMain/75">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blog;
