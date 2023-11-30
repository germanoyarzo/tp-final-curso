import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Add = () => {
  const user = localStorage.getItem("username");
  console.log(user)
  const [empleado, setEmpleado] = useState({
    nombre: "",
    apellido: "",
    trabajo: "",
    edad: null,
    salario: null,
    mail: "",
  });
  const [error,setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmpleado((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/empleados", empleado);
      navigate("/empleados");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };
  if (!user || user == undefined) {
    // Si el username no existe, puedes mostrar un mensaje o redirigir al usuario.
    return (
      <div>
        <p>No estás autenticado. Por favor, inicia sesión.</p>
        <Link to="/login">Ir a la página de inicio de sesión</Link>
      </div>
    );
  }
  return (
    <div className="form" style={{ maxWidth: "400px", margin: "auto" }}>
      <Navbar />
      <h1>Agregar Empleado</h1>
      <textarea
        style={{ width: "100%", boxSizing: "border-box", marginBottom: "10px" }}
        type="text"
        placeholder="Nombre"
        name="nombre"
        onChange={handleChange}
      />
      <textarea
        style={{ width: "100%", boxSizing: "border-box", marginBottom: "10px" }}
        type="text"
        placeholder="Apellido"
        name="apellido"
        onChange={handleChange}
      />
      <textarea
        style={{ width: "100%", boxSizing: "border-box", marginBottom: "10px" }}
        type="text"
        placeholder="Trabajo"
        name="trabajo"
        onChange={handleChange}
      />
      <input
        style={{ width: "100%", boxSizing: "border-box", marginBottom: "10px" }}
        type="number"
        placeholder="Edad"
        name="edad"
        onChange={handleChange}
      />
      <input
        style={{ width: "100%", boxSizing: "border-box", marginBottom: "10px" }}
        type="number"
        placeholder="Salario"
        name="salario"
        onChange={handleChange}
      />
      <input
        style={{ width: "100%", boxSizing: "border-box", marginBottom: "10px" }}
        type="text"
        placeholder="Mail"
        name="mail"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Agregar</button>
      {error && "Algo anduvo mal!"}
      <Link to="/">Ver todos los empleados</Link>
      <div style={{ padding: "20px 23px" }}>
        <Footer />
      </div>
    </div>


  );
};

export default Add;
