import type { Product } from '../types/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  emptyMessage?: string;
}

const ProductGrid = ({ products, onAddToCart, emptyMessage = 'Chưa có sản phẩm nào.' }: ProductGridProps) => {
  if (!products.length) {
    return <p className="rounded-2xl bg-white/50 p-6 text-center text-textMain/70">{emptyMessage}</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};

export default ProductGrid;
