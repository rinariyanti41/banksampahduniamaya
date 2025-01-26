document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Pupuk Cair", img: "1.jpg", price: 130000 },
      { id: 2, name: "Tatakan Gelas", img: "2.jpg", price: 35000 },
      { id: 3, name: "Batik Eumbreuk", img: "3.jpg", price: 230000 },
      { id: 4, name: "Tempat Buku Limbah Coffe", img: "4.jpg", price: 90000 },
      { id: 5, name: "Tempat Pensil", img: "5.jpg", price: 35000 },
      { id: 6, name: "Tas Belanja", img: "6.jpg", price: 75000 },
      { id: 7, name: "Kursi Drum Kecil", img: "7.jpg", price: 150000 },
      { id: 8, name: "Keranjang Gelas", img: "8.jpg", price: 80000 },
      { id: 9, name: "Gantungan Kunci", img: "9.jpg", price: 15000 },
      { id: 10, name: "Tempat Botol Sampah", img: "10.jpg", price: 120000 },
      { id: 11, name: "Pulpen", img: "11.jpg", price: 12000 },
      { id: 13, name: "Tempat Cuci Tangan", img: "13.jpg", price: 190000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // jika belum ada / cart masi kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barangnya udah ada, cek apakah barangnya beda atau sama dengan yang ada di cart
        this.items = this.items.map((item) => {
          // jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang sudah ada, tambah quantity dan totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // ambil item yang mau di remove berdasarkan id nya
      const cartItem = this.items.find((item) => item.id === id);

      // jika item lebih dari 1
      if (cartItem.quantity > 1) {
        // telusuri 1 1
        this.items = this.items.map((item) => {
          // jika bukan barang yang di klik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        })
      } else if (cartItem.quantity === 1) {
        // jika barangnya sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
