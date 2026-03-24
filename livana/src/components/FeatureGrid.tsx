const features = [
  {
    title: 'Tinh khiết từ thiên nhiên',
    description: 'Chiết xuất tinh dầu từ hoa lá bản địa đạt chuẩn hữu cơ, giữ trọn hương nguyên bản.',
  },
  {
    title: 'Thư giãn tinh thần',
    description: 'Hương thơm cân bằng giúp làm dịu hệ thần kinh, hỗ trợ giấc ngủ sâu và phục hồi năng lượng.',
  },
  {
    title: 'Thân thiện môi trường',
    description: 'Lọ thủy tinh tái chế, mực in dầu nành và quy trình vận chuyển carbon thấp.',
  },
  {
    title: 'Thiết kế tinh giản',
    description: 'Phong cách tinh tế, dễ phối với mọi không gian sống tối giản và sang trọng.',
  },
];

const FeatureGrid = () => (
  <section className="space-y-8">
    <div className="space-y-3 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">Vì sao chọn LIVANA?</p>
      <h2 className="text-[clamp(1.05rem,4vw+0.25rem,1.875rem)] font-semibold text-textMain tracking-tight">Chăm sóc giác quan từ thiên nhiên</h2>
      <p className="text-base text-textMain/70 text-center">Bộ sản phẩm tinh dầu cho mọi khoảnh khắc: làm việc tập trung, thư giãn tại nhà hay thanh lọc không khí.</p>
    </div>
    <div className="grid gap-6 md:grid-cols-2">
      {features.map((feature) => (
        <article key={feature.title} className="rounded-3xl border border-primary/10 bg-white/80 p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-primary">{feature.title}</h3>
          <p className="mt-3 text-sm text-textMain/75">{feature.description}</p>
        </article>
      ))}
    </div>
  </section>
);

export default FeatureGrid;
