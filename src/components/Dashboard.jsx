import React, { useEffect, useState } from 'react';
import { useAuth } from './Peticiones/Request';
import { useNavigate } from 'react-router-dom';
import { MutatingDots } from 'react-loader-spinner'; // Importamos el tipo de loader

const Dashboard = () => {
  const { getAllBootcamps, bootcamps, deactivateBootcamp, getDashboardData } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Proceso de carga
  const [error, setError] = useState(null); // Estado para manejar mensajes de error
  const [loguedName, setLoguedName] = useState(''); // Estado para almacenar el nombre de usuario

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtiene el token del localStorage
        if (token) { // Solo procede si hay un token
          await getAllBootcamps(token); // Obtiene los bootcamps con el token proporcionado
          const dashboardData = await getDashboardData(token); // Obtenemos datos del dashboard
          if (dashboardData && dashboardData.userLogin) {
            setLoguedName(dashboardData.userLogin.username); // Seteamos el nombre de usuario logueado
          }
        } else {
          setError('No se encontró un token válido.'); // Muestra error si no hay token
        }
      } catch (error) {
        console.error('Error al obtener datos del dashboard:', error);
        setError('Error al obtener datos del dashboard.');
      } finally {
        setLoading(false); // Cambia el estado de carga a false al final
      }
    };

    fetchData();
  }, [getAllBootcamps, getDashboardData]);

  const handleDeleteBootcamp = async (id) => {
    const token = localStorage.getItem('token'); // Obtiene el token antes de realizar la acción
    if (token && window.confirm('¿Estás seguro de que deseas eliminar este bootcamp?')) {
      await deactivateBootcamp(token, id); // Usa el token para desactivar el bootcamp
    } else {
      setError('No se encontró un token válido para eliminar.');
    }
  };

  if (loading) {
    // Loader
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
      <header className='blue-grey10'>
        <nav>
          <h6 className="max ">Bienvenido {loguedName}</h6>
          <button className="small-round blue-grey2" onClick={() => navigate('/bootcamp-form')}>
            <i>add</i>     
            <div className="tooltip bottom">Agrega un nuevo bootcamp</div>       
          </button>
          <button className="small-round blue-grey2" onClick={() => navigate('/logout')}>
            <i>logout</i>            
            <div className="tooltip bottom">Cierra sesión</div>
          </button>
        </nav>
      </header>
      <main className="responsive">
        <article className="border blue-grey-border center-align middle-align blue-grey10">
          <div className="row">
            <div className="max">
              <h1>Bootcamps</h1>
            </div>
          </div>
        </article>

        {bootcamps.filter(bootcamp => bootcamp.active === true).map((bootcamp) => (
          <article className="round border blue-grey-border blue-grey8" key={bootcamp.id}>
            <div className="row">
              <div className="max">
                <h2>{bootcamp.name}</h2>
                <p>{bootcamp.description}</p>
                <p>Tecnologías: {bootcamp.technologies.join(', ')}</p>
              </div>
            </div>
            <nav>
              <button className='blue-grey3 black-text' onClick={() => handleDeleteBootcamp(bootcamp.id)}>Eliminar Bootcamp</button>
              <button className='blue-grey3 black-text' onClick={() => navigate(`/bootcamp-form`, { state: { bootcamp } })}>Editar Bootcamp</button>
            </nav>
          </article>
        ))}
      </main>
    </>
  );
};

export default Dashboard;
