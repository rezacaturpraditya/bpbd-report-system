import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function Form() {
  const [form, setForm] = useState({ name: "", title: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("reports").insert([form]);
    if (error) {
      setStatus("❌ " + error.message);
    } else {
      setStatus("✅ Laporan berhasil dikirim!");
      setForm({ name: "", title: "", message: "" });
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium">Nama</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan nama anda"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Judul Laporan
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
              placeholder="Judul singkat laporan"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Isi Laporan
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
              placeholder="Tuliskan laporan anda..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Kirim Laporan
          </button>
        </form>

        {status && (
          <p className="mt-4 text-center text-sm font-medium">{status}</p>
        )}
      </div>
    </main>
  );
}
