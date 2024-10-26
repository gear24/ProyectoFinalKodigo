import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Request } from './Services/Request';
import Dashboard from './components/Dashboard';
import BootcampForm from './Pages/Dashboard/BootcampForm';
//importamos a beer
import "beercss";
import "material-dynamic-colors";
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';

const App = () => {
  return (
    //lo de rutas
    <Router>
      {/* lo del contexto */}
      <Request>
        {/* definimos rutas */}
        <Routes>
          <Route path="/*" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bootcamp-form" element={<BootcampForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
      </Request>
    </Router>
  );
};

export default App;



