import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function Reports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setReports(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold">📋 Daftar Laporan</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-8 space-y-4">
        {reports.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Belum ada laporan masuk.
          </p>
        ) : (
          reports.map((r) => (
            <div
              key={r.id}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow"
            >
              <h2 className="font-semibold text-lg">{r.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                oleh {r.name} • {new Date(r.created_at).toLocaleString()}
              </p>
              <p className="mt-3 leading-relaxed">{r.message}</p>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
