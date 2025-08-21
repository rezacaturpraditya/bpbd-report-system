import { useEffect } from "react";
import FormPage from "./FormPage"; // pastikan path benar, kalau beda folder sesuaikan

function App() {
  useEffect(() => {
    // Ubah judul tab
    document.title = "Laporan Kejadian BPBD Kab.Lampung Selatan";

    // Ubah favicon
    const link = document.querySelector("link[rel~='icon']");
    if (link) {
      link.href = "/navbar.webp"; // pastikan ada di public/
    } else {
      const newLink = document.createElement("link");
      newLink.rel = "icon";
      newLink.href = "/navbar.webp";
      document.head.appendChild(newLink);
    }
  }, []);

  return (
    <div>
      <FormPage />
    </div>
  );
}

export default App;
