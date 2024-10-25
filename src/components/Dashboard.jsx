import React, { useEffect, useState } from 'react';
import { useAuth } from './Peticiones/Request';
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const { getAllBootcamps, bootcamps, deactivateBootcamp, loginUser } = useAuth();
  const navigate = useNavigate();
  const [token, setToken] = useState(null); // Almacenar el token



  // Credenciales quemadas 
  const username = 'cheetos';
  const password = '123456789';

  useEffect(() => {
    const loginAndFetchBootcamps = async () => {
      try {
        // Login automático
        const response = await loginUser(username, password);
        const token = response.token; 
        setToken(token);

        // con el token pa'cer la solicitud para obtener los bootcamps
        if (token) {
          await getAllBootcamps(token);
        }
      } catch (error) {
        console.error('Error al iniciar sesión y obtener bootcamps:', error);
      }
    };

    loginAndFetchBootcamps();
  }, [getAllBootcamps, loginUser]);

  const handleDeleteBootcamp = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este bootcamp?')) {
      await deactivateBootcamp(token, id); // se usa el token almacenado
    }
  };

  if (!token) {
    return <h2>Cargando... Iniciando sesión...</h2>; // Puedes manejar un estado de carga
  }

  return (
    <>
      <h1>Bootcamps</h1>
      <button onClick={() => navigate('/bootcamp-form')}>Agregar Bootcamp</button>

      <ul>
        {bootcamps.filter(bootcamp => bootcamp.active === true).map((bootcamp) => (
          <li key={bootcamp.id}>
            <h2>{bootcamp.name}</h2>
            <p>{bootcamp.description}</p>
            <p>Tecnologías: {bootcamp.technologies.join(', ')}</p>
            <button onClick={() => handleDeleteBootcamp(bootcamp.id)}>Eliminar Bootcamp</button>
            <button onClick={() => navigate(`/bootcamp-form`, { state: { bootcamp } })}>Editar Bootcamp</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Dashboard;
