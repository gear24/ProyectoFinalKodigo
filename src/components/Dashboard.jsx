import React, { useEffect, useState } from 'react';
import { useAuth } from './Peticiones/Request';
import { useNavigate } from 'react-router-dom';
import { MutatingDots } from 'react-loader-spinner'; // Importa el spinner

const Dashboard = () => {
  const { getAllBootcamps, bootcamps, deactivateBootcamp, loginUser } = useAuth();
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado para manejar mensajes de error

  const username = 'cheetos';
  const password = '123456789';

  useEffect(() => {
    const loginAndFetchBootcamps = async () => {
      try {
        const response = await loginUser(username, password);
        const token = response.token; 
        setToken(token);

        if (token) {
          await getAllBootcamps(token);
        }
      } catch (error) {
        console.error('Error al iniciar sesión y obtener bootcamps:', error);
        setError('No se pudo iniciar sesión. Por favor, verifica tus credenciales.'); // Establece el mensaje de error
      } finally {
        setLoading(false); // Cambia el estado de carga a false al final
      }
    };

    loginAndFetchBootcamps();
  }, [getAllBootcamps, loginUser]);

  const handleDeleteBootcamp = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este bootcamp?')) {
      await deactivateBootcamp(token, id);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <MutatingDots color="#00BFFF" height={100} width={100} />
      </div>
    );
  }

  if (error) {
    return <h2>{error}</h2>; // Muestra el mensaje de error
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