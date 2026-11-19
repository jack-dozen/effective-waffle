# Pemeriksa Kode Python

## Instalasi

Gunakan Python 3.10 atau lebih baru, lalu pasang dependensi:

```powershell
python -m pip install tree-sitter tree-sitter-python
```

## Cara menjalankan

Dari folder `cek`, jalankan:

```powershell
python .\cek.py .\uji
```

Ganti `.\uji` dengan path folder Python yang ingin diperiksa. Skrip akan mencari file `*.py` di folder tersebut dan subfoldernya.

## Pemeriksaan

- Komentar yang memuat `TODO` atau `FIXME`, dengan nomor baris.
- Fungsi yang rentang barisnya lebih dari 30 baris. Jumlahnya dihitung dari baris `def` sampai baris terakhir fungsi, termasuk baris `def`.
- File yang parse tree-nya mengandung error sintaks. Skrip melaporkan lokasi masalah pertama yang ditemukan.

Contoh output:

```text
uji\fungsi_panjang.py:1: fungsi proses_banyak_item memiliki 32 baris
uji\sintaks_rusak.py:1: syntax ERROR
uji\todo.py:2: # TODO: validasi data sebelum disimpan
```
