// src/Reports.jsx
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      let { data, error } = await supabase.from("laporan").select("*").order("created_at", { ascending: false });
      if (error) {
        console.error(error);
      } else {
        setReports(data);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Daftar Laporan</h1>
      {reports.length === 0 ? (
        <p>Belum ada laporan.</p>
      ) : (
        <ul className="space-y-2">
          {reports.map((r) => (
            <li key={r.id} className="p-3 border rounded bg-gray-50">
              <p><strong>Nama:</strong> {r.nama}</p>
              <p><strong>No HP:</strong> {r.no_hp}</p>
              <p><strong>Deskripsi:</strong> {r.deskripsi}</p>
              {r.foto && <img src={r.foto} alt="Bukti laporan" className="w-40 mt-2" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Reports;
