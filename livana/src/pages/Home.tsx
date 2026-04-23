import FeatureGrid from '../components/FeatureGrid';
import HeroSection from '../components/HeroSection';
import ProductGrid from '../components/ProductGrid';
import ReviewCard from '../components/ReviewCard';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import Seo from '../components/Seo';
import { products } from '../data/products';
import usageGuideImg from '../assets/usage-guide.jpg';
import { createOrganizationSchema, createWebsiteSchema } from '../utils/structuredData';

const reviewList = [
  {
    name: 'Lan Chi - Hà Nội',
    title: 'Không gian ngủ dễ chịu hơn',
    message: 'Hương phòng ngủ trước khi ngủ giúp mình bỏ điện thoại sớm và ngủ sâu hơn.',
    rating: 5,
  },
  {
    name: 'Gia Khang - TP.HCM',
    title: 'Góc làm việc tinh gọn',
    message: 'Hương thảo mộc không bị ngọt, giúp tập trung tốt khi làm việc tại nhà.',
    rating: 4,
  },
  {
    name: 'Thảo Tiên - Đà Nẵng',
    title: 'Tư vấn chi tiết',
    message: 'Mỗi đơn hàng đều được hướng dẫn kỹ, cảm giác được chăm sóc như tại spa.',
    rating: 5,
  },
];

const safeTips = [
  'Pha loãng với dầu nền khi massage cơ thể.',
  'Khuếch tán 20-30 phút mỗi lần, luôn để phòng thoáng.',
  'Đặt máy trên mặt phẳng chắc chắn, tránh tầm tay trẻ nhỏ.',
  'Bảo quản nơi mát, tránh ánh nắng trực tiếp.',
];

const storyHighlights = [
  {
    title: 'Tôi bắt đầu từ một căn phòng quá mệt',
    detail:
      'Livana không sinh ra từ một kế hoạch lớn. Nó bắt đầu vào những đêm tôi trở về nhà với một cái đầu nặng trĩu và chỉ mong tìm lại chút bình yên rất nhỏ.',
  },
  {
    title: 'Tôi đi tìm mùi hương có ký ức',
    detail:
      'Tôi nhớ mùi sả sau cơn mưa, mùi vỏ bưởi mẹ hong ngoài hiên, mùi gỗ thơm trong những buổi tối cả nhà ngồi gần nhau. Tôi muốn giữ lại cảm giác đó trong từng chai tinh dầu.',
  },
  {
    title: 'Tôi muốn Livana ở lại trong những phút yếu lòng nhất',
    detail:
      'Không phải để trang trí cuộc sống, mà để khi ai đó quá mệt, quá cô đơn, hoặc quá nhiều áp lực, họ vẫn còn một cách dịu dàng để tự chăm sóc mình.',
  },
];

const heroBenefitsImg = '/assets/cong-dung.jpg';

const Home = () => {
  const featuredProducts = products.filter((item) => item.isFeatured);

  return (
    <div className="space-y-12 md:space-y-16">
      <Seo
        description="Tinh Dầu LIVANA mang đến bộ sưu tập tinh dầu thiên nhiên cho phòng ngủ, phòng khách và góc làm việc. Khám phá sản phẩm nổi bật, công dụng và hướng dẫn sử dụng an toàn."
        image={heroBenefitsImg}
        url="/"
        jsonLd={[createOrganizationSchema(), createWebsiteSchema()]}
      />
      <HeroSection />
      <FeatureGrid />

      <section className="space-y-8 px-6 py-10 md:px-10">
        <SectionTitle
          heading="Câu chuyện Livana"
          subheading="Một lời tự sự của người sáng lập về hành trình đi tìm sự bình yên bằng mùi hương"
          align="center"
        />
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="space-y-4 text-sm leading-7 text-textMain/80 md:text-[15px]">
            <p>
              Có một giai đoạn tôi sống rất nhanh. Nhanh đến mức mỗi sáng thức dậy là một danh sách việc cần làm, còn mỗi tối trở về chỉ thấy trong
              mình toàn tiếng ồn. Tôi đã từng nghĩ đó là cách người lớn vẫn sống: cố gắng thêm một chút, chịu đựng thêm một chút, rồi mọi thứ sẽ
              ổn. Nhưng có những ngày, ngay cả việc hít một hơi thật sâu cũng trở nên khó khăn.
            </p>
            <p>
              Tôi bắt đầu tìm lại những điều từng làm mình thấy an toàn. Đó là mùi sả chanh thoảng trong bếp, mùi vỏ bưởi mẹ phơi trước hiên nhà,
              mùi lá thơm trong những chiều yên tĩnh của tuổi thơ. Những mùi hương ấy không nói gì nhiều, nhưng luôn khiến tôi chậm lại, dịu xuống,
              và có cảm giác mình được trở về.
            </p>
            <p>
              Livana ra đời từ chính nhu cầu rất riêng đó. Tôi không muốn tạo ra một sản phẩm chỉ để căn phòng thơm hơn. Tôi muốn làm ra những chai
              tinh dầu có thể chạm vào cảm xúc con người một cách thật nhẹ, để ai đó sau một ngày kiệt sức vẫn có thể bật máy khuếch tán lên, ngồi
              xuống, và cảm thấy lòng mình được nới lỏng từng chút một.
            </p>
            <p>
              Vì vậy, tôi chọn đi chậm. Chọn nguyên liệu có nguồn gốc rõ ràng, chọn cách chưng cất giữ lại phần hương thuần khiết nhất, chọn kiểm tra
              từng mẻ tinh dầu với sự cẩn trọng của một người biết rằng có những khách hàng tìm đến Livana không chỉ vì mùi hương, mà vì họ đang cần
              một điểm tựa rất nhỏ để hồi phục.
            </p>
            <p>
              Nếu hôm nay bạn đang mệt, đang mất ngủ, hoặc chỉ đơn giản là thấy lòng mình quá chật chội, tôi hy vọng Livana sẽ ở đó như một lời nhắc
              dịu dàng: bạn không cần phải mạnh mẽ suốt cả ngày. Đôi khi, chữa lành bắt đầu từ việc cho phép bản thân dừng lại, hít thở sâu, và ở yên
              cùng chính mình.
            </p>
            <p className="pt-2 font-medium italic text-primary/90">
              Tôi tạo ra Livana để mỗi người, khi trở về nhà, đều có thể tìm thấy một khoảnh khắc bình yên thuộc về riêng mình.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {storyHighlights.map((highlight) => (
                <article
                  key={highlight.title}
                  className="rounded-2xl border border-primary/20 bg-white/70 p-4 shadow-soft"
                >
                  <h3 className="text-base font-semibold text-textMain">{highlight.title}</h3>
                  <p className="mt-2 text-sm text-textMain/75">{highlight.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <SectionTitle heading="Sản phẩm nổi bật" subheading="Chọn lọc những mùi hương bán chạy nhất tháng" />
        <ProductGrid products={featuredProducts} />
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4 order-2 md:order-1">
          <SectionTitle
            heading="Cách sử dụng tinh dầu an toàn"
            subheading="Những lưu ý nhỏ giúp trải nghiệm thiên nhiên tròn vẹn hơn."
            headingClassName="break-words md:whitespace-nowrap"
          />
          <p className="text-sm text-textMain/75">
            Tinh dầu LIVANA đều có độ đậm đặc cao. Hãy đọc kỹ hướng dẫn trước khi áp dụng lên da và ưu tiên pha loãng với
            dầu nền. Khuếch tán luân phiên để không gian luôn thoáng và dễ chịu.
          </p>
          <ul className="space-y-3 text-sm text-textMain/80">
            {safeTips.map((tip) => (
              <li key={tip} className="flex items-start gap-3 rounded-xl bg-white/70 p-3 shadow-sm">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary"></span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white/80 shadow-soft max-w-md w-full justify-self-center order-1 md:order-2">
          <img
            src={usageGuideImg}
            alt="Hướng dẫn sử dụng tinh dầu"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </section>

      <section className="px-6 py-8 md:px-10">
        <div className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white">
            <img
              src={heroBenefitsImg}
              alt="Công dụng tinh dầu Livana"
              className="w-full object-contain"
              loading="lazy"
            />
          </div>
          <div className="space-y-4 text-left">
            <SectionTitle heading="Công dụng tuyệt vời" subheading="Tự nhiên · An toàn · Hiệu quả" />
            <p className="text-sm text-textMain/75">
              Lợi ích nổi bật của tinh dầu LIVANA: giúp thư giãn, lọc không khí, đuổi côn trùng và hỗ trợ giấc ngủ ngon. Mỗi giọt đều được chưng cất từ nguyên liệu chọn lọc, không pha tạp, an toàn cho cả gia đình. Dùng đều đặn giúp hỗ trợ cân bằng tâm trạng sau ngày dài căng thẳng.
            </p>
            <ul className="space-y-2 text-sm text-textMain/75">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary"></span>
                Giảm nhanh cảm giác bí bách, khử mùi phòng kín sau 15 phút khuếch tán.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary"></span>
                Tạo nền hương thơm thư giãn giúp vào giấc nhanh hơn, ngủ sâu và ít tỉnh giấc.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary"></span>
                Tinh dầu cam quýt & sả chanh hỗ trợ xua côn trùng, đặc biệt vào mùa mưa.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary"></span>
                Có thể pha loãng để massage thư giãn vai gáy hoặc hòa cùng nước tắm ấm.
              </li>
            </ul>
            <Button to="/products" className="mt-2 inline-flex">
              Xem sản phẩm
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <SectionTitle heading="Khách hàng nói gì về LIVANA" align="center" />
        <div className="grid gap-6 md:grid-cols-3">
          {reviewList.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </div>
      </section>

      <section className="rounded-[32px] bg-gradient-to-r from-primary to-primaryLight px-8 py-12 text-white shadow-soft">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-white/70">Sống xanh mỗi ngày</p>
            <h3 className="mt-3 text-3xl font-semibold">Ưu đãi riêng cho bộ sưu tập mùa lạnh</h3>
            <p className="mt-2 text-sm text-white/80">Nhận tư vấn phối hương miễn phí khi đặt hàng online trong tuần này.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button to="/products" variant="secondary">
              Đặt mua ngay
            </Button>
            <Button to="/contact" variant="ghost" className="text-white">
              Nhận tư vấn
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
