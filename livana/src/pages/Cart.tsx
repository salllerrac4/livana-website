import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { useCart } from '../hooks/useCart';
import { getProductPrice } from '../utils/pricing';

const Cart = () => {
  const { cartItems, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();

  return (
    <div className="space-y-8">
      <SectionTitle heading="Giỏ hàng của bạn" subheading="Kiểm tra số lượng và hoàn tất đơn hàng trong vài bước." />

      {cartItems.length === 0 ? (
        <div className="rounded-3xl bg-white/70 p-6 text-center text-sm text-textMain/70">
          <p>Giỏ hàng đang trống.</p>
          <Button to="/products" className="mt-4">
            Tiếp tục mua sắm
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={`${item.product.id}-${item.size}`} className="flex flex-col gap-4 rounded-3xl border border-primary/10 bg-white/80 p-4 md:flex-row md:items-center">
                <img src={item.product.imageUrl} alt={item.product.name} className="h-32 w-full rounded-2xl object-cover md:w-40" />
                <div className="flex flex-1 flex-col gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-primary/60">{item.product.category}</p>
                    <h3 className="text-xl font-semibold text-textMain">{item.product.name}</h3>
                    <p className="text-sm text-textMain/70">Dung tích: {item.size}</p>
                    <p className="text-sm text-textMain/60">
                      Đơn giá: {getProductPrice(item.product, item.size).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-3 rounded-full border border-primary/30 px-3">
                      <button onClick={() => updateQuantity(item.product.id, item.size, Math.max(1, item.quantity - 1))}>−</button>
                      <span className="w-6 text-center font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}>+</button>
                    </div>
                    <p className="text-lg font-semibold text-primary">
                      {(getProductPrice(item.product, item.size) * item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </p>
                    <button className="text-sm font-semibold text-textMain/60 underline" onClick={() => removeFromCart(item.product.id, item.size)}>
                      Xóa
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-4 rounded-3xl border border-primary/20 bg-white/80 p-6 text-sm text-textMain/80">
            <p>
              Tổng sản phẩm: <strong>{totalItems}</strong>
            </p>
            <p>
              Tạm tính:{' '}
              <strong className="text-primary">
                {totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              </strong>
            </p>
            <div className="flex flex-wrap gap-3">
              <Button to="/products" variant="secondary">
                Tiếp tục mua sắm
              </Button>
              <button className="flex-1 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white opacity-70" disabled>
                Thanh toán (demo)
              </button>
            </div>
            <p className="text-xs text-textMain/60">Thanh toán chỉ mang tính minh họa. Đội ngũ LIVANA sẽ liên hệ để xác nhận đơn.</p>
            <button onClick={clearCart} className="text-xs font-semibold text-textMain/60 underline">
              Xóa toàn bộ giỏ hàng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
