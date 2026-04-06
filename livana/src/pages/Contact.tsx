import { useState } from 'react';
import type { FormEvent } from 'react';
import FAQItem from '../components/FAQItem';
import SectionTitle from '../components/SectionTitle';
import Seo from '../components/Seo';
import { brandHandle, brandProfiles, brandSearchHint, supportEmail, supportPhoneDisplay } from '../data/brand';
import { faqItems } from '../data/faq';
import { createBreadcrumbSchema } from '../utils/structuredData';

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formState.name || !formState.email.includes('@') || formState.message.length < 10) {
      setStatus('Vui long dien day du thong tin va mo ta toi thieu 10 ky tu.');
      return;
    }
    setStatus('Cam on ban! Doi ngu LIVANA se phan hoi trong 24 gio lam viec.');
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <div className="space-y-10">
      <Seo
        title="Lien he"
        description="Lien he LIVANA de duoc tu van chon mui huong, hoi dap cach su dung tinh dau va ket noi hop tac ban le."
        url="/contact"
        jsonLd={createBreadcrumbSchema([
          { name: 'Trang chu', path: '/' },
          { name: 'Lien he', path: '/contact' },
        ])}
      />
      <SectionTitle as="h1" heading="Lien he LIVANA" subheading="Gui cau hoi, nhu cau tu van mui huong hoac hop tac ban le." />

      <div className="grid gap-8 md:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-primary/10 bg-white/80 p-6 shadow-sm">
          <div>
            <label htmlFor="name" className="text-sm font-semibold text-textMain">
              Ho ten
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
              Noi dung
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
            Gui yeu cau
          </button>
        </form>

        <div className="space-y-6 rounded-3xl bg-white/60 p-6">
          <div>
            <p className="text-sm font-semibold text-primary">Thong tin lien he</p>
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
            <h2 className="text-lg font-semibold text-textMain">Cau hoi thuong gap</h2>
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
