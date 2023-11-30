import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link , useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const navigate = useNavigate();
  const user = localStorage.getItem("username");
  useEffect(() => {
    const fetchAllEmpleados = async () => {
      try {
        const res = await axios.get("http://localhost:8800/empleados");
        setEmpleados(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllEmpleados();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/empleados/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/login");
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
    <div>
      {/* <button onClick={handleLogout}>Cerrar sesión</button> */}
      <Navbar />
      <h1>Empleados</h1>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={styles.th}>Nombre</th>
            <th style={styles.th}>Apellido</th>
            <th style={styles.th}>Trabajo</th>
            <th style={styles.th}>Edad</th>
            <th style={styles.th}>Salario</th>
            <th style={styles.th}>Mail</th>
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(empleados) && empleados.map((empleado) => (
            <tr key={empleado.id_emp}>
              <td style={styles.td}>{empleado.nombre}</td>
              <td style={styles.td}>{empleado.apellido}</td>
              <td style={styles.td}>{empleado.trabajo}</td>
              <td style={styles.td}>{empleado.edad}</td>
              <td style={styles.td}>{empleado.salario}</td>
              <td style={styles.td}>{empleado.mail}</td>
              <td style={styles.td}>
                <button style={{background: '#af2525'}} className="delete" onClick={() => handleDelete(empleado.id_emp)}>
                  Borrar
                </button>
                <button className="update">
                  <Link to={`/update/${empleado.id_emp}`} style={{ color: "inherit", textDecoration: "none" }}>
                    Editar
                  </Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Agregar empleado
        </Link>
      </button>
      <div style={{ padding: "20px 23px" }}>
        <Footer />
      </div>
      
    </div>
  );
};

const styles = {
  th: {
    border: "1px solid #dddddd",
    textAlign: "left",
    padding: "8px",
  },
  td: {
    border: "1px solid #dddddd",
    textAlign: "left",
    padding: "8px",
  }

};

export default Empleados;
