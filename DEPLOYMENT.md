# Deployment ke Vercel — dilakukan oleh pemilik

Implementasi repository disiapkan sebagai situs Astro statis. Login, pembuatan project Vercel, koneksi akun, domain, dan deployment produksi dilakukan sendiri oleh pemilik melalui akun Vercel miliknya.

## Sebelum menghubungkan repository

1. Review isi branch `main` di `https://github.com/cacaarchivee/portofolio-salsa`.
2. Pastikan `npm ci && npm test` berhasil pada salinan bersih.
3. Selesaikan konten publik prioritas di `CONTENT_TODO.md`, terutama CV dan pemeriksaan dokumen sumber.
4. Tentukan domain produksi final. Jangan menggunakan URL preview sebagai canonical.

## Membuat project di akun Vercel pemilik

1. Masuk ke Vercel dengan akun pemilik.
2. Pilih **Add New → Project**, lalu impor repository `cacaarchivee/portofolio-salsa`.
3. Pastikan root directory adalah root repository.
4. Vercel seharusnya mendeteksi Astro otomatis. Gunakan konfigurasi:
   - Install command: `npm ci`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Node.js: 24.x
5. Tambahkan environment variable `SITE_URL` berisi origin domain produksi final, misalnya format `https://domain.tld` tanpa slash di akhir. Jangan isi dengan domain tebakan.
6. Jalankan deployment dari UI pemilik.

Astro statis dapat berjalan di Vercel tanpa adapter. Repository ini sengaja tidak memakai Vercel CLI, serverless function, analytics, atau adapter server.

## Pemeriksaan setelah deployment

- Buka homepage, `/projects/`, keenam halaman studi kasus, dan halaman yang tidak ada untuk memeriksa 404.
- Coba direct refresh pada halaman studi kasus.
- Periksa menu mobile dengan keyboard dan tombol Escape.
- Coba link email, copy email, GitHub, serta download CV bila sudah diaktifkan.
- Pastikan aset termuat, tidak ada horizontal scroll pada lebar 320 px, dan tidak ada error console.
- Buka `/robots.txt` dan `/sitemap-index.xml`; keduanya baru menjadi indexable setelah `SITE_URL` terisi saat build.
- Periksa canonical dan Open Graph melalui source HTML produksi.
- Jalankan Lighthouse mobile dan catat hasil aktual; jangan mengklaim target sebelum audit benar-benar dijalankan.

## Workflow perubahan selanjutnya

Untuk perubahan setelah penyerahan awal, buat branch fitur dan pull request menuju `main`. Pemilik melakukan review dan dapat memilih **Create a merge commit** dari akun GitHub yang terhubung ke Vercel. Pastikan deployment produksi berhasil setelah merge; merge GitHub sendiri bukan bukti bahwa situs sudah live.

## Rollback

Jika deployment bermasalah, buka daftar Deployments pada project Vercel pemilik, pilih deployment stabil sebelumnya, lalu gunakan tindakan promote/redeploy yang tersedia di UI. Jika sumber masalah berasal dari kode, revert commit melalui GitHub dan deploy ulang. Jangan force-push atau menghapus history.
