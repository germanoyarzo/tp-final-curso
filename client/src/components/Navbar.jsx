import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
  };

  const EmailFormButton = () => {
    navigate('/send-email');
  }

  return (
    <nav style={{ background: "teal", display: "flex", justifyContent: "space-between", padding: "10px" }}>
      <button style={{ background: "transparent", padding: "10px" }} onClick={handleLogout}>
        Cerrar sesión
      </button>

      <button style={{ background: "transparent", padding: "10px" }} onClick={EmailFormButton}>Enviar Correo</button>
    </nav>
  
    
  );
};

export default Navbar;
