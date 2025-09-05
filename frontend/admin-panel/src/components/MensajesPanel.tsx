import { useEffect, useState } from "react";

interface Mensaje {
  id: number;
  email: string;
  contenido: string;
  ip: string;
  enviadoEn: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function MensajesPanel() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMensajes() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE_URL}/api/contact/messages`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("No se pudieron cargar los mensajes");
        const data = await res.json();
        setMensajes(data);
      } catch (err: any) {
        setError(err.message);
      }
    }
    fetchMensajes();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Mensajes de Contacto</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-3 max-h-[60vh] overflow-y-auto">
        {mensajes.map((m) => (
          <li key={m.id} className="p-4 border rounded shadow-sm">
            <div>
              <strong>{m.email}</strong> ({new Date(m.enviadoEn).toLocaleString()})
            </div>
            <p className="text-sm text-gray-600">{m.contenido}</p>
            <div className="text-xs text-gray-400">IP: {m.ip}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
