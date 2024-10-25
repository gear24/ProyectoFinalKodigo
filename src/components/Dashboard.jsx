import React, { useEffect, useState } from 'react';
import { useAuth } from './Peticiones/Request';
import { useNavigate } from 'react-router-dom';
import { MutatingDots } from 'react-loader-spinner'; //importamos el tipo de loader
//https://mhnpd.github.io/react-loader-spinner/docs/category/components/

const Dashboard = () => {
  const { getAllBootcamps, bootcamps, deactivateBootcamp, loginUser } = useAuth();
  const navigate = useNavigate();
  const [token, setToken] = useState(null); //verificamos lo del token
  const [loading, setLoading] = useState(true); // proceso de carda
  const [error, setError] = useState(null); // Estado para manejar mensajes de error

  //usamos datos quemados a remover en la version fnal
  const username = 'cheetos';
  const password = '123456789';

  useEffect(() => {
    const loginAndFetchBootcamps = async () => {
      try {
        const response = await loginUser(username, password); //fingimos un logueo
        const token = response.token; 
        setToken(token);//asignamos a token

        if (token) {
          await getAllBootcamps(token);
        }
      } catch (error) {
        console.error('Error al iniciar sesión y obtener bootcamps:', error);
        setError('No se pudo iniciar sesión. Por favor, verifica tus credenciales.'); // establece el error mesage
      } finally {
        setLoading(false); // Cambia el estado de carga a false al final
      }
    };

    loginAndFetchBootcamps();
  }, [getAllBootcamps, loginUser]);

  const handleDeleteBootcamp = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este bootcamp?')) {
      await deactivateBootcamp(token, id); //el tken pa borrar
    }
  };

  if (loading) {
    //lo del loader
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