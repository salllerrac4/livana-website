import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import SectionTitle from '../components/SectionTitle';
import Seo from '../components/Seo';
import { products } from '../data/products';
import { useCart } from '../hooks/useCart';
import type { Product, ProductCategory } from '../types/product';
import { createBreadcrumbSchema, createFAQSchema, type JsonLd } from '../utils/structuredData';
import { getDefaultSize, getProductPrice } from '../utils/pricing';

const categories: { label: string; value: 'all' | ProductCategory }[] = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Ngủ ngon', value: 'sleep' },
  { label: 'Thư giãn', value: 'relax' },
  { label: 'Tập trung', value: 'focus' },
  { label: 'Không khí tươi mới', value: 'fresh' },
  { label: 'Khác', value: 'other' },
];

const collectionHighlights = [
  {
    title: 'Tinh dầu cho phòng ngủ',
    description: 'Ưu tiên nhóm mùi hương dịu, ấm và thư giãn như oải hương, hoa cam hoặc gỗ tuyết tùng để khuếch tán trước khi ngủ.',
  },
  {
    title: 'Tinh dầu cho góc làm việc',
    description: 'Mùi bạc hà, sả chanh, hương thảo và các nốt thảo mộc giúp không gian tinh gọn, dễ tập trung và ít bị bí mùi.',
  },
  {
    title: 'Tinh dầu cho phòng khách',
    description: 'Hương cam, quế, trà trắng và các combo khuếch tán phù hợp với không gian chung, dễ tiếp khách và khử mùi hằng ngày.',
  },
];

const productFaqs = [
  {
    question: 'Nên chọn tinh dầu nào nếu muốn ngủ ngon hơn?',
    answer: 'Hãy ưu tiên các mùi thuộc nhóm sleep hoặc relax, đặc biệt là oải hương và những nốt hương dịu nhẹ để khuếch tán trước khi ngủ.',
  },
  {
    question: 'Trang sản phẩm LIVANA có giúp chọn mùi theo nhu cầu không?',
    answer: 'Có. Danh mục được chia theo nhu cầu như ngủ ngon, thư giãn, tập trung và làm mới không gian để người dùng lọc nhanh hơn.',
  },
  {
    question: 'Dùng tinh dầu tại nhà cần lưu ý điều gì?',
    answer: 'Chỉ nên khuếch tán trong thời gian vừa phải, giữ phòng thông thoáng và pha loãng với dầu nền nếu muốn dùng trên da.',
  },
];

const Products = () => {
  const { addToCart } = useCart();
  const [category, setCategory] = useState<typeof categories[number]['value']>('all');
  const [sort, setSort] = useState<'default' | 'price-asc' | 'price-desc' | 'newest'>('default');
  const featuredProducts = products.filter((item) => item.isFeatured).slice(0, 3);
  const breadcrumbJsonLd = createBreadcrumbSchema([
    { name: 'Trang chủ', path: '/' },
    { name: 'Sản phẩm', path: '/products' },
  ]);
  const faqJsonLd = createFAQSchema(productFaqs);
  const seoSchemas = [breadcrumbJsonLd, faqJsonLd].filter((schema): schema is JsonLd => Boolean(schema));

  const filtered = useMemo(() => {
    let current: Product[] = category === 'all' ? products : products.filter((item) => item.category === category);
    switch (sort) {
      case 'price-asc':
        current = [...current].sort((a, b) => getProductPrice(a) - getProductPrice(b));
        break;
      case 'price-desc':
        current = [...current].sort((a, b) => getProductPrice(b) - getProductPrice(a));
        break;
      case 'newest':
        current = [...current].sort((a, b) => Number(b.id.replace('p', '')) - Number(a.id.replace('p', '')));
        break;
      default:
        current = [...current];
    }
    return current;
  }, [category, sort]);

  const handleAdd = (product: Product) => {
    const defaultSize = getDefaultSize(product) || '10ml';
    addToCart(product, defaultSize, 1);
  };

  return (
    <div className="space-y-10">
      <Seo
        title="Sản phẩm"
        description="Bộ sưu tập tinh dầu thiên nhiên LIVANA cho phòng ngủ, phòng khách và góc làm việc. Khám phá các mùi hương ngủ ngon, thư giãn, tập trung và làm mới không gian."
        url="/products"
        jsonLd={seoSchemas}
      />
      <SectionTitle as="h1" heading="Bộ sưu tập tinh dầu LIVANA" subheading="Hơn 20 công thức phối hương dành cho từng khoảnh khắc sống xanh." />

      <div className="flex flex-wrap items-center gap-4 rounded-3xl border border-primary/10 bg-white/70 p-4 text-sm">
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item.value}
              type="button"
              className={`rounded-full px-4 py-2 font-semibold transition ${item.value === category ? 'bg-primary text-white' : 'bg-white text-textMain/70'}`}
              onClick={() => setCategory(item.value)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(event) => setSort(event.target.value as typeof sort)}
          className="ml-auto rounded-full border border-primary/20 px-4 py-2 text-sm"
        >
          <option value="default">Sắp xếp mặc định</option>
          <option value="price-asc">Giá tăng dần</option>
          <option value="price-desc">Giá giảm dần</option>
          <option value="newest">Mới nhất</option>
        </select>
      </div>

      <ProductGrid products={filtered} onAddToCart={handleAdd} emptyMessage="Chưa có sản phẩm thuộc danh mục này." />

      <section className="grid gap-5 md:grid-cols-3">
        {collectionHighlights.map((item) => (
          <article key={item.title} className="rounded-3xl border border-primary/10 bg-white/90 p-5">
            <h2 className="text-lg font-semibold text-textMain">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-textMain/75">{item.description}</p>
          </article>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-textMain">Cách chọn tinh dầu thiên nhiên theo nhu cầu</h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-textMain/80 md:text-[15px]">
          <p>
            Trang sản phẩm này được tối ưu để người dùng tìm nhanh các dòng tinh dầu khuếch tán theo mục đích sử dụng. Nếu bạn muốn tìm tinh dầu cho phòng
            ngủ, hãy ưu tiên mùi hương dịu nhẹ thuộc nhóm sleep và relax. Nếu bạn cần tinh dầu cho góc làm việc, nhóm fresh và focus sẽ phù hợp hơn.
          </p>
          <p>
            Bên cạnh việc lọc theo danh mục, bạn nên xem thêm mô tả nốt hương, dung tích và cách dùng trong từng trang chi tiết. Đây là những thông tin giúp
            Google nhận diện rằng đây không chỉ là trang listing, mà là một trang danh mục hữu ích có giá trị hướng dẫn chọn mua thực tế.
          </p>
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-2xl font-semibold text-textMain">Sản phẩm được tìm nhiều</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {featuredProducts.map((item) => (
            <article key={item.id} className="rounded-3xl border border-primary/10 bg-white p-5">
              <h3 className="text-lg font-semibold text-textMain">{item.name}</h3>
              <p className="mt-3 text-sm leading-6 text-textMain/75">{item.shortDescription}</p>
              <Link to={`/products/${item.slug}`} className="mt-4 inline-flex text-sm font-semibold text-primary">
                Xem sản phẩm {'->'}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-2xl font-semibold text-textMain">Câu hỏi thường gặp khi chọn tinh dầu</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {productFaqs.map((item) => (
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

export default Products;
