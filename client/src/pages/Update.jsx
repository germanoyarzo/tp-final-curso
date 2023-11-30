import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Update = () => {
  const user = localStorage.getItem("username");
  const { id } = useParams();
  const [empleado, setEmpleado] = useState({
    nombre: "",
    apellido: "",
    trabajo: "",
    edad: null,
    salario: null,
    mail: "",
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmpleado = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/empleados/${id}`);
        setEmpleado(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEmpleado();
  }, [id]);

  const handleChange = (e) => {
    setEmpleado((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/empleados/${id}`, empleado);
      navigate("/empleados");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  if (!user) {
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
    <h1>Actualizar Empleado</h1>
    <input
      style={{ width: "100%", boxSizing: "border-box", marginBottom: "10px" }}
      type="text"
      placeholder="Nombre"
      name="nombre"
      value={empleado.nombre}
      onChange={handleChange}
    />
    <textarea
      style={{ width: "100%", boxSizing: "border-box", marginBottom: "10px" }}
      rows={5}
      type="text"
      placeholder="Apellido"
      name="apellido"
      value={empleado.apellido}
      onChange={handleChange}
    />
    <textarea
      style={{ width: "100%", boxSizing: "border-box", marginBottom: "10px" }}
      rows={5}
      type="text"
      placeholder="Trabajo"
      name="trabajo"
      value={empleado.trabajo}
      onChange={handleChange}
    />
    <input
      style={{ width: "100%", boxSizing: "border-box", marginBottom: "10px" }}
      type="number"
      placeholder="Edad"
      name="edad"
      value={empleado.edad}
      onChange={handleChange}
    />
    <input
      style={{ width: "100%", boxSizing: "border-box", marginBottom: "10px" }}
      type="number"
      placeholder="Salario"
      name="salario"
      value={empleado.salario}
      onChange={handleChange}
    />
    <input
      style={{ width: "100%", boxSizing: "border-box", marginBottom: "10px" }}
      type="text"
      placeholder="Mail"
      name="mail"
      value={empleado.mail}
      onChange={handleChange}
    />
    <button onClick={handleUpdate}>Actualizar</button>
    {error && "Algo anduvo mal!"}
    <Link to="/empleados">Ver todos los empleados</Link>
    <div style={{ padding: "20px 23px" }}>
      <Footer />
    </div>
  </div>

  );
};

export default Update;
