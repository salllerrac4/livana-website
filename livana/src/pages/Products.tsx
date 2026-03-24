import { useMemo, useState } from 'react';
import ProductGrid from '../components/ProductGrid';
import SectionTitle from '../components/SectionTitle';
import { products } from '../data/products';
import type { Product, ProductCategory } from '../types/product';
import { useCart } from '../hooks/useCart';
import { getDefaultSize, getProductPrice } from '../utils/pricing';

const categories: { label: string; value: 'all' | ProductCategory }[] = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Ngủ ngon', value: 'sleep' },
  { label: 'Thư giãn', value: 'relax' },
  { label: 'Tập trung', value: 'focus' },
  { label: 'Không khí tươi mới', value: 'fresh' },
  { label: 'Khác', value: 'other' },
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
      <SectionTitle
        heading="Bộ sưu tập tinh dầu LIVANA"
        subheading="Hơn 20 công thức phối hương dành cho từng khoảnh khắc sống xanh."
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
          <option value="default">Sắp xếp mặc định</option>
          <option value="price-asc">Giá tăng dần</option>
          <option value="price-desc">Giá giảm dần</option>
          <option value="newest">Mới nhất</option>
        </select>
      </div>

      <ProductGrid products={filtered} onAddToCart={handleAdd} emptyMessage="Chưa có sản phẩm thuộc danh mục này." />
    </div>
  );
};

export default Products;
