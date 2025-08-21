import React, { useState } from "react";
import { supabase } from "./supabaseClient"; // pastikan path benar

function FormPage() {
  const [formData, setFormData] = useState({
    judul: "",
    kronologis: "",
    tanggal: "",
    lokasi: "",
    pelapor: "",
    kontak: "",
    waTujuan: "", // ✅ nomor WA tujuan
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Validasi input
  for (const [key, value] of Object.entries(formData)) {
    if (!value.trim()) {
      alert(`Kolom "${key}" wajib diisi!`);
      return;
    }
  }

  // Simpan laporan ke Supabase
  const { error } = await supabase.from("laporan").insert([formData]);

  if (error) {
    alert("Gagal kirim laporan: " + error.message);
  } else {
    // Format pesan
    const pesan = `*Laporan Baru*%0A
📝 Judul: ${formData.judul}%0A
📍 Lokasi: ${formData.lokasi}%0A
📅 Tanggal: ${formData.tanggal}%0A
👤 Pelapor: ${formData.pelapor}%0A
📞 Kontak: ${formData.kontak}%0A
📖 Kronologis:%0A${formData.kronologis}`;

    // Nomor yang dipilih user di dropdown
    if (formData.waTujuan) {
      window.open(`https://wa.me/${formData.waTujuan}?text=${pesan}`, "_blank");
    }

    // Nomor broadcast tetap terkirim (otomatis 3 nomor)
const nomorList = [
      "6281279013197", // Nomor 1
      "6285874132088", // Nomor 2
      "6287883035832", // Nomor 3
];

nomorList.forEach((nomor, index) => {
  setTimeout(() => {
    window.open(`https://wa.me/${nomor}?text=${pesan}`, "_blank");
  }, index * 1500); // jeda 1.5 detik antar pesan
});

    alert("Laporan berhasil dikirim ke Supabase dan WhatsApp!");
    setFormData({
      judul: "",
      kronologis: "",
      tanggal: "",
      lokasi: "",
      pelapor: "",
      kontak: "",
      waTujuan: "",
    });
  }
};




  const divider = (
    <hr style={{ border: "0", borderTop: "1px solid #fd912cff", margin: "20px 0" }} />
  );

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* HEADER */}
      <header
        style={{
          background: "linear-gradient(90deg, orange, #ff4d00)",
          color: "white",
          padding: "20px",
          textAlign: "center",
          borderRadius: "0 0 10px 10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        }}
      >
        <img
          src="/navbar.webp"
          alt="Logo BPBD"
          style={{ width: "130px", marginBottom: "10px" }}
        />
        <h1 style={{ margin: 0, fontSize: "22px" }}>
          Pusat Pengendalian Operasi - PB BPBD Kabupaten Lampung Selatan
        </h1>
      </header>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "600px",
          margin: "30px auto",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        {/* Judul Kejadian */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "8px", color: "#333" }}>Judul Kejadian</h3>
          <select
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">-- Pilih Kejadian --</option>
            <option value="angin kencang">Angin Kencang</option>
            <option value="angin putting beliung">Angin Puting Beliung</option>
            <option value="banjir">Banjir</option>
            <option value="hujan deras disertai angin kencang">
              Hujan Deras Disertai Angin Kencang
            </option>
            <option value="longsor">Longsor</option>
            <option value="sambar petir">Sambar Petir</option>
            <option value="rumah roboh">Rumah Roboh</option>
            <option value="ombak laut tinggi">Ombak Laut Tinggi</option>
            <option value="banjir rob">Banjir Rob</option>
            <option value="kebakaran">Kebakaran</option>
          </select>
        </div>

        {divider}

        {/* Kronologis */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "8px", color: "#333" }}>Kronologis</h3>
          <textarea
            name="kronologis"
            value={formData.kronologis}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            rows="4"
            placeholder="Tuliskan kronologis kejadian secara lengkap..."
          />
        </div>

        {divider}

        {/* Tanggal */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "8px", color: "#333" }}>
            Tanggal & Waktu Kejadian
          </h3>
          <input
            type="datetime-local"
            name="tanggal"
            value={formData.tanggal}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {divider}

        {/* Lokasi */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "8px", color: "#333" }}>
            Lokasi & Tempat Kejadian
          </h3>
          <input
            type="text"
            name="lokasi"
            value={formData.lokasi}
            onChange={handleChange}
            placeholder="Contoh: Desa Sukamaju, RT 02 RW 03"
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {divider}

        {/* Nama Pelapor */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "8px", color: "#333" }}>Nama Pelapor</h3>
          <input
            type="text"
            name="pelapor"
            value={formData.pelapor}
            onChange={handleChange}
            placeholder="Nama lengkap pelapor"
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {divider}

        {/* Kontak */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "8px", color: "#333" }}>
            Nomor Telepon Pelapor
          </h3>
          <input
            type="tel"
            name="kontak"
            value={formData.kontak}
            onChange={handleChange}
            placeholder="08xxxxxxxxxx"
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {divider}

        {/* Nomor WhatsApp Tujuan */}
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "8px", color: "#333" }}>Kirim ke WhatsApp</h3>
          <select
            name="waTujuan"
            value={formData.waTujuan}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">-- Pilih Nomor WA --</option>
            <option value="6281279013197">Posko BPBD (0812-7901-3197)</option>
            <option value="6281279013197">Kepala BPBD (0812-7901-3197)</option>
            <option value="6281279013197">Nomor Darurat (0812-7901-3197)</option>
          </select>
        </div>

        {divider}

        {/* Tombol */}
        <button
          type="submit"
          style={{
            backgroundColor: "orange",
            color: "white",
            padding: "12px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Kirim Laporan
        </button>
      </form>
    </div>
  );
}

export default FormPage;
