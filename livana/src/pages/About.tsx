import SectionTitle from '../components/SectionTitle';
import Seo from '../components/Seo';
import { createBreadcrumbSchema } from '../utils/structuredData';

const coreValues = [
  {
    title: 'Thien nhien thuan khiet',
    description: 'Nguon nguyen lieu huu co tu nong trai nho tai Lam Dong, Hue va Sa Pa.',
  },
  {
    title: 'An toan khoa hoc',
    description: 'Pha che boi chuyen gia mui huong, dap ung tieu chuan IFRA va CGMP.',
  },
  {
    title: 'Toi gian tinh te',
    description: 'Bao bi thuy tinh tai che, thiet ke toi gian phu hop moi phong cach song.',
  },
  {
    title: 'Xanh ben vung',
    description: 'Doi tac trong trot duoc tra cong cong bang, dong gop quy tai trong rung hang quy.',
  },
];

const steps = [
  {
    title: '1. Tuyen chon nguyen lieu',
    content: 'LIVANA chi thu hoach vao buoi sang som khi tinh dau dat nong do cao nhat. Moi lo deu co chung nhan xuat xu ro rang.',
  },
  {
    title: '2. Chung cat cham',
    content: 'Quy trinh chung cat bang hoi nuoc giu nguyen dac tinh tu nhien, khong pha con hay dung moi cong nghiep.',
  },
  {
    title: '3. Dong goi va kiem dinh',
    content: 'Chai thuy tinh ho phach chong tia UV, nap go soi khac laser cung tem QR truy xuat nguon goc.',
  },
];

const About = () => (
  <div className="space-y-10">
    <Seo
      title="Ve LIVANA"
      description="Tim hieu cau chuyen thuong hieu LIVANA, quy trinh chon nguyen lieu, chung cat va cac gia tri theo duoi trong tung chai tinh dau."
      url="/about"
      jsonLd={createBreadcrumbSchema([
        { name: 'Trang chu', path: '/' },
        { name: 'Ve LIVANA', path: '/about' },
      ])}
    />
    <SectionTitle
      as="h1"
      heading="Cau chuyen LIVANA"
      subheading="LIVANA ra doi tu mong muon mang thien nhien tro lai trong tung can phong do thi. Thuong hieu duoc sang lap boi nhung nguoi yeu loi song xanh va tri lieu bang mui huong."
    />

    <p className="rounded-3xl bg-white/80 p-6 text-sm leading-relaxed text-textMain/80 shadow-sm">
      Chung toi tin rang tinh dau khong chi la mui huong ma con la loi nhac song cham va lang nghe co the. Tu khau chon hat giong, cham soc vung trong den
      thiet ke bao bi, moi chi tiet deu duoc thuc hien thu cong voi su ton trong thien nhien. Moi bo suu tap deu gan voi mot cau chuyen cam hung ve vung dat Viet Nam.
    </p>

    <section className="grid gap-6 md:grid-cols-2">
      {coreValues.map((value) => (
        <article key={value.title} className="rounded-3xl border border-primary/10 bg-white/70 p-6">
          <h2 className="text-xl font-semibold text-primary">{value.title}</h2>
          <p className="mt-2 text-sm text-textMain/80">{value.description}</p>
        </article>
      ))}
    </section>

    <section className="space-y-6">
      <h2 className="text-2xl font-semibold text-textMain">Hanh trinh cua mot giot tinh dau</h2>
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
