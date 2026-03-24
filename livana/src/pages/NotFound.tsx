import Button from '../components/Button';

const NotFound = () => (
  <div className="space-y-4 text-center">
    <h1 className="text-4xl font-semibold text-textMain">Trang không tồn tại</h1>
    <p className="text-sm text-textMain/70">Có thể đường dẫn đã thay đổi hoặc sản phẩm/blog đã bị gỡ.</p>
    <div className="flex flex-wrap justify-center gap-3">
      <Button to="/">Về trang chủ</Button>
      <Button to="/products" variant="secondary">
        Xem sản phẩm
      </Button>
    </div>
  </div>
);

export default NotFound;
