import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // <-- import Helmet
import { useGoogleAnalytics } from '../hooks/useGoogleAnalytics';

const isMobileDevice = () => {
  return /Mobi|Android/i.test(navigator.userAgent);
};

const API_URL = import.meta.env.VITE_API_BASE_URL;

interface Concierto { id: number; fecha: string; lugar: string; ciudad: string; descripcion?: string; }
interface MultimediaItem { id: number; filename: string; mimetype: string; path: string; createdAt: string; }

const HomePage = () => {
    useGoogleAnalytics();
  const [isMobile, setIsMobile] = useState(false);
  const [conciertos, setConciertos] = useState<Concierto[]>([]);
  const [multimedia, setMultimedia] = useState<MultimediaItem[]>([]);

  useEffect(() => { setIsMobile(isMobileDevice()); }, []);
  useEffect(() => { fetch(`${API_URL}/api/conciertos`).then(res => res.json()).then(data => setConciertos(data)).catch(err => console.error(err)); }, []);
  useEffect(() => { fetch(`${API_URL}/api/multimedia`).then(res => res.json()).then(data => setMultimedia(data)).catch(err => console.error(err)); }, []);

  const fontWeightClass = isMobile ? 'font-normal' : 'font-black';

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>The Crooks | Rock en directo</title>
        <meta name="description" content="The Crooks, banda de rock en directo. Contrata el grupo para eventos, bodas y pubs. Reventando clásicos con energía." />
        <meta name="keywords" content="banda rock, grupo música, bodas, eventos, conciertos, The Crooks" />
     
     
  {/* Google Analytics GA4 */}
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    `}
  </script>
      </Helmet>

      {/* VIDEO de fondo a pantalla completa */}
      <section className="relative w-full min-h-svh overflow-hidden">
        <video autoPlay loop muted playsInline poster="/hero-poster.jpg" className="absolute inset-0 w-full h-full object-cover object-center" src="/C0096.MP4" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
        <div className="relative z-10 mx-auto max-w-5xl px-4">
          <div className="min-h-svh flex flex-col items-center justify-center text-center text-white space-y-3 md:space-y-5">
            <h1 className={`text-[3rem] md:text-[6rem] leading-none font-[Exorts] text-[#04B0C8] tracking-wider ${isMobile ? "font-normal" : "font-black"}`}>THE</h1>
            <h1 className={`text-[5.5rem] md:text-[10rem] leading-none font-[Exorts] text-[#04B0C8] tracking-wider ${isMobile ? "font-normal" : "font-black"}`}>
              CR<span className="o-glitch">O</span><span className="o-glitch">O</span>KS
            </h1>
            <p className="text-lg md:text-xl font-light tracking-wider text-white/90">Directo, intenso, auténtico</p>
            <div className="pt-2 flex items-center justify-center gap-4 md:gap-6">
              <a href="#contacto" className="inline-block px-6 py-2 rounded-full font-semibold text-lg md:text-xl text-black bg-gradient-to-r from-[#04B0C8] to-[#038aaf] shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-white/70 hover:border-white">¡Contrátanos!</a>
            </div>
          </div>
        </div>
        <a href="#bio" className="hidden md:flex absolute bottom-6 inset-x-0 z-10 justify-center text-white/80" aria-label="Scroll down">
          <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </section>


      {/* SECCIÓN BIO */}
      < div className="section-header bio-header" id="bio" >
        <h2 className={`${fontWeightClass}`}>BIO</h2>
      </div >
      <section className="bg-gray-900 text-white font-sans leading-relaxed max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        {/* Sebas */}
        <div className="bg-gray-800 bg-opacity-80 p-6 rounded-xl text-center shadow-lg">
          <img
            src="/zz-sebas.jpeg"
            alt="Voz y Guitarra"
            className="w-40 h-40 mx-auto rounded-full object-cover mb-4 border-4 border-cyan-400"
          />
          <h3 className="text-2xl font-semibold text-white">Sebas – Voz y Guitarra</h3>
          <p className="text-gray-300 mt-2">
            Voz rasgada que acaricia y revienta a partes iguales. Guitarra baja, mirada arriba: es el rugido que abre camino.
          </p>
        </div>

        {/* Leo */}
        <div className="bg-gray-800 bg-opacity-80 p-6 rounded-xl text-center shadow-lg">
          <img
            src="/zz-leo.jpeg"
            alt="Batería"
            className="w-40 h-40 mx-auto rounded-full object-cover mb-4 border-4 border-cyan-400"
          />
          <h3 className="text-2xl font-semibold text-white">Leo – Batería</h3>
          <p className="text-gray-300 mt-2">
            El metrónomo que late con rabia. Cada golpe suyo es terremoto controlado, precisión quirúrgica con alma de rock.
          </p>
        </div>

        {/* Miguel */}
        <div className="bg-gray-800 bg-opacity-80 p-6 rounded-xl text-center shadow-lg">
          <img
            src="/zz-miguel.jpeg"
            alt="Bajo"
            className="w-40 h-40 mx-auto rounded-full object-cover mb-4 border-4 border-cyan-400"
          />
          <h3 className="text-2xl font-semibold text-white">Miguel – Bajo</h3>
          <p className="text-gray-300 mt-2">
            Groove sólido, riffs que muerden y un bajo que une lo clásico y lo moderno sin pedir permiso. 
          </p>
        </div>
      </section>

{/* SECCIÓN CONCIERTOS */}
<div className="section-header conciertos-header" id="conciertos">
  <h2 className={`${fontWeightClass}`}>CONCIERTOS</h2>
</div>

<section className="bg-gray-900 text-white font-sans max-w-6xl mx-auto px-6 py-12">
  <div className="grid md:grid-cols-3 gap-8">
    {conciertos
      .slice() // Hacemos copia para no mutar estado
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()) // más reciente primero
      .slice(0, 6) // máximo 6 conciertos -> 2 filas de 3 columnas
      .map(({ id, fecha, lugar, ciudad }) => {
        const fechaSinHora = fecha.split("T")[0]; // "2025-06-21"
        const [año, mes, dia] = fechaSinHora.split("-");
        const fechaEvento = new Date(fecha);
        const esPasado = fechaEvento < new Date();

        const opacidad = esPasado ? "opacity-50" : "";
        const colorFecha = esPasado ? "text-gray-400" : "text-[#04B0C8]";
        const colorTexto = esPasado ? "text-gray-400" : "text-gray-300";

        return (
          <div
            key={id}
            className={`bg-gray-800 p-6 rounded-xl shadow-md hover:scale-[1.02] transition-transform duration-200 ${opacidad}`}
          >
            <div className="grid grid-cols-2 items-center">
              <div className="text-center font-orbitron pr-4 border-r border-gray-600">
                <p className={`text-4xl font-bold ${colorFecha}`}>{`${dia}-${mes}`}</p>
                <p className={`text-[1.75rem] ${colorTexto}`}>{año}</p>
              </div>
              <div className="pl-4">
                <p className={`text-xl font-semibold uppercase ${colorTexto}`}>{lugar}</p>
                <p className={`text-sm ${colorTexto}`}>{ciudad}</p>
              </div>
            </div>
          </div>
        );
      })}
  </div>

  {/* ENLACE MÁS FECHAS */}
  <div className="text-right mt-6">
    <Link
      to="/conciertos"
      className="text-yellow-400 hover:underline text-sm font-semibold tracking-wide"
    >
      Ver más fechas →
    </Link>
  </div>
</section>



      {/* SECCIÓN MULTIMEDIA */}

      <div className="section-header multimedia-header" id="multimedia">
        <h2 className={`${fontWeightClass}`}>MULTIMEDIA</h2>
      </div>
      <section className="bg-gray-900 text-white font-sans leading-relaxed max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">
        {multimedia
          .slice() // Hacemos copia para no mutar estado
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 6)
          .map(({ id, path, mimetype }) => {
            const getMediaUrl = (path: string) =>
              `${API_URL}/${path.replace(/\\/g, '/')}`;

            const url = getMediaUrl(path);
            const isVideo = mimetype.startsWith('video/');

            return (
              <div
                key={id}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-md transition-transform transform hover:scale-[1.02] hover:shadow-pink-400 transition-shadow duration-300 aspect-[4/3]"
              >
                {isVideo ? (
                  <video
                    controls
                    className="w-full h-full object-cover rounded-xl"
                    src={url}
                  />
                ) : (
                  <img
                    src={url}
                    alt={`Multimedia ${id}`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                )}
              </div>
            );
          })}
      </section>


      {/* ENLACE MÁS FOTOS */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-right mt-6 pb-6">
          <Link
            to="/multimedia"
            className="text-yellow-400 hover:underline text-sm font-semibold tracking-wide"
          >
            Ver más fotos →
          </Link>
        </div>
      </div>


    </>
  );
};

export default HomePage;
