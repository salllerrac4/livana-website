import { useEffect, useMemo, useRef, useState, type TouchEvent, type PointerEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import Button from '../components/Button';
import { getProductBySlug, products } from '../data/products';
import { useCart } from '../hooks/useCart';
import { getProductOriginalPrice, getProductPrice } from '../utils/pricing';

const ProductDetail = () => {
  const { slug } = useParams();
  const product = slug ? getProductBySlug(slug) : undefined;
  const { addToCart } = useCart();

  const [size, setSize] = useState(product?.sizeOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const pointerStartX = useRef<number | null>(null);
  const swipeThreshold = 25;

  useEffect(() => {
    setSize(product?.sizeOptions[0]);
    setQuantity(1);
    setCurrentImageIndex(0);
  }, [product?.id]);

  const related = useMemo(
    () =>
      product
        ? products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3)
        : [],
    [product],
  );

  if (!product) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-xl font-semibold">Không tìm thấy sản phẩm.</p>
        <Button to="/products">Quay lại cửa hàng</Button>
      </div>
    );
  }

  const galleryImages = product.galleryImages?.length ? product.galleryImages : [product.imageUrl];
  const handlePrevImage = () =>
    setCurrentImageIndex((prev) => (galleryImages.length ? (prev - 1 + galleryImages.length) % galleryImages.length : prev));
  const handleNextImage = () =>
    setCurrentImageIndex((prev) => (galleryImages.length ? (prev + 1) % galleryImages.length : prev));
  const handleSwipe = (distance: number) => {
    if (Math.abs(distance) < swipeThreshold) return;
    if (distance > 0) {
      handlePrevImage();
    } else {
      handleNextImage();
    }
  };
  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };
  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? null;
    if (endX === null) {
      touchStartX.current = null;
      return;
    }
    const diff = endX - touchStartX.current;
    touchStartX.current = null;
    handleSwipe(diff);
  };
  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStartX.current = event.clientX;
  };
  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) return;
    const diff = event.clientX - pointerStartX.current;
    pointerStartX.current = null;
    handleSwipe(diff);
  };
  const handlePointerLeave = () => {
    pointerStartX.current = null;
  };

  const handleAddToCart = () => {
    if (!size) return;
    addToCart(product, size, quantity);
  };

  const selectedPrice = getProductPrice(product, size);
  const selectedOriginalPrice = getProductOriginalPrice(product, size);

  return (
    <div className="space-y-12">
      <div className="grid gap-8 rounded-[32px] bg-white/80 p-6 shadow-soft md:grid-cols-2">
        <div
          className="relative rounded-[32px] bg-white p-6"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          style={{ touchAction: 'pan-y' }}
        >
          <img
            src={galleryImages[currentImageIndex]}
            alt={`${product.name} hình ${currentImageIndex + 1}`}
            className="h-full w-full rounded-3xl object-contain"
          />
          {galleryImages.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Ảnh trước"
                onClick={handlePrevImage}
                className="group pointer-events-auto absolute left-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/80 text-lg shadow-lg transition hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span className="text-2xl leading-none text-textMain group-hover:text-primary">‹</span>
              </button>
              <button
                type="button"
                aria-label="Ảnh sau"
                onClick={handleNextImage}
                className="group pointer-events-auto absolute right-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/80 text-lg shadow-lg transition hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span className="text-2xl leading-none text-textMain group-hover:text-primary">›</span>
              </button>
            </>
          )}
          <div className="pointer-events-none absolute left-1/2 bottom-4 -translate-x-1/2 rounded-full bg-white/80 px-4 py-1 text-sm font-semibold text-textMain shadow-md">
            {currentImageIndex + 1} / {galleryImages.length}
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.4em] text-primary/70">{product.category}</p>
            <h1 className="text-3xl font-semibold text-textMain">{product.name}</h1>
            <p className="text-sm text-textMain/75">{product.shortDescription}</p>
            <div className="flex items-center gap-4 text-2xl font-semibold text-primary">
              <span>{selectedPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
              {selectedOriginalPrice && (
                <span className="text-base text-textMain/50 line-through">
                  {selectedOriginalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </span>
              )}
            </div>
            {product.rating && (
              <p className="text-sm text-textMain/80">Đánh giá trung bình: {product.rating.toFixed(1)}/5</p>
            )}
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary/80">Nốt hương</p>
            <ul className="mt-2 flex flex-wrap gap-2 text-sm text-textMain/80">
              {product.scentNotes.map((note) => (
                <li key={note} className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                  {note}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <div>
              <p className="text-xs uppercase tracking-widest text-textMain/50">Dung tích</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizeOptions.map((option) => (
                  <button
                    key={option}
                    className={`rounded-full border px-4 py-2 ${option === size ? 'border-primary bg-primary text-white' : 'border-primary/30'}`}
                    onClick={() => setSize(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-textMain/50">Số lượng</p>
              <div className="mt-2 flex items-center gap-3 rounded-full border border-primary/30 px-3">
                <button className="p-2 text-lg" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))} aria-label="Giảm số lượng">
                  -
                </button>
                <span className="w-8 text-center text-base font-semibold">{quantity}</span>
                <button className="p-2 text-lg" onClick={() => setQuantity((prev) => prev + 1)} aria-label="Tăng số lượng">
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={handleAddToCart} disabled={!size}>
              Thêm vào giỏ
            </Button>
            <Button to="/cart" variant="secondary">
              Xem giỏ hàng
            </Button>
          </div>
        </div>
      </div>

      <section aria-label="Thông tin chi tiết sản phẩm">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)] lg:gap-8">
          <div className="space-y-4">
            <article className="rounded-3xl border border-emerald-50 bg-white p-6 shadow-sm sm:p-7">
              <h3 className="mb-2 text-lg font-semibold text-emerald-950">Mô tả chi tiết</h3>
              <p className="text-sm leading-relaxed text-slate-700 sm:text-base">{product.description}</p>
            </article>
            <article className="rounded-3xl border border-emerald-50 bg-white p-6 shadow-sm sm:p-7">
              <h3 className="mb-2 text-lg font-semibold text-emerald-950">Trải nghiệm & công dụng</h3>
              <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
                Tinh dầu LIVANA mang lại cảm giác thư thái mỗi ngày, cân bằng cảm xúc bằng hương thơm tinh tế từ thiên nhiên.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700 sm:text-base">
                <li className="flex items-start gap-2">
                  <span aria-hidden="true" className="text-lg">🌿</span>
                  <span>Tạo không gian thư giãn, trong lành</span>
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden="true" className="text-lg">😴</span>
                  <span>Hỗ trợ giảm căng thẳng và ngủ sâu hơn</span>
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden="true" className="text-lg">🏡</span>
                  <span>Phù hợp cho phòng ngủ, phòng khách hoặc góc làm việc</span>
                </li>
              </ul>
            </article>
          </div>

          <div className="space-y-4">
            <article className="rounded-3xl border border-emerald-50 bg-white p-6 shadow-sm sm:p-7">
              <h4 className="mb-2 text-lg font-semibold text-emerald-950">Thành phần</h4>
              <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
                98% nguyên liệu hữu cơ được kiểm định IFRA, chứng cất chậm để giữ lại các phân tử hương tinh khiết nhất. Không chứa chất bảo quản tổng hợp.
              </p>
            </article>
            <article className="rounded-3xl border border-emerald-50 bg-white p-6 shadow-sm sm:p-7">
              <h4 className="mb-2 text-lg font-semibold text-emerald-950">Hướng dẫn sử dụng</h4>
              <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
                Nhỏ 5-8 giọt vào 100ml nước trong máy khuếch tán hoặc pha 1 giọt với 5ml dầu nền để massage thư giãn. Đậy kín nắp sau khi dùng.
              </p>
            </article>
            <article className="rounded-3xl border border-amber-100 bg-amber-50 p-6 shadow-sm sm:p-7">
              <h4 className="mb-2 text-lg font-semibold text-amber-900">Lưu ý an toàn</h4>
              <p className="text-sm leading-relaxed text-slate-800 sm:text-base">
                Không uống trực tiếp tinh dầu, tránh tiếp xúc với mắt và để xa tầm tay trẻ nhỏ. Ngưng sử dụng nếu có dấu hiệu kích ứng và liên hệ bác sĩ.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-textMain">Gợi ý thêm cho bạn</h3>
          <Link to="/products" className="text-sm font-semibold text-primary">
            Xem tất cả sản phẩm
          </Link>
        </div>
        <ProductGrid products={related} emptyMessage="Hiện chưa có sản phẩm liên quan." />
      </section>
    </div>
  );
};

export default ProductDetail;





