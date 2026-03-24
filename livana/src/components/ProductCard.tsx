import { Link } from 'react-router-dom';
import type { Product } from '../types/product';
import { getProductOriginalPrice, getProductPrice } from '../utils/pricing';
import Badge from './Badge';
import Button from './Button';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const defaultPrice = getProductPrice(product);
  const defaultOriginalPrice = getProductOriginalPrice(product);
  const discount = defaultOriginalPrice ? Math.round(((defaultOriginalPrice - defaultPrice) / defaultOriginalPrice) * 100) : null;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft transition hover:-translate-y-1">
      <div className="relative bg-white">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-72 w-full object-contain p-3"
          loading="lazy"
        />
        <div className="absolute left-4 top-4 flex flex-col gap-2">
          {product.isFeatured && <Badge label="Nổi bật" />}
          {discount && <Badge label={`- ${discount}%`} tone="warning" />}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <p className="text-sm uppercase tracking-widest text-primary/70">{product.category}</p>
          <h3 className="mt-2 text-xl font-semibold text-textMain">
            <Link to={`/products/${product.slug}`} className="hover:text-primary">
              {product.name}
            </Link>
          </h3>
          <p className="mt-2 text-sm text-textMain/70">{product.shortDescription}</p>
        </div>
        <div className="flex items-center gap-3 text-lg font-semibold text-primary">
          <span>{defaultPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
          {defaultOriginalPrice && (
            <span className="text-sm font-normal text-textMain/50 line-through">
              {defaultOriginalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </span>
          )}
        </div>
        <div className="mt-auto flex items-center gap-3">
          <Button to={`/products/${product.slug}`} className="flex-1">
            Xem chi tiết
          </Button>
          {onAddToCart && (
            <button
              onClick={() => onAddToCart(product)}
              className="rounded-full border border-primary px-4 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
            >
              + Giỏ
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
