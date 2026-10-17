# SEED_DATA.md — Copy-paste siap pakai (A)

Cara tercepat: buka Apps Script > jalankan fungsi `seedLaundry()` sekali > semua sheet + contoh terisi otomatis.

## Alternatif manual (blok TSV, paste mulai A1 tiap sheet)

### Users (header + 2 baris)
```
user_id	nama	pin	role	outlet_id	aktif
USR-01	Owner	123456	owner	OUT-01	TRUE
USR-02	Kasir 1	1111	kasir	OUT-01	TRUE
```

### Outlets
```
outlet_id	nama	alamat	telp
OUT-01	+62Laundry	Jl. Contoh No.1	0812000001
```

### Customers
```
customer_id	nama	wa	alamat
CUS-0001	Budi Santoso	0812111222	Jl. Mawar 1
CUS-0002	Siti Aminah	0812333444	Jl. Melati 2
CUS-0003	Andi Pratama	0812555666	Jl. Kenanga 3
```

### Services
```
service_id	nama	satuan	harga	estimasi_hari	aktif
SRV-01	Cuci Kering Reguler	kg	7000	2	TRUE
SRV-02	Cuci + Setrika Reguler	kg	10000	3	TRUE
SRV-03	Express 1 Hari	kg	15000	1	TRUE
SRV-04	Satuan / Helm / Sepatu	pcs	25000	3	TRUE
```

### Orders / OrderItems / StatusLogs / Payments
Kosongkan dulu (header saja) — akan terisi dari POS. Contoh order demo dibuat otomatis saat uji POS pertama.

### WALogs (untuk C)
```
log_id	order_id	ke	wa	link	timestamp	via	status
```

### StockItems + StockTx (fitur Stok)
```
item_id	nama	satuan	stok_sekarang	min_stok	aktif
STK-0001	Deterjen Cair	liter	20	5	TRUE
STK-0002	Pewangi / Softener	liter	15	5	TRUE
STK-0003	Plastik Kiloan	pcs	300	100	TRUE
STK-0004	Hanger	pcs	50	10	TRUE
```
```
tx_id	item_id	jenis	qty	keterangan	oleh	timestamp	sisa_stok
```

## Script Properties wajib
- API_TOKEN = token rahasia (cth `BAROKAH-2026-XYZ`)
- SPREADSHEET_ID = id dari URL sheet
- TRACK_BASE = URL frontend (cth `https://domain.com/laundry/`) — dipakai QR nota (B)
- WA_MODE = LINK (default, kasir klik kirim) atau FONNTE (otomatis)
- FONNTE_TOKEN = token fonnte (hanya jika WA_MODE=FONNTE)
