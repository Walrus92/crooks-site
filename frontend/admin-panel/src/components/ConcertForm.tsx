import { useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

function ConcertForm({ concert, onClose }: any) {
  const [form, setForm] = useState({
    fecha: concert?.fecha?.slice(0, 10) || "",
    lugar: concert?.lugar || "",
    ciudad: concert?.ciudad || "",
    descripcion: concert?.descripcion || "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const method = concert ? "PUT" : "POST";
    const url = concert
      ? `${API_BASE_URL}/api/conciertos/${concert.id}`
      : `${API_BASE_URL}/api/conciertos`;

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(form),
    });

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 border p-4 rounded bg-gray-50">
      <h3 className="font-semibold mb-2">
        {concert ? "Editar concierto" : "Nuevo concierto"}
      </h3>

      <label className="block mb-2">
        Fecha:
        <input
          type="date"
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
          required
          className="w-full border px-2 py-1 mt-1"
        />
      </label>

      <label className="block mb-2">
        Lugar:
        <input
          type="text"
          name="lugar"
          value={form.lugar}
          onChange={handleChange}
          required
          className="w-full border px-2 py-1 mt-1"
        />
      </label>

      <label className="block mb-2">
        Ciudad:
        <input
          type="text"
          name="ciudad"
          value={form.ciudad}
          onChange={handleChange}
          required
          className="w-full border px-2 py-1 mt-1"
        />
      </label>

      <label className="block mb-2">
        Descripción (opcional):
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          className="w-full border px-2 py-1 mt-1"
        />
      </label>

      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="px-3 py-1 bg-green-500 text-white rounded"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-3 py-1 bg-gray-300 text-black rounded"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default ConcertForm;
