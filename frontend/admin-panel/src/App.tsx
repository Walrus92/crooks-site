import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
// Aquí pondrás los componentes protegidos
import AdminPanel from "./components/AdminPanel.tsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div>
      {isLoggedIn ? <AdminPanel /> : <LoginForm onLogin={handleLogin} />}
    </div>
  );
}

export default App;
