import { Home, FileText } from "lucide-react";

function Navbar({ onNavigate }) {
  return (
    <nav className="bg-gray-800 text-white px-6 py-3 shadow-md flex justify-between items-center">
      {/* Brand / Logo */}
      <h1 className="text-xl font-bold tracking-wide">Pengaduan Zegion</h1>

      {/* Menu */}
      <div className="flex gap-6">
        <button
          onClick={() => onNavigate("form")}
          className="flex items-center gap-2 hover:text-blue-400 transition"
        >
          <Home size={18} />
          Form
        </button>

        <button
          onClick={() => onNavigate("reports")}
          className="flex items-center gap-2 hover:text-blue-400 transition"
        >
          <FileText size={18} />
          Reports
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
