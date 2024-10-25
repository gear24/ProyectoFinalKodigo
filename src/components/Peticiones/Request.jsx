import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Crear contexto
const AuthContext = createContext();

// Proveedor del contexto
export const Request = ({ children }) => {
  const [bootcamps, setBootcamps] = useState([]); // Almacena la lista de bootcamps
  const [errorMessage, setErrorMessage] = useState(null); 
  const navigate = useNavigate(); // lo de navegacion

  // pa obtener todos los bootcamps
  const getAllBootcamps = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/bootcamps/all', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener bootcamps');
      }

      const data = await response.json();
      setBootcamps(data); // Actualiza el estado con los bootcamps
    } catch (error) {
      console.error('Error al obtener bootcamps:', error);
      setErrorMessage('Error al obtener bootcamps.');
    }
  };

  // pa crear un bootcamp
  const createBootcamp = async (token, name, description, technologies) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/bootcamps/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description, technologies }),
      });

      if (!response.ok) {
        throw new Error('Error al crear bootcamp');
      }

      const data = await response.json();
      navigate('/')
      return data;
    } catch (error) {
      console.error('Error al crear bootcamp:', error);
      setErrorMessage('Error al crear bootcamp.');
    }
  };

  // pa actualizar un bootcamp
  const updateBootcamp = async (token, id, name, description, technologies) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/bootcamps/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description, technologies }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar bootcamp');
      }

      const data = await response.json();
      navigate('/')
      return data;
      
    } catch (error) {
      console.error('Error al actualizar bootcamp:', error);
      setErrorMessage('Error al actualizar bootcamp.');
    }
  };

  // pa desactivar un bootcamp
  const deactivateBootcamp = async (token, id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/bootcamps/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al desactivar bootcamp');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al desactivar bootcamp:', error);
      setErrorMessage('Error al desactivar bootcamp.');
    }
  };

  // pa obtener datos del dashboard
  const getDashboardData = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/dashboard', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener datos del dashboard');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener datos del dashboard:', error);
      setErrorMessage('Error al obtener datos del dashboard.');
    }
  };

  const goBack = (route) => navigate(`/${route}`);

  // pa iniciar sesión
  const loginUser = async (username, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Error al iniciar sesión');
      }

      const data = await response.json();
      //console.log('Respuesta de login:', data); //pal issue del cel
      return data; // Aquí puedes devolver el token que obtuviste
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setErrorMessage('Error al iniciar sesión.');
    }
  };

  // pa registrar un usuario
  const registerUser = async (username, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Error al registrarse');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al registrarse:', error);
      setErrorMessage('Error al registrarse.');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      bootcamps, 
      errorMessage, 
      getAllBootcamps, 
      createBootcamp, 
      updateBootcamp, 
      deactivateBootcamp, 
      getDashboardData, 
      loginUser, 
      registerUser,
      goBack
    }}>        
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto
export const useAuth = () => useContext(AuthContext);