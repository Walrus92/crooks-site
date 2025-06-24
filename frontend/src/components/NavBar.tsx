import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const location = useLocation();
  const forceShow = ["/multimedia", "/conciertos", "/contacto"].includes(location.pathname);
  const [showNavbar, setShowNavbar] = useState(false);
  const [compact, setCompact] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (forceShow) {
      setShowNavbar(true);
      setCompact(false);
      return;
    }
    const handleScroll = () => {
      const y = window.scrollY;
      setShowNavbar(y > 50);
      setCompact(y > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [forceShow]);

  // Función para cerrar menú móvil al navegar
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed-navbar ${showNavbar ? "translate-y-0" : "-translate-y-full"
        } ${compact ? "py-1" : "py-3"} transition-[padding] duration-300 px-8 md:px-16`}
      style={{ justifyContent: "space-between" }}
    >
      <Link to="/" className="pl-2 select-none flex items-center space-x-2">
        <span
          className={`text-[#04B0C8] italic transition-all duration-500 ${compact ? "text-base md:text-lg" : "text-lg md:text-xl"
            }`}
          style={{ fontFamily: "Exorts" }}
        >
          The
        </span>
        <h1
          className={`text-[#04B0C8] font-bold italic tracking-wide drop-shadow-lg transition-all duration-500 ${compact ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"
            }`}
          style={{ fontFamily: "Exorts" }}
        >
          CROOKS
        </h1>
      </Link>

      {/* Desktop nav */}
      <div className="hidden md:flex space-x-8 text-lg">
        {/*  <Link
          to="/bio"
          onClick={handleLinkClick}
          className="hover:underline cursor-pointer bg-transparent border-none p-0"
        >
          Bio
        </Link> */}
        <Link
          to="/conciertos"
          onClick={handleLinkClick}
          className="hover:underline cursor-pointer bg-transparent border-none p-0"
        >
          Conciertos
        </Link>
        <Link
          to="/multimedia"
          onClick={handleLinkClick}
          className="hover:underline cursor-pointer bg-transparent border-none p-0"
        >
          Multimedia
        </Link>
        <Link
          to="/contacto"
          onClick={handleLinkClick}
          className="hover:underline cursor-pointer bg-transparent border-none p-0"
        >
          Contacto
        </Link>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden text-3xl focus:outline-none text-white"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Abrir menú móvil"
      >
        {isMobileMenuOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-90 backdrop-blur p-6 space-y-6 text-center text-lg font-medium absolute top-full left-0 w-full z-50 text-white">
      {/*     <Link
            to="/bio"
            onClick={handleLinkClick}
            className="block w-full hover:underline cursor-pointer bg-transparent border-none p-0"
          >
            Bio
          </Link> */}
          <Link
            to="/conciertos"
            onClick={handleLinkClick}
            className="block w-full hover:underline cursor-pointer bg-transparent border-none p-0"
          >
            Conciertos
          </Link>
          <Link
            to="/multimedia"
            onClick={handleLinkClick}
            className="block w-full hover:underline cursor-pointer bg-transparent border-none p-0"
          >
            Multimedia
          </Link>
          <Link
            to="/contacto"
            onClick={handleLinkClick}
            className="block w-full hover:underline cursor-pointer bg-transparent border-none p-0"
          >
            Contacto
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
