import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Megaphone } from 'lucide-react';
import BackButton from "../components/BackButton";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

interface Concierto {
  id: number;
  fecha: string;
  ciudad: string;
  lugar: string;
  descripcion?: string;
}

const ConciertosPage: React.FC = () => {
  const [conciertos, setConciertos] = useState<Concierto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/conciertos`)
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener conciertos');
        return res.json();
      })
      .then((data: Concierto[]) => {
        setConciertos(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-8">Cargando conciertos...</p>;
  if (error) return <p className="text-center mt-8 text-red-600">{error}</p>;
  if (conciertos.length === 0) return <p className="text-center mt-8">No hay conciertos a la vista.</p>;

  const hoy = new Date();
  const conciertosFuturos = conciertos.filter(c => new Date(c.fecha) >= hoy);

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-slate-800">
          Próximos Conciertos
        </h1>

        {conciertosFuturos.map(({ id, fecha, ciudad, lugar, descripcion }) => (
          <div
            key={id}
            className="bg-[#038aafcc] rounded-2xl shadow-md p-6 mb-6 transition-transform hover:-translate-y-1 hover:shadow-xl border border-[#02819f] text-white text-center"
          >
            <div className="text-sm mb-3 flex justify-center items-center gap-2 opacity-90">
              <Calendar className="w-4 h-4" />
              {new Date(fecha).toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <h2 className="text-3xl font-extrabold mb-2">{lugar}</h2>
            <div className="text-sm mb-3 flex justify-center items-center gap-2 opacity-90">
              <MapPin className="w-4 h-4" />
              {ciudad}
            </div>
            {descripcion && (
              <p className="text-sm leading-relaxed opacity-95">{descripcion}</p>
            )}
          </div>
        ))}

        {conciertosFuturos.length < 5 && (
          <div className="bg-[#B0C804cc] rounded-2xl shadow-md p-6 mb-6 text-center border border-[#9cb204] text-white transition hover:-translate-y-1 hover:shadow-xl">
            <Megaphone className="w-6 h-6 mx-auto mb-3" />
            <h3 className="text-2xl font-bold mb-2">¿Quieres aparecer aquí?</h3>
            <p className="text-sm mb-4 opacity-95">¡Damos conciertos en salas, bares, eventos y festivales!</p>
            <a
              href="#contacto"
              className="inline-block px-5 py-2 bg-white text-[#B0C804] font-semibold rounded-full shadow hover:bg-slate-100 transition"
            >
              Contacta con nosotros
            </a>
          </div>
        )}
        <BackButton />
      </div>
    </div>

  );
};

export default ConciertosPage;
