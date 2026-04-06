# Search Console Checklist

Trang web hien tai da san sang de ban kiem tra index sau khi deploy.

## 1. Mo Search Console

- Property nen dung:
  - `https://tinhdaulivana.netlify.app`
- Neu sau nay doi sang domain rieng:
  - them property moi theo custom domain, vi du `https://tinhdaulivana.vn`

## 2. URL can inspect va request indexing

- `https://tinhdaulivana.netlify.app/`
- `https://tinhdaulivana.netlify.app/products`
- `https://tinhdaulivana.netlify.app/products/cam-ngot-binh-minh`
- `https://tinhdaulivana.netlify.app/blog`
- `https://tinhdaulivana.netlify.app/blog/thoi-quen-khuyech-tan-sang`

## 3. Viec can lam voi tung URL

1. Mo `URL Inspection`
2. Dan tung URL vao
3. Kiem tra:
   - URL co index duoc hay khong
   - Google da thu thap du lieu chua
   - Canonical co dung URL hien tai khong
   - Trang render ra noi dung day du, khong chi la app shell
4. Neu chua index:
   - bam `Request Indexing`

## 4. Sau khi gui index

- Cho 3 den 14 ngay
- Tim tren Google voi:
  - `site:tinhdaulivana.netlify.app`
  - `tinhdaulivana`
  - `"Tinh Dau LIVANA"`

## 5. Khi doi sang custom domain

- Cap nhat `VITE_SITE_URL` trong file env
- Build va deploy lai
- Gui lai sitemap trong Search Console
- Request indexing lai 5 URL o tren, nhung dung domain moi
