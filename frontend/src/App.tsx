import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar.tsx';
import Footer from './components/Footer.tsx';
import HomePage from './pages/HomePage.tsx';
import ConciertosPage from './pages/ConciertosPage';
import MultimediaPage from './pages/MultimediaPage';
import OpinionesPage from './pages/OpinionesPage.tsx';
import ContactoPage from './pages/ContactoPage.tsx';

function App() {
  return (
    <>
      <Navbar />
      <main className="bg-gray-900 text-white min-h-[calc(100vh-4rem)] w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/conciertos" element={<ConciertosPage />} />
          <Route path="/multimedia" element={<MultimediaPage />} />
          <Route path="/opiniones" element={<OpinionesPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}


export default App;
