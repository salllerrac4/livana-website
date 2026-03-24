import { useState } from 'react';
import type { FormEvent } from 'react';
import FAQItem from '../components/FAQItem';
import SectionTitle from '../components/SectionTitle';
import { faqItems } from '../data/faq';

const Contact = () => {
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
      <SectionTitle heading="Liên hệ LIVANA" subheading="Gửi câu hỏi, nhu cầu tư vấn mùi hương hoặc hợp tác bán lẻ." />

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
            <p className="mt-2 text-sm text-textMain/80">Email: tinhdaulivana@gmail.com</p>
            <p className="text-sm text-textMain/80">Hotline: 0345077138</p>
            <p className="text-sm text-textMain/80">Shopee & Lazada: @livana.official</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-textMain">Câu hỏi thường gặp</h3>
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
