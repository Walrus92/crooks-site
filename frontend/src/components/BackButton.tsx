import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center mt-12 mb-8">
      <button
        onClick={() => navigate("/")}
        className="flex items-center text-[#04B0C8] hover:text-[#038a9c] font-semibold"
        aria-label="Volver al inicio"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Volver
      </button>
    </div>
  );
};

export default BackButton;
