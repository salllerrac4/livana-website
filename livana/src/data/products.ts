import type { Product } from '../types/product';

import { buildSizePricing } from '../utils/pricing';
import bachaAltImg from '../assets/bacha1.webp';
import bachaImg from '../assets/bacha.webp';
import camHeroImg from '../assets/cam2.webp';
import huongDanSvg from '../assets/huong dan su dung.svg';
import oaihuongImg from '../assets/oaihuong.webp';
import oaihuong2Img from '../assets/oaihuong2.webp';
import queHeroImg from '../assets/que1.webp';
import sachanhHeroImg from '../assets/sachanh1.webp';
import tdcamImg from '../assets/tdcam.webp';
import tdqueImg from '../assets/tdque.webp';
import traTrangSvg from '../assets/tra-trang.svg';

const publicProductImages = {
  cam: '/products/cam.svg',
  sachanh: '/products/sachanh.svg',
  que: '/products/que.svg',
  bacha: '/products/bacha.svg',
  oaihuong: '/products/oaihuong.svg',
  combos: ['/products/combo1.svg', '/products/combo2.svg', '/products/combo3.svg'],
} as const;

const withSizePricing = (basePrice: number, sizeOptions: string[], baseOriginalPrice?: number) => ({
  sizeOptions,
  sizePrices: buildSizePricing(basePrice, sizeOptions),
  ...(baseOriginalPrice ? { sizeOriginalPrices: buildSizePricing(baseOriginalPrice, sizeOptions) } : {}),
});

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Tinh dầu Cam Ngọt Bình Minh',
    slug: 'cam-ngot-binh-minh',
    description:
      'Cam ngọt Ấn Độ hòa cùng vỏ chanh vàng và quýt tươi mang đến làn hương sáng khoái, giúp tỉnh táo vào buổi sáng mà không tạo cảm giác gắt.',
    shortDescription: 'Hương cam ngọt dịu dàng, khơi cảm hứng và làm sáng không gian.',
    price: 25000,
    originalPrice: 40000,
    ...withSizePricing(25000, ['10ml', '30ml'], 40000),
    category: 'fresh',
    scentNotes: ['Cam ngọt', 'Chanh vàng', 'Quýt'],
    isFeatured: true,
    rating: 4.7,
    imageUrl: camHeroImg,
    galleryImages: [publicProductImages.cam, camHeroImg, tdcamImg],
  },
  {
    id: 'p2',
    name: 'Tinh dầu Sả Chanh Tươi Sảng',
    slug: 'sa-chanh-tuoi-sang',
    description:
      'Sả chanh Ấn Độ nguyên chất phối hợp với chanh vàng và gừng nhẹ tạo nên tầng hương sảng khoái, giữ không khí sạch và đuổi muỗi tự nhiên.',
    shortDescription: 'Tinh dầu sả chanh làm mới không gian, loại bỏ mùi khó chịu tức thì.',
    price: 25000,
    originalPrice: 49000,
    ...withSizePricing(25000, ['10ml', '30ml', '50ml'], 49000),
    category: 'fresh',
    scentNotes: ['Sả chanh', 'Chanh vàng', 'Tiêu trắng'],
    isFeatured: true,
    rating: 4.6,
    imageUrl: sachanhHeroImg,
    galleryImages: [publicProductImages.sachanh, sachanhHeroImg],
  },
  {
    id: 'p3',
    name: 'Tinh dầu Quế Ấm Áp',
    slug: 'tinh-dau-que-am-ap',
    description:
      'Quế nguyên chất kết hợp với đinh hương và hạt tiêu mang lại hương ấm áp, thích hợp cho góc thư giãn mùa lạnh và những lúc cần bình tĩnh.',
    shortDescription: 'Cung cấp vẻ ấm nồng cho phòng khách hoặc không gian thiền.',
    price: 34000,
    originalPrice: 40000,
    ...withSizePricing(34000, ['10ml', '30ml'], 40000),
    category: 'relax',
    scentNotes: ['Quế', 'Đinh hương', 'Hạt tiêu'],
    rating: 4.6,
    imageUrl: queHeroImg,
    galleryImages: [publicProductImages.que, queHeroImg, tdqueImg],
  },
  {
    id: 'p4',
    name: 'Tinh dầu Bạc Hà Mát Lạnh',
    slug: 'bac-ha-mat-lanh',
    description:
      'Bạc hà Singapore tươi mát, điểm chút eucalyptus và cam bergamot giúp làm dịu đầu óc, tăng sự tỉnh táo cho cả ngày làm việc.',
    shortDescription: 'Hơi lạnh sảng khoái, thích hợp cho bàn làm việc và phòng họp.',
    price: 42000,
    originalPrice: 50000,
    ...withSizePricing(42000, ['10ml', '30ml', '50ml'], 50000),
    category: 'fresh',
    scentNotes: ['Bạc hà', 'Eucalyptus', 'Cam bergamot'],
    isFeatured: true,
    rating: 4.8,
    imageUrl: bachaImg,
    galleryImages: [publicProductImages.bacha, bachaImg, bachaAltImg],
  },
  {
    id: 'p5',
    name: 'Tinh dầu Ngủ Ngon Oải Hương',
    slug: 'ngu-ngon-oai-huong',
    description:
      'Oải hương Provence, hoa cam Neroli và gỗ tuyết tùng nhẹ nhàng giúp thần kinh hạ nhiệt, mở đường cho giấc ngủ sâu và giấc mơ êm đềm.',
    shortDescription: 'Tinh dầu ngủ ngon hỗ trợ giấc ngủ tự nhiên ngay khi đặt đầu xuống gối.',
    price: 50000,
    originalPrice: 59000,
    ...withSizePricing(50000, ['10ml', '30ml'], 59000),
    category: 'sleep',
    scentNotes: ['Oải hương', 'Hoa cam', 'Gỗ tuyết tùng'],
    rating: 4.9,
    imageUrl: oaihuongImg,
    galleryImages: [publicProductImages.oaihuong, oaihuongImg, oaihuong2Img],
  },
  {
    id: 'p6',
    name: 'Tinh dầu Khuếch Tán Tía Tô Ấm',
    slug: 'tinh-dau-tia-to-am',
    description:
      'Tía tô Việt Nam kết hợp gừng cay và cam thảo ngọt tạo nên hương ấm, giúp thanh lọc không khí, lưu thông máu và giữ hơi ấm trong những ngày giao mùa.',
    shortDescription: 'Giữ ấm phòng và thúc đẩy tinh thần tỉnh táo khi cần tập trung.',
    price: 85000,
    originalPrice: 95000,
    ...withSizePricing(85000, ['10ml', '30ml'], 95000),
    category: 'focus',
    scentNotes: ['Tía tô', 'Gừng', 'Cam thảo'],
    rating: 4.5,
    imageUrl: tdcamImg,
    galleryImages: [tdcamImg],
  },
  {
    id: 'p7',
    name: 'Combo Sả Chanh – Bạc Hà – Quế',
    slug: 'combo-3-chai-sa-chanh-bac-ha-que',
    description:
      'Bộ 3 chai 10ml (sả chanh, bạc hà và quế) để đặt trong phòng khách hoặc ô tô, chuyển tông hương giữa các thời điểm trong ngày giúp không khí luôn trong lành.',
    shortDescription: 'Combo linh hoạt cho cả ngày, từng mùi riêng biệt giúp nhanh chóng thay đổi cảm xúc.',
    price: 79000,
    originalPrice: 89000,
    sizeOptions: ['10ml'],
    sizePrices: { '10ml': 79000 },
    sizeOriginalPrices: { '10ml': 89000 },
    category: 'relax',
    scentNotes: ['Sả chanh', 'Bạc hà', 'Quế'],
    rating: 4.4,
    imageUrl: bachaAltImg,
    galleryImages: [...publicProductImages.combos, bachaAltImg, bachaImg, sachanhHeroImg],
  },
  {
    id: 'p8',
    name: 'Combo 3 chai Tinh dầu Cao Cấp',
    slug: 'combo-3-chai-cao-cap',
    description:
      'Combo 3 chai 10ml trà trắng – oải hương – bạc hà preset những mùi ngon lành để luân phiên dùng trong phòng làm việc, spa mini, hoặc tặng quà.',
    shortDescription: 'Set 3 hương tươi mát với giá tham chiếu dưới 80k.',
    price: 76500,
    originalPrice: 85000,
    sizeOptions: ['10ml'],
    sizePrices: { '10ml': 76500 },
    sizeOriginalPrices: { '10ml': 85000 },
    category: 'fresh',
    scentNotes: ['Sả chanh', 'Oải hương', 'Bạc hà'],
    rating: 4.3,
    imageUrl: oaihuong2Img,
    galleryImages: [...publicProductImages.combos, oaihuong2Img, sachanhHeroImg, traTrangSvg],
  },
  {
    id: 'p9',
    name: 'Tinh dầu Cân Bằng Trà Trắng',
    slug: 'can-bang-tra-trang',
    description:
      'Hòa quyện trà trắng nhẹ, hoa lan và chút chanh vàng mang đến sự tinh khiết, giúp cân bằng cảm xúc và giữ tập trung cả ngày.',
    shortDescription: 'Hương trà thanh sạch và nâng cao sự thư thái cho không gian hiện đại.',
    price: 89900,
    originalPrice: 100000,
    ...withSizePricing(89900, ['10ml', '30ml', '50ml'], 100000),
    category: 'relax',
    scentNotes: ['Trà trắng', 'Hoa lan', 'Chanh'],
    rating: 4.6,
    imageUrl: traTrangSvg,
    galleryImages: [traTrangSvg, huongDanSvg],
  },
];

export const getProductBySlug = (slug: string) => products.find((item) => item.slug === slug);
