const OpinionesPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] bg-cover bg-center text-white" style={{ backgroundImage: "url('/tu-foto-impactante.jpg')" }}>
      <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Opiniones de The Crooks!</h1>
      <p className="text-xl mb-6">Rock sucio con corazón. Desde Madrid para el mundo.</p>
      <a href="/conciertos" className="bg-red-600 px-6 py-3 rounded text-white font-semibold hover:bg-red-700 transition">¡Escúchanos en directo!</a>
    </div>
  );
};

export default OpinionesPage;
