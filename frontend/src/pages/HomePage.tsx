import { useEffect, useState } from 'react';

const isMobileDevice = () => {
  return /Mobi|Android/i.test(navigator.userAgent);
};
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

interface Concierto {
  id: number;
  fecha: string;
  lugar: string;
  ciudad: string;
  descripcion?: string;
}

interface MultimediaItem {
  id: number;
  filename: string;
  mimetype: string;
  path: string;
  createdAt: string;
}

const HomePage = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Estados para datos backend
  const [conciertos, setConciertos] = useState<Concierto[]>([]);
  const [multimedia, setMultimedia] = useState<MultimediaItem[]>([]);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  // Fetch de conciertos
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/conciertos`)
      .then(res => res.json())
      .then(data => setConciertos(data))
      .catch(err => console.error('Error cargando conciertos:', err));
  }, []);

  // Fetch de multimedia
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/multimedia`)
      .then(res => res.json())
      .then(data => setMultimedia(data))
      .catch(err => console.error('Error cargando multimedia:', err));
  }, []);

  const fontWeightClass = isMobile ? 'font-normal' : 'font-black';

  return (
    <>
      {/* VIDEO de fondo a pantalla completa */}
      <section className="video-section relative w-full h-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
          src={`/C0096.MP4`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
        <div className="absolute top-1/4 inset-x-0 mx-auto w-max text-white z-10 text-center">
          <h1 className={`text-[3rem] md:text-[6rem] leading-tight md:leading-none font-[Exorts] text-[#04B0C8] tracking-wider md:tracking-wide ${isMobile ? 'font-normal' : 'font-black'
            }`}>
            THE
          </h1>

          <h1 className={`text-[5.5rem] md:text-[10rem] leading-tight md:leading-none font-[Exorts] text-[#04B0C8] tracking-wider md:tracking-wide ${isMobile ? 'font-normal' : 'font-black'
            }`}>
            CR<span className="o-glitch">O</span><span className="o-glitch">O</span>KS
          </h1>
          <p className="mt-4 mb-6 text-lg md:text-xl font-light tracking-wider text-white animate-fadeInSlow">
            Reventando clásicos. En directo.
          </p>
          <a
            href="#contacto"
            className="mt-6 inline-block px-6 py-2 rounded-full font-semibold text-xl text-black bg-gradient-to-r from-[#04B0C8] to-[#038aaf] shadow-md hover:shadow-xl hover:scale-105 transform transition-all duration-300 border-2 border-white hover:border-[#ffffffcc]"
          >
            ¡Contrátanos!
          </a>
        </div>

        {/* Flecha scroll */}
        <div className="absolute bottom-6 inset-x-0 mx-auto w-max z-20 animate-bounce">
          <a href="#bio" aria-label="Scroll down">
            <div className="absolute bottom-6 inset-x-0 mx-auto w-max z-20 animate-bounce">
              <svg
                className="w-6 h-6 text-white mb-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg></div>
            <span className="text-sm text-white">Descubre más</span>
          </a>
        </div>
      </section >

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
            Argentino con alma de escenario. Voz rota pero melódica, guitarra a ras de rodilla y un afro que no se negocia.
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
            Argentino, amante del metal y del fernet. Silencioso, preciso, y con una pegada que hace temblar hasta el suelo.
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
            Madrileño. Bajo en mano, une lo clásico y lo moderno sin pedir permiso. El ancla y el empuje del grupo.
          </p>
        </div>
      </section>


      {/* SECCIÓN CONCIERTOS */}
      <div className="section-header conciertos-header" id="conciertos">
        <h2 className={`${fontWeightClass}`}>CONCIERTOS</h2>
      </div>

      <section className="bg-gray-900 text-white font-sans max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {conciertos.map(({ id, fecha, lugar, ciudad }) => {
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
          <a
            href="/conciertos"
            className="text-yellow-400 hover:underline text-sm font-semibold tracking-wide"
          >
            Ver más fechas →
          </a>
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
              `${API_BASE_URL}/${path.replace(/\\/g, '/')}`;

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
          <a
            href="/multimedia"
            className="text-yellow-400 hover:underline text-sm font-semibold tracking-wide"
          >
            Ver más fotos →
          </a>
        </div>
      </div>


    </>
  );
};

export default HomePage;
