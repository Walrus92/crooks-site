import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter, FaBandcamp } from "react-icons/fa";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const Footer = () => {
  const location = useLocation();

  // No mostrar footer en ruta /contacto
  if (location.pathname === "/contacto") {
    return null;
  }

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error enviando el mensaje");
      }

      setSent(true);
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      setSent(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-12" id="contacto">
        {/* Columna izquierda: CONTACTO */}
        <div className="md:w-1/2 flex flex-col">
          <h2 className="text-4xl font-bold mb-6 text-[#04B0C8]">Contacto</h2>
          <div className="flex-1 flex flex-col justify-center">
            {sent ? (
              <p className="text-green-400 font-semibold">Mensaje enviado, ¡gracias!</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Tu correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
                  disabled={loading}
                />
                <textarea
                  placeholder="Cuéntanos qué tipo de concierto necesitas: sala, evento, horas aproximadas, equipo disponible..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={8}
                  className="p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none resize-none"
                  disabled={loading}
                />
                <button
                  type="submit"
                  className="bg-[#04B0C8] hover:bg-[#038a9c] transition rounded py-3 font-semibold"
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Enviar"}
                </button>
              </form>
            )}
            {error && <p className="text-red-500 mt-2 font-semibold">{error}</p>}
          </div>
        </div>

        <div className="md:w-1/2 relative rounded overflow-hidden flex flex-col">
          {/* Imagen de fondo con blur */}
          <div className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-center bg-cover filter brightness-110 blur-[0.5px]"
              style={{ backgroundImage: "url('/zz-grupo-2.jpeg')" }}
            />
          </div>

          {/* Capa oscura encima */}
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

          {/* Contenido */}
          <div className="relative z-20 h-full min-h-[520px] flex flex-col flex-1">
            <h2 className="text-4xl font-bold mb-6 text-[#04B0C8] px-6">Síguenos</h2>

            <div className="flex-1 flex flex-col justify-center items-center text-center px-6">
              <p className="text-lg mb-10 font-medium max-w-sm">
                Descubre nuestros directos, ensayos y novedades en redes sociales. ¡Síguenos y forma parte del ruido!
              </p>
              <div className="flex justify-center gap-6 text-3xl">
                <a href="https://www.facebook.com/thecrooksmusic" target="_blank" rel="noreferrer">
                  <FaFacebookF className="hover:text-[#04B0C8] transition" />
                </a>
                <a href="https://www.instagram.com/thecrooksmusic/" target="_blank" rel="noreferrer">
                  <FaInstagram className="hover:text-[#04B0C8] transition" />
                </a>
                <a href="https://www.youtube.com/@thecrooksband" target="_blank" rel="noreferrer">
                  <FaYoutube className="hover:text-[#04B0C8] transition" />
                </a>
                <a href="https://thecrooks.bandcamp.com/album/live-sessions" target="_blank" rel="noreferrer">
                  <FaBandcamp className="hover:text-[#04B0C8] transition" />
                </a>
              </div>
            </div>

            {/* Legales */}
            <div className="mt-10 text-xs text-center text-gray-300 px-6 pb-4">
              <p>© {new Date().getFullYear()} The Crooks. Todos los derechos reservados.</p>
              <p>
                <a href="/privacidad" className="underline hover:text-white">Política de privacidad</a> ·{" "}
                <a href="/aviso-legal" className="underline hover:text-white">Aviso legal</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
