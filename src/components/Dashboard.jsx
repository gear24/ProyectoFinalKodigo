import React, { useEffect } from 'react';
import { useAuth } from './Peticiones/Request';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { getAllBootcamps, bootcamps, deactivateBootcamp } = useAuth();
  const navigate = useNavigate();
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJjaGVldG9zIiwiaWF0IjoxNzI5NzY0ODA2LCJleHAiOjE3Mjk3Njg0MDZ9.2kmaiZ8G8nUNr1yp3XubcldLRckf04Z0twQuquQ7q3E';

  // vemos si el token está o neles
  if (!token) {
    return <h2>Acceso denegado. Por favor, inicia sesión.</h2>;
  }

  useEffect(() => {
    const fetchBootcamps = async () => {
      await getAllBootcamps(token);
    };

    fetchBootcamps();
  }, [getAllBootcamps, token]);

  const handleDeleteBootcamp = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este bootcamp?')) {
      await deactivateBootcamp(token, id);
    }
  };

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