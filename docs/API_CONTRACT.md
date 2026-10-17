# API_CONTRACT.md — Code.gs Web App (1 Outlet + A/B/C)

Base URL: `https://script.google.com/macros/s/XXXX/exec` (ganti di frontend/js/config.js)

## Format umum
POST JSON: `{ "action": "...", "token": "TOKEN", "payload": {...} }`
Response: `{ "ok": true, "data": ... }` / `{ "ok": false, "error": "..." }`

GET publik: `?action=ping`, `?action=track&code=LND-...`, `?action=waQR&code=LND-...`

## Actions
login, getServices, getCustomers, createCustomer, createOrder (return +wa_link +track_url),
listOrders, getOrderDetail (return +track_url +wa_link), updateStatus (auto WA log saat SIAP_DIAMBIL/SELESAI),
addPayment, dailyOmzet, waLink {order_id}, seedCheck, ping,
dashboard {omzet_hari_ini, order_hari_ini, siap_diambil, belum_lunas, status_counts, stats7[7 hari]},

## Pengaturan user (owner only)
| action | payload | return |
|---|---|---|
| getUsers | {} | [{user_id,nama,role,outlet_id}] — hanya akun aktif, tanpa PIN |
| setKasirPin | {user_id, pin(4-6 digit), oleh} | {user_id, role} — user harus role kasir |
| setOwnerPin | {user_id, pin(4-6 digit), oleh} | {user_id, role} — user harus role owner |

## Stok (kebutuhan laundry)
| action | payload | return |
|---|---|---|
| listStock | {} | {items:[{item_id,nama,satuan,stok,min_stok,low}], tx_today} |
| createStockItem | {nama, satuan, stok_awal, min_stok, oleh} | {item_id} (auto STK-XXXX) |
| stockTx | {item_id, jenis:IN/OUT, qty, keterangan, oleh} | {item_id,jenis,qty,sisa} — tolak jika OUT > stok |
| stockLog | {item_id?, limit?} | [{tx_id,item_nama,jenis,qty,keterangan,oleh,timestamp,sisa}] max 100 |

## Pengeluaran (Expenses) & Laba Bersih
| action | payload | return |
|---|---|---|
| addExpense | {kategori, jumlah, keterangan?, oleh, tanggal?} | {expense_id (EXP-0001), tanggal, jumlah, kategori} — jumlah wajib > 0 |
| listExpenses | {tanggal?, limit?} | {tanggal, pengeluaran_hari_ini, pengeluaran_bulan_ini, items:[{expense_id,tanggal,kategori,keterangan,jumlah,oleh,timestamp}]} |

## Rekap Bulanan & Export CSV
| action | payload | return |
|---|---|---|
| monthlyReport | {bulan: "YYYY-MM"} (default bulan berjalan) | {bulan, total_omzet, total_order, lunas, belum_lunas, kas_masuk, pengeluaran, laba_bersih, days:[{tanggal, total_omzet, total_order, pengeluaran, laba_bersih}]} — days = 1 baris per hari dalam bulan; format bulan divalidasi (`Format bulan YYYY-MM` jika salah) |

Frontend `#/laporan` menampilkan rekap bulanan (KPI + tabel harian) dan tombol **Export CSV** → unduh `laporan-YYYY-MM-62laundry.csv` (BOM UTF-8, siap Excel). CSV dibangun dari data `monthlyReport` yang sudah dimuat.

`dailyOmzet` & `dashboard` kini juga mengembalikan `pengeluaran` dan `laba_bersih` (= total_omzet/omzet_hari_ini − pengeluaran). Kategori: Deterjen & Pewangi / Listrik & Air / Gaji Karyawan / Sewa Tempat / Perawatan Mesin / Plastik & Kemasan / Lain-lain.

## State machine
DITERIMA -> DICUCI -> DIKERINGKAN -> DISETRIKA -> SIAP_DIAMBIL -> SELESAI; DIBATALKAN terminal kecuali dari SELESAI.

## Script Properties
API_TOKEN, SPREADSHEET_ID, TRACK_BASE (untuk QR nota B), WA_MODE=LINK/FONNTE, FONNTE_TOKEN (opsional C).
Jalankan seedLaundry() sekali untuk A.
