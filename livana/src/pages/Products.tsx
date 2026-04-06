import { useMemo, useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import SectionTitle from '../components/SectionTitle';
import Seo from '../components/Seo';
import { products } from '../data/products';
import { useCart } from '../hooks/useCart';
import type { Product, ProductCategory } from '../types/product';
import { createBreadcrumbSchema } from '../utils/structuredData';
import { getDefaultSize, getProductPrice } from '../utils/pricing';

const categories: { label: string; value: 'all' | ProductCategory }[] = [
  { label: 'Tat ca', value: 'all' },
  { label: 'Ngu ngon', value: 'sleep' },
  { label: 'Thu gian', value: 'relax' },
  { label: 'Tap trung', value: 'focus' },
  { label: 'Khong khi tuoi moi', value: 'fresh' },
  { label: 'Khac', value: 'other' },
];

const Products = () => {
  const { addToCart } = useCart();
  const [category, setCategory] = useState<typeof categories[number]['value']>('all');
  const [sort, setSort] = useState<'default' | 'price-asc' | 'price-desc' | 'newest'>('default');

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
        title="San pham"
        description="Bo suu tap tinh dau LIVANA gom cac mui huong thu gian, ngu ngon, lam moi khong gian va tang su tap trung. Xem chi tiet tung san pham va dung tich."
        url="/products"
        jsonLd={createBreadcrumbSchema([
          { name: 'Trang chu', path: '/' },
          { name: 'San pham', path: '/products' },
        ])}
      />
      <SectionTitle
        as="h1"
        heading="Bo suu tap tinh dau LIVANA"
        subheading="Hon 20 cong thuc phoi huong danh cho tung khoanh khac song xanh."
      />

      <div className="flex flex-wrap items-center gap-4 rounded-3xl border border-primary/10 bg-white/70 p-4 text-sm">
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item.value}
              className={`rounded-full px-4 py-2 font-semibold transition ${
                item.value === category ? 'bg-primary text-white' : 'bg-white text-textMain/70'
              }`}
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
          <option value="default">Sap xep mac dinh</option>
          <option value="price-asc">Gia tang dan</option>
          <option value="price-desc">Gia giam dan</option>
          <option value="newest">Moi nhat</option>
        </select>
      </div>

      <ProductGrid products={filtered} onAddToCart={handleAdd} emptyMessage="Chua co san pham thuoc danh muc nay." />
    </div>
  );
};

export default Products;
