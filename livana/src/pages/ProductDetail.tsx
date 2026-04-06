import { useEffect, useMemo, useRef, useState, type TouchEvent, type PointerEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import Button from '../components/Button';
import Seo from '../components/Seo';
import { getProductBySlug, products } from '../data/products';
import { useCart } from '../hooks/useCart';
import { createBreadcrumbSchema, createProductSchema } from '../utils/structuredData';
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
        <Seo title="San pham khong ton tai" noIndex />
        <p className="text-xl font-semibold">KhÃ´ng tÃ¬m tháº¥y sáº£n pháº©m.</p>
        <Button to="/products">Quay láº¡i cá»­a hÃ ng</Button>
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
  const metaDescription = `${product.shortDescription} Not huong: ${product.scentNotes.join(', ')}. Xem chi tiet san pham ${product.name} tai LIVANA.`;
  const productPath = `/products/${product.slug}`;
  const structuredData = [
    createProductSchema(product, productPath),
    createBreadcrumbSchema([
      { name: 'Trang chu', path: '/' },
      { name: 'San pham', path: '/products' },
      { name: product.name, path: productPath },
    ]),
  ];

  return (
    <div className="space-y-12">
      <Seo
        title={product.name}
        description={metaDescription}
        image={product.imageUrl}
        url={productPath}
        jsonLd={structuredData}
      />
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
            alt={`${product.name} hÃ¬nh ${currentImageIndex + 1}`}
            className="h-full w-full rounded-3xl object-contain"
          />
          {galleryImages.length > 1 && (
            <>
              <button
                type="button"
                aria-label="áº¢nh trÆ°á»›c"
                onClick={handlePrevImage}
                className="group pointer-events-auto absolute left-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/80 text-lg shadow-lg transition hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span className="text-2xl leading-none text-textMain group-hover:text-primary">â€¹</span>
              </button>
              <button
                type="button"
                aria-label="áº¢nh sau"
                onClick={handleNextImage}
                className="group pointer-events-auto absolute right-5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/80 text-lg shadow-lg transition hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span className="text-2xl leading-none text-textMain group-hover:text-primary">â€º</span>
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
              <p className="text-sm text-textMain/80">ÄÃ¡nh giÃ¡ trung bÃ¬nh: {product.rating.toFixed(1)}/5</p>
            )}
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary/80">Ná»‘t hÆ°Æ¡ng</p>
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
              <p className="text-xs uppercase tracking-widest text-textMain/50">Dung tÃ­ch</p>
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
              <p className="text-xs uppercase tracking-widest text-textMain/50">Sá»‘ lÆ°á»£ng</p>
              <div className="mt-2 flex items-center gap-3 rounded-full border border-primary/30 px-3">
                <button className="p-2 text-lg" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))} aria-label="Giáº£m sá»‘ lÆ°á»£ng">
                  -
                </button>
                <span className="w-8 text-center text-base font-semibold">{quantity}</span>
                <button className="p-2 text-lg" onClick={() => setQuantity((prev) => prev + 1)} aria-label="TÄƒng sá»‘ lÆ°á»£ng">
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button onClick={handleAddToCart} disabled={!size}>
              ThÃªm vÃ o giá»
            </Button>
            <Button to="/cart" variant="secondary">
              Xem giá» hÃ ng
            </Button>
          </div>
        </div>
      </div>

      <section aria-label="ThÃ´ng tin chi tiáº¿t sáº£n pháº©m">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)] lg:gap-8">
          <div className="space-y-4">
            <article className="rounded-3xl border border-emerald-50 bg-white p-6 shadow-sm sm:p-7">
              <h3 className="mb-2 text-lg font-semibold text-emerald-950">MÃ´ táº£ chi tiáº¿t</h3>
              <p className="text-sm leading-relaxed text-slate-700 sm:text-base">{product.description}</p>
            </article>
            <article className="rounded-3xl border border-emerald-50 bg-white p-6 shadow-sm sm:p-7">
              <h3 className="mb-2 text-lg font-semibold text-emerald-950">Tráº£i nghiá»‡m & cÃ´ng dá»¥ng</h3>
              <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
                Tinh dáº§u LIVANA mang láº¡i cáº£m giÃ¡c thÆ° thÃ¡i má»—i ngÃ y, cÃ¢n báº±ng cáº£m xÃºc báº±ng hÆ°Æ¡ng thÆ¡m tinh táº¿ tá»« thiÃªn nhiÃªn.
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700 sm:text-base">
                <li className="flex items-start gap-2">
                  <span aria-hidden="true" className="text-lg">ðŸŒ¿</span>
                  <span>Táº¡o khÃ´ng gian thÆ° giÃ£n, trong lÃ nh</span>
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden="true" className="text-lg">ðŸ˜´</span>
                  <span>Há»— trá»£ giáº£m cÄƒng tháº³ng vÃ  ngá»§ sÃ¢u hÆ¡n</span>
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden="true" className="text-lg">ðŸ¡</span>
                  <span>PhÃ¹ há»£p cho phÃ²ng ngá»§, phÃ²ng khÃ¡ch hoáº·c gÃ³c lÃ m viá»‡c</span>
                </li>
              </ul>
            </article>
          </div>

          <div className="space-y-4">
            <article className="rounded-3xl border border-emerald-50 bg-white p-6 shadow-sm sm:p-7">
              <h4 className="mb-2 text-lg font-semibold text-emerald-950">ThÃ nh pháº§n</h4>
              <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
                98% nguyÃªn liá»‡u há»¯u cÆ¡ Ä‘Æ°á»£c kiá»ƒm Ä‘á»‹nh IFRA, chá»©ng cáº¥t cháº­m Ä‘á»ƒ giá»¯ láº¡i cÃ¡c phÃ¢n tá»­ hÆ°Æ¡ng tinh khiáº¿t nháº¥t. KhÃ´ng chá»©a cháº¥t báº£o quáº£n tá»•ng há»£p.
              </p>
            </article>
            <article className="rounded-3xl border border-emerald-50 bg-white p-6 shadow-sm sm:p-7">
              <h4 className="mb-2 text-lg font-semibold text-emerald-950">HÆ°á»›ng dáº«n sá»­ dá»¥ng</h4>
              <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
                Nhá» 5-8 giá»t vÃ o 100ml nÆ°á»›c trong mÃ¡y khuáº¿ch tÃ¡n hoáº·c pha 1 giá»t vá»›i 5ml dáº§u ná»n Ä‘á»ƒ massage thÆ° giÃ£n. Äáº­y kÃ­n náº¯p sau khi dÃ¹ng.
              </p>
            </article>
            <article className="rounded-3xl border border-amber-100 bg-amber-50 p-6 shadow-sm sm:p-7">
              <h4 className="mb-2 text-lg font-semibold text-amber-900">LÆ°u Ã½ an toÃ n</h4>
              <p className="text-sm leading-relaxed text-slate-800 sm:text-base">
                KhÃ´ng uá»‘ng trá»±c tiáº¿p tinh dáº§u, trÃ¡nh tiáº¿p xÃºc vá»›i máº¯t vÃ  Ä‘á»ƒ xa táº§m tay tráº» nhá». NgÆ°ng sá»­ dá»¥ng náº¿u cÃ³ dáº¥u hiá»‡u kÃ­ch á»©ng vÃ  liÃªn há»‡ bÃ¡c sÄ©.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-textMain">Gá»£i Ã½ thÃªm cho báº¡n</h3>
          <Link to="/products" className="text-sm font-semibold text-primary">
            Xem táº¥t cáº£ sáº£n pháº©m
          </Link>
        </div>
        <ProductGrid products={related} emptyMessage="Hiá»‡n chÆ°a cÃ³ sáº£n pháº©m liÃªn quan." />
      </section>
    </div>
  );
};

export default ProductDetail;
