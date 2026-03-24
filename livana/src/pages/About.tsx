import SectionTitle from '../components/SectionTitle';

const coreValues = [
  {
    title: 'Thiên nhiên thuần khiết',
    description: 'Nguồn nguyên liệu hữu cơ từ nông trại nhỏ tại Lâm Đồng, Huế và Sa Pa.',
  },
  {
    title: 'An toàn khoa học',
    description: 'Pha chế bởi chuyên gia mùi hương, đáp ứng tiêu chuẩn IFRA và CGMP.',
  },
  {
    title: 'Tối giản tinh tế',
    description: 'Bao bì thủy tinh tái chế, thiết kế tối giản phù hợp mọi phong cách sống.',
  },
  {
    title: 'Xanh bền vững',
    description: 'Đối tác trồng trọt được trả công công bằng, đóng góp quỹ tái trồng rừng hàng quý.',
  },
];

const steps = [
  {
    title: '1. Tuyển chọn nguyên liệu',
    content: 'LIVANA chỉ thu hoạch vào buổi sáng sớm khi tinh dầu đạt nồng độ cao nhất. Mỗi lô đều có chứng nhận xuất xứ rõ ràng.',
  },
  {
    title: '2. Chưng cất chậm',
    content: 'Quy trình chưng cất bằng hơi nước giữ nguyên đặc tính tự nhiên, không pha cồn hay dung môi công nghiệp.',
  },
  {
    title: '3. Đóng gói và kiểm định',
    content: 'Chai thủy tinh hổ phách chống tia UV, nắp gỗ sồi khắc laser cùng tem QR truy xuất nguồn gốc.',
  },
];

const About = () => (
  <div className="space-y-10">
    <SectionTitle
      heading="Câu chuyện LIVANA"
      subheading="LIVANA ra đời từ mong muốn mang thiên nhiên trở lại trong từng căn phòng đô thị. Thương hiệu được sáng lập bởi hai nhà thiết kế yêu thích lối sống xanh và trị liệu bằng mùi hương."
    />

    <p className="rounded-3xl bg-white/80 p-6 text-sm leading-relaxed text-textMain/80 shadow-sm">
      Chúng tôi tin rằng tinh dầu không chỉ là mùi hương mà còn là lời nhắc sống chậm và lắng nghe cơ thể. Từ khâu chọn hạt giống,
      chăm sóc vùng trồng đến thiết kế bao bì, mọi chi tiết đều được thực hiện thủ công với sự tôn trọng thiên nhiên. Mỗi bộ sưu tập
      đều gắn với một câu chuyện cảm hứng về vùng đất Việt Nam.
    </p>

    <section className="grid gap-6 md:grid-cols-2">
      {coreValues.map((value) => (
        <article key={value.title} className="rounded-3xl border border-primary/10 bg-white/70 p-6">
          <h3 className="text-xl font-semibold text-primary">{value.title}</h3>
          <p className="mt-2 text-sm text-textMain/80">{value.description}</p>
        </article>
      ))}
    </section>

    <section className="space-y-6">
      <h3 className="text-2xl font-semibold text-textMain">Hành trình của một giọt tinh dầu</h3>
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step) => (
          <article key={step.title} className="rounded-3xl bg-primary/5 p-6 text-sm text-textMain/80">
            <p className="font-semibold text-primary/80">{step.title}</p>
            <p className="mt-3 leading-relaxed">{step.content}</p>
          </article>
        ))}
      </div>
    </section>
  </div>
);

export default About;
