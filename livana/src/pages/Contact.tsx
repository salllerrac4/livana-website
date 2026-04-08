import { useState } from 'react';
import type { FormEvent } from 'react';
import FAQItem from '../components/FAQItem';
import SectionTitle from '../components/SectionTitle';
import Seo from '../components/Seo';
import { brandHandle, brandProfiles, brandSearchHint, supportEmail, supportPhoneDisplay } from '../data/brand';
import { faqItems } from '../data/faq';
import { createBreadcrumbSchema, createFAQSchema, type JsonLd } from '../utils/structuredData';

const Contact = () => {
  const breadcrumbJsonLd = createBreadcrumbSchema([
    { name: 'Trang chủ', path: '/' },
    { name: 'Liên hệ', path: '/contact' },
  ]);
  const faqJsonLd = createFAQSchema(faqItems);
  const jsonLdSchemas = [breadcrumbJsonLd, faqJsonLd].filter((schema): schema is JsonLd => Boolean(schema));
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formState.name || !formState.email.includes('@') || formState.message.length < 10) {
      setStatus('Vui lòng điền đầy đủ thông tin và mô tả tối thiểu 10 ký tự.');
      return;
    }
    setStatus('Cảm ơn bạn! Đội ngũ LIVANA sẽ phản hồi trong 24 giờ làm việc.');
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <div className="space-y-10">
      <Seo
        title="Liên hệ"
        description="Liên hệ LIVANA để được tư vấn chọn mùi hương, hỏi đáp cách sử dụng tinh dầu và kết nối hợp tác bán lẻ."
        url="/contact"
        jsonLd={jsonLdSchemas}
      />
      <SectionTitle as="h1" heading="Liên hệ LIVANA" subheading="Gửi câu hỏi, nhu cầu tư vấn mùi hương hoặc hợp tác bán lẻ." />

      <div className="grid gap-8 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-primary/10 bg-white/80 p-6 shadow-sm">
          <div>
            <label htmlFor="name" className="text-sm font-semibold text-textMain">
              Họ tên
            </label>
            <input
              id="name"
              type="text"
              value={formState.name}
              onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-primary/20 px-4 py-3 text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-textMain">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formState.email}
              onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-primary/20 px-4 py-3 text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-semibold text-textMain">
              Nội dung
            </label>
            <textarea
              id="message"
              rows={5}
              value={formState.message}
              onChange={(event) => setFormState((prev) => ({ ...prev, message: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-primary/20 px-4 py-3 text-sm"
              required
            />
          </div>
          {status && <p className="text-sm text-primary">{status}</p>}
          <button type="submit" className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white">
            Gửi yêu cầu
          </button>
        </form>

        <div className="space-y-6 rounded-3xl bg-white/60 p-6">
          <div>
            <p className="text-sm font-semibold text-primary">Thông tin liên hệ</p>
            <p className="mt-2 text-sm text-textMain/80">Email: {supportEmail}</p>
            <p className="text-sm text-textMain/80">Hotline: {supportPhoneDisplay}</p>
            <p className="text-sm text-textMain/80">Facebook, TikTok, Shopee: @{brandHandle}</p>
            <p className="mt-2 text-sm text-textMain/70">{brandSearchHint}</p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              {brandProfiles.map((profile) => (
                <a key={profile.name} href={profile.url} target="_blank" rel="noreferrer" className="font-semibold text-primary underline">
                  {profile.name}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-textMain">Câu hỏi thường gặp</h2>
            <div className="mt-3">
              {faqItems.map((item) => (
                <FAQItem key={item.question} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
