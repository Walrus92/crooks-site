import { useEffect, useState } from "react";
import ConcertForm from "./ConcertForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

function ConcertsPanel() {
  const [concerts, setConcerts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingConcert, setEditingConcert] = useState(null);

  const fetchConcerts = async () => {
    const res = await fetch(`${API_BASE_URL}/api/conciertos`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    setConcerts(data);
  };

  useEffect(() => {
    fetchConcerts();
  }, []);

  const handleDelete = async (id: number) => {
    await fetch(`${API_BASE_URL}/api/conciertos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    fetchConcerts();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Conciertos</h2>

      <button
        className="mb-4 px-3 py-1 bg-blue-500 text-white rounded"
        onClick={() => {
          setShowForm(true);
          setEditingConcert(null);
        }}
      >
        Añadir concierto
      </button>

      {showForm && (
        <ConcertForm
          concert={editingConcert}
          onClose={() => {
            setShowForm(false);
            fetchConcerts();
          }}
        />
      )}

      <ul className="space-y-3">
        {concerts.map((c: any) => (
          <li key={c.id} className="p-4 border rounded shadow-sm">
            <div>
              <strong>{new Date(c.fecha).toLocaleDateString()}</strong> – {c.lugar}, {c.ciudad}
            </div>
            {c.descripcion && <p className="text-sm text-gray-600">{c.descripcion}</p>}
            <div className="mt-2 space-x-2">
              <button
                className="text-sm text-blue-600 underline"
                onClick={() => {
                  setEditingConcert(c);
                  setShowForm(true);
                }}
              >
                Editar
              </button>
              <button
                className="text-sm text-red-600 underline"
                onClick={() => handleDelete(c.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConcertsPanel;
