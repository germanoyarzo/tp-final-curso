// EmailForm.js

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../style/EmailForm.css';
const EmailForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar datos del formulario al servidor backend
      const response = await axios.post('http://localhost:8800/api/send-email', formData, { withCredentials: true });
      console.log(response.data);
      if(response.data.success) {
        alert('Correo enviado exitosamente');
        navigate('/empleados');
      }
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Enviar Correo</h3>
      <label>
        Destinatario:
        <input
          type="email"
          placeholder='Ingrese el correo del destinatario'
          name="to"
          value={formData.to}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Asunto:
        <input
          type="text"
          placeholder='Ingrese el asunto del correo'
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Mensaje:
        <textarea
          name="message"
          placeholder='Ingrese el mensaje del correo'
          value={formData.message}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit">Enviar Correo</button>
    </form>
  );
};

export default EmailForm;

