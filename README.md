# Salsabilla Edlanda Putri — Portfolio

Website portofolio statis untuk Salsabilla Edlanda Putri, Front-End Developer yang berfokus pada Angular, TypeScript, dan aplikasi web berbasis REST API.

## Teknologi

- Astro 7 dengan static generation
- TypeScript strict
- Astro Content Collections untuk enam studi kasus
- CSS custom properties tanpa UI framework
- JavaScript minimal untuk menu mobile, reveal, depth effect, dan copy email

Situs tidak memerlukan database, autentikasi, API key, CMS, atau adapter server.

## Menjalankan secara lokal

Gunakan Node.js 24 LTS (minimal versi yang didukung proyek: `22.12.0`).

```bash
npm ci
npm run dev
```

Astro akan menampilkan URL lokal, biasanya `http://localhost:4321`.

Perintah lain:

```bash
npm run check    # type dan content check
npm run build    # production build ke dist/
npm run preview  # preview production build
npm test         # check, build, route/link/asset validation
npm run test:browser # responsive, interaction, console, dan no-JS audit
```

## Struktur konten

- `src/data/profile.ts` — identitas, email, tautan, foto, dan path CV.
- `src/data/experience.ts` — pengalaman, pendidikan, sertifikasi, organisasi, dan skill.
- `src/content/projects/` — enam studi kasus dalam Markdown.
- `public/images/` — cover proyek, Open Graph image, dan aset visual publik.
- `public/documents/` — tempat CV PDF publik yang sudah disetujui.
- `src/styles/global.css` — design tokens dan seluruh styling global.

Field opsional yang kosong tidak dirender. Isi nilai aslinya di file data atau frontmatter proyek; tidak perlu mengubah komponen.

### Menambahkan CV

1. Pastikan PDF final sudah diperiksa dan aman dipublikasikan.
2. Simpan, misalnya, sebagai `public/documents/salsabilla-edlanda-putri-cv.pdf`.
3. Ubah `cvPath` di `src/data/profile.ts` menjadi `/documents/salsabilla-edlanda-putri-cv.pdf`.
4. Jalankan `npm test`. Tombol download akan tampil otomatis.

### Menambahkan foto atau screenshot

Simpan aset web yang telah mendapat izin di `public/images/`, lalu isi `photo` di `profile.ts` atau `cover` pada frontmatter proyek. Gunakan nama file huruf kecil dengan tanda hubung, dimensi eksplisit, dan format modern bila memungkinkan.

### Link proyek dan sertifikat

Link hanya boleh ditambahkan setelah URL diverifikasi. Frontmatter proyek menerima `demoUrl` dan `sourceUrl`; item sertifikat menerima `url`. Tombol tidak akan muncul selama field tersebut belum diisi.

## URL produksi dan SEO

Tanpa `SITE_URL`, build tetap berfungsi tetapi menggunakan `noindex,nofollow`, tidak membuat canonical, dan tidak menghasilkan sitemap. Ini mencegah preview tanpa domain final terindeks.

Setelah domain produksi diketahui, isi environment variable berikut di Vercel:

```text
SITE_URL=https://domain-final-yang-sudah-diverifikasi.tld
```

Build produksi kemudian menghasilkan canonical URL, `sitemap-index.xml`, dan aturan `robots.txt` yang indexable. Jangan memakai URL preview sebagai `SITE_URL`.

## Pemeriksaan konten

Konten saat ini dibatasi pada fakta dalam brief proyek. Dokumen sumber `CV_Salsabilla_Edlanda_Putri.docx` dan `Project_Portfolio_Details_Salsabilla_Edlanda_Putri.pdf` belum berada di repository saat implementasi awal. Lakukan verifikasi akhir terhadap dokumen tersebut sebelum memperluas klaim atau menambahkan tautan.

Daftar data yang masih diperlukan ada di [CONTENT_TODO.md](./CONTENT_TODO.md). Panduan deployment pemilik ada di [DEPLOYMENT.md](./DEPLOYMENT.md).
