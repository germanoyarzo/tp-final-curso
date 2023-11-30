import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Add from "./pages/Add";
import Empleados from "./pages/Empleados";
import Update from "./pages/Update";
import Login from "./pages/Login";
import EmailForm from "./components/EmailForm";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/send-email" element={<EmailForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
