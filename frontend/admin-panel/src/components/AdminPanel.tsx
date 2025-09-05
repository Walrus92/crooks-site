import { useState } from "react";
import ConcertsPanel from "./ConcertsPanel";
import MultimediaPanel from "./MultimediaPanel";
import MensajesPanel from "./MensajesPanel"; // nuevo

function AdminPanel() {
  const [view, setView] = useState<"concerts" | "media" | "mensajes">("concerts");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Panel de administración</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setView("concerts")}
          className={`px-4 py-2 rounded ${
            view === "concerts" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Conciertos
        </button>
        <button
          onClick={() => setView("media")}
          className={`px-4 py-2 rounded ${
            view === "media" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Multimedia
        </button>
        <button
          onClick={() => setView("mensajes")}
          className={`px-4 py-2 rounded ${
            view === "mensajes" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Mensajes
        </button>
      </div>

      {view === "concerts" && <ConcertsPanel />}
      {view === "media" && <MultimediaPanel />}
      {view === "mensajes" && <MensajesPanel />} {/* nuevo */}
    </div>
  );
}

export default AdminPanel;
