import { useState } from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import BackButton from "../components/BackButton";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const ContactoPage = () => {
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
    <div
      className="relative min-h-screen flex flex-col bg-black text-white pt-20"
      style={{
        backgroundImage: "url('/zz-grupo-2.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Capa oscura */}

      <div className="absolute inset-0 bg-black bg-opacity-75 z-0" />

      <div
        className="relative z-10 flex flex-col md:flex-row justify-between p-8 md:p-16 w-full max-w-[1200px] mx-auto gap-12"
        style={{ minHeight: "600px" }} // para que tenga altura para centrar verticalmente
      >

        {/* Contacto - 60% ancho */}
        <div className="flex flex-col md:w-3/5">
          <h1 className="text-5xl font-bold mb-8 text-[#04B0C8]">Contacto</h1>

          {sent ? (
            <p className="text-green-400 font-semibold text-lg">Mensaje enviado, ¡gracias!</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <input
                type="email"
                placeholder="Tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-4 rounded bg-gray-900 text-white placeholder-gray-400 focus:outline-none"
                disabled={loading}
              />
              <textarea
                placeholder="Cuéntanos qué tipo de concierto necesitas: sala, evento, horas aproximadas, equipo disponible..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={8}
                className="p-4 rounded bg-gray-900 text-white placeholder-gray-400 focus:outline-none resize-none"
                disabled={loading}
              />
              <button
                type="submit"
                className="bg-[#04B0C8] hover:bg-[#038a9c] transition rounded py-4 font-semibold"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar"}
              </button>
            </form>
          )}

          {error && <p className="text-red-500 mt-4 font-semibold">{error}</p>}
        </div>

        {/* Síguenos - 40% ancho, centrado verticalmente y fondo suave */}
        <div
          className="flex flex-col md:w-2/5 bg-gray-900  bg-opacity-95  text-center md:text-left p-8 rounded-lg"
          style={{
            // backgroundColor: "rgba(0, 30, 34, 0.75)", // fondo azul muy suave con transparencia
            justifyContent: "center",
          }}
        >
          <h2 className="text-4xl font-bold mb-6 text-[#04B0C8]">Síguenos</h2>
          <p className="text-lg mb-12 font-medium max-w-md mx-auto md:mx-0">
            Descubre nuestros directos, ensayos y novedades en redes sociales. ¡Síguenos y forma parte del ruido!
          </p>

          <div className="flex justify-center md:justify-start gap-8 text-4xl">
            <a href="https://www.facebook.com/thecrooks" target="_blank" rel="noreferrer" aria-label="Facebook">
              <FaFacebookF className="hover:text-[#04B0C8] transition" />
            </a>
            <a href="https://www.instagram.com/thecrooks" target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram className="hover:text-[#04B0C8] transition" />
            </a>
            <a href="https://www.youtube.com/thecrooks" target="_blank" rel="noreferrer" aria-label="YouTube">
              <FaYoutube className="hover:text-[#04B0C8] transition" />
            </a>
            <a href="https://www.twitter.com/thecrooks" target="_blank" rel="noreferrer" aria-label="Twitter">
              <FaTwitter className="hover:text-[#04B0C8] transition" />
            </a>
          </div>
        </div>
      </div>
      <div className="relative z-10">
        {/* Aquí va tu contenido incluyendo el botón */}
        <BackButton />
      </div>
    </div>
  );
};

export default ContactoPage;
