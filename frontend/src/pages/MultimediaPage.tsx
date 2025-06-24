import { useEffect, useRef, useState } from 'react';
import BackButton from "../components/BackButton";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

interface MultimediaItem {
  id: number;
  filename: string;
  mimetype: string;
  path: string;
  createdAt: string;
}

const ITEMS_PER_PAGE = 10;

const MultimediaPage = () => {
  const [multimedia, setMultimedia] = useState<MultimediaItem[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<MultimediaItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const galleryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/multimedia`)
      .then(res => res.json())
      .then(data => setMultimedia(data))
      .catch(err => console.error('Error cargando multimedia:', err));
  }, []);

  const getMediaUrl = (path: string) =>
    `${API_BASE_URL}/${path.replace(/\\/g, '/')}`;

  const closeModal = () => setSelectedMedia(null);

  const totalPages = Math.ceil(multimedia.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = multimedia.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPrevPage = () => {
    setCurrentPage(p => Math.max(p - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(p => Math.min(p + 1, totalPages));
  };
  useEffect(() => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentPage]);
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] text-white px-6 py-20 flex flex-col items-center">
      <h1
        className="text-5xl font-extrabold mb-12 bg-clip-text text-transparent drop-shadow-lg"
        style={{ backgroundImage: 'linear-gradient(90deg, #B0C804cc, #8aa102cc)' }}
      >
        Revive momentazos de The Crooks
      </h1>

      {multimedia.length === 0 ? (
        <p className="text-center text-lg text-gray-300">No hay contenido multimedia aún.</p>
      ) : (
        <>
          <section
            ref={galleryRef}
            className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-7xl w-full"
          >
            {currentItems.map(({ id, path, mimetype }) => {
              const url = getMediaUrl(path);
              const isVideo = mimetype.startsWith('video/');

              return (
                <div
                  key={id}
                  onClick={() => setSelectedMedia({ id, filename: '', mimetype, path, createdAt: '' })}
                  className="cursor-pointer bg-gray-900 rounded-xl overflow-hidden shadow-lg shadow-pink-500/60 hover:shadow-yellow-400/80 transition-shadow duration-300 transform hover:scale-105 aspect-[4/3] flex items-center justify-center relative"
                >
                  {isVideo ? (
                    <>
                      <video
                        className="w-full h-full object-cover pointer-events-none"
                        src={url}
                        muted
                        preload="metadata"
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-16 w-16 text-yellow-400 drop-shadow-lg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          stroke="none"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </>
                  ) : (
                    <img
                      src={url}
                      alt={`Multimedia ${id}`}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  )}
                </div>
              );
            })}
          </section>

          {/* Paginación */}
          <div className="mt-10 flex items-center gap-6">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded disabled:opacity-30"
            >
              ← Anterior
            </button>
            <span className="text-lg font-semibold">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded disabled:opacity-30"
            >
              Siguiente →
            </button>
          </div>
        </>
      )}

      {/* Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white text-3xl font-bold hover:text-yellow-400"
              aria-label="Cerrar"
            >
              &times;
            </button>
            {selectedMedia.mimetype.startsWith('video/') ? (
              <video
                controls
                autoPlay
                className="max-w-full max-h-[80vh] rounded"
                src={getMediaUrl(selectedMedia.path)}
              />
            ) : (
              <img
                src={getMediaUrl(selectedMedia.path)}
                alt={`Multimedia ${selectedMedia.id}`}
                className="max-w-full max-h-[80vh] rounded"
              />
            )}
          </div>
        </div>
      )}
      <BackButton />
    </div>
  );

};

export default MultimediaPage;
