# 🧺 +62Laundry — 1 Outlet MVP

Stack: Spreadsheet (DB) + Apps Script Code.gs (Backend) + HTML/CSS/JS Murni (Frontend).

## Fitur UI 2026
- **Dark/Light mode** (toggle 🌙, tersimpan di browser)
- **Ikon SVG inline** di semua navigasi/aksi + **tooltip** (`data-tip`) penjelas singkat
- **Dasbor KPI**: omzet hari ini, order masuk, siap diambil, belum lunas + **grafik 7 hari** + sebaran status (klik → filter pesanan)
- **Halaman Pelanggan**: cari, tambah, avatar inisial, aksi cepat order/WA
- **📦 Stok In/Out**: item kebutuhan laundry (deterjen, pewangi, plastik, hanger) — transaksi Masuk/Keluar, bar level, badge MENIPIS saat ≤ minimum, riwayat lengkap
- **❓ Bantuan & FAQ**: 8 pertanyaan umum (akordeon) + kontak pengembang **Deni Hartono** — WA 0821-1526-1194 / denihartono111@gmail.com
- **Bell notifikasi** (auto-refresh 30 dtk) = jumlah pesanan SIAP_DIAMBIL → klik = filter
- **Pesanan**: filter pill status warna-warni, detail **timeline riwayat**, update status state-machine, bayar, cetak ulang, kirim WA
- **Lacak publik** (QR nota): stepper progres 5 tahap + riwayat + status bayar
- Glassmorphism topbar, kartu hover-lift, micro-animation, responsif mobile

## Struktur
- `frontend/` — index.html, css/style.css, js/{config,api,icons,struk,dashboard,pos,orders,customers,tracking,laporan}.js
- `backend/Code.gs` + `appsscript.json`
- `tools/mock-server.js` — backend lokal berkontrak sama (tanpa deploy)
- `database/SPREADSHEET_SCHEMA.md`, `SEED_DATA.md`
- `docs/API_CONTRACT.md`, `DEPLOY.md`, `WA_OTOMATIS.md`

## Jalankan (tanpa deploy Apps Script — mock lokal)
1. `npm start` (atau `node tools/mock-server.js`) → buka **http://localhost:8080**
2. Login PIN `1111` (kasir) atau `123456` (owner) → POS → order → struk+QR → update status → WA.
3. `config.js` otomatis memakai `/exec` lokal di localhost; setelah deploy Apps Script, URL produksi dipakai di domain lain.

## Jalankan produksi
1. Ikuti `docs/DEPLOY.md`.
2. Frontend tanpa build — cukup Live Server / hosting statis.

## Akun contoh
- Owner PIN 123456, Kasir PIN 1111 (ganti setelah deploy).
