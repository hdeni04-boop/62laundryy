# WA_OTOMATIS.md — Notifikasi SIAP_DIAMBIL / SELESAI (C)

## Mode 1: LINK (default, gratis, tanpa vendor)
1. Set Script Properties: WA_MODE=LINK, TRACK_BASE=https://domain-anda/laundry/# (atau URL hosting frontend).
2. Alur: kasir update status → SIAP_DIAMBIL → backend simpan link ke WALogs + return wa_link → frontend tampilkan tombol "Kirim WA" → klik → WhatsApp terbuka dengan pesan terisi → kasir tekan Send.
   Contoh pesan: "Halo {nama}, cucian {nota} SUDAH SIAP DIAMBIL di +62Laundry (OUT-01)..."
4. Normalisasi nomor: 08xx → 62xx otomatis.

## Mode 2: FONNTE (otomatis penuh, butuh topup)
1. Daftar fonnte.com → dapatkan token → Script Properties: WA_MODE=FONNTE, FONNTE_TOKEN=xxx.
2. Update status → backend POST ke api.fonnte.com/send → log respons di WALogs.
3. Biaya: sesuai paket Fonnte. Cocok jika order >30/hari dan kasir tidak sempat klik.

## Sheet WALogs
log_id | order_id | ke | wa | link | timestamp | via | status

## Uji
1. Pastikan customer punya WA (cth 0812111222).
2. Buat order → Orders → Detail → → SIAP_DIAMBIL → tombol "Kirim WA" muncul.
3. Klik → WhatsApp terbuka → pesan benar → kirim.
4. Cek WALogs terisi 1 baris.
