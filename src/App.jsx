import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Request } from './components/Peticiones/Request';
import Dashboard from './components/Dashboard';
import BootcampForm from './components/BootcampForm'; 
//importamos a beer
import "beercss";
import "material-dynamic-colors";

const App = () => {
  return (
    //lo de rutas
    <Router>
      {/* lo del contexto */}
      <Request>
        {/* definimos rutas */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bootcamp-form" element={<BootcampForm />} />
        </Routes>
      </Request>
    </Router>
  );
};

export default App;
