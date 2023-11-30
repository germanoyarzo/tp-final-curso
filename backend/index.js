import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import dotenv from 'dotenv';

const app = express();
const allowedOrigins = ['http://localhost:3000', 'http://localhost:8800'];
const { EMAIL_USER, EMAIL_PASSWORD } = process.env; 
dotenv.config();

// CORS middleware configuration
const corsOptions = {
  origin: allowedOrigins,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));


app.use(express.json());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "curso_full_stack",
});

// app.get("/", (req, res) => {
//   res.json("hello");
// });

app.get("/empleados", (req, res) => {
  const q = "SELECT * FROM empleados";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/empleados", (req, res) => {
  const q = "INSERT INTO empleados(`nombre`, `apellido`, `trabajo`, `edad`, `salario`, `mail`) VALUES (?)";

  const values = [
    req.body.nombre,
    req.body.apellido,
    req.body.trabajo,
    req.body.edad,
    req.body.salario,
    req.body.mail,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/empleados/:id", (req, res) => {
  const empId = req.params.id;
  const q = " DELETE FROM empleados WHERE id_emp = ? ";

  db.query(q, [empId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/empleados/:id", (req, res) => {
  const empleadoId = req.params.id;
  const q =
    "UPDATE empleados SET `nombre`=?, `apellido`=?, `trabajo`=?, `edad`=?, `salario`=?, `mail`=? WHERE id_emp=?";

  const values = [
    req.body.nombre,
    req.body.apellido,
    req.body.trabajo,
    req.body.edad,
    req.body.salario,
    req.body.mail,
    empleadoId,
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).send(err);
    return res.json(data);
  });
});


app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const q = "SELECT * FROM usuarios WHERE username= ? AND password = ?";
  
  db.query(q, [username, password], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (data.length > 0) {
      // Usuario autenticado
      return res.json({ username: username,message: "Login successful" });
    } else {
      // Credenciales incorrectas
      return res.status(401).json({ error: "Incorrect username or password" });
    }
  });
});
app.use(bodyParser.json());



app.post('/api/send-email', async (req, res) => {
  const { to, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user:  process.env.EMAIL_USER, 
      pass:  process.env.EMAIL_PASSWORD 
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Correo electrónico enviado exitosamente' });
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    res.status(500).json({ success: false, message: 'Error al enviar el correo electrónico' });
  }
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
