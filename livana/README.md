# LIVANA

Website tinh dau LIVANA duoc build bang React + Vite va da duoc toi uu SEO co ban:

- prerender cho cac trang quan trong
- meta SEO theo tung page
- JSON-LD cho Organization, WebSite, Product, BlogPosting, Breadcrumb
- ho tro custom domain qua `VITE_SITE_URL`

## Chay local

```bash
npm install
npm run build
```

Neu can chay dev:

```bash
npm run dev
```

## Deploy len Netlify

Project da co san config tai [netlify.toml](./netlify.toml):

- build command: `npm run build`
- publish directory: `dist`

Netlify se doc file nay tu dong, ban khong can nhap lai build command thu cong.

## Cau hinh custom domain

1. Tao file `.env` tu [`.env.example`](./.env.example)
2. Dat domain that su cua ban vao:

```env
VITE_SITE_URL=https://tinhdaulivana.vn
```

3. Trong Netlify:
   - vao `Site configuration` -> `Environment variables`
   - tao bien `VITE_SITE_URL` voi gia tri domain that su
4. Deploy lai site

Luu y:

- Neu van dang dung Netlify subdomain thi co the giu:

```env
VITE_SITE_URL=https://tinhdaulivana.netlify.app
```

- Khi doi sang domain rieng, canonical va structured data se tu dong doi theo domain moi.

## Goi y sau khi doi domain

1. Kiem tra:
   - `/robots.txt`
   - `/sitemap.xml`
   - title, canonical, JSON-LD o trang chu va trang chi tiet
2. Mo [SEARCH_CONSOLE_CHECKLIST.md](./SEARCH_CONSOLE_CHECKLIST.md)
3. Gui request indexing lai cac URL chinh tren Google Search Console

## Files quan trong

- [src/utils/seo.ts](./src/utils/seo.ts)
- [src/utils/structuredData.ts](./src/utils/structuredData.ts)
- [src/data/brand.ts](./src/data/brand.ts)
- [SEARCH_CONSOLE_CHECKLIST.md](./SEARCH_CONSOLE_CHECKLIST.md)
