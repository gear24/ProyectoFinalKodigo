import React, { useEffect, useState } from 'react';
import { useAuth } from './Peticiones/Request';
import { useNavigate } from 'react-router-dom';
import { MutatingDots } from 'react-loader-spinner'; // Importamos el tipo de loader

const Dashboard = () => {
  const { getAllBootcamps, bootcamps, deactivateBootcamp, loginUser, getDashboardData } = useAuth();
  const navigate = useNavigate();
  const [token, setToken] = useState(null); // Verificamos lo del token
  const [loading, setLoading] = useState(true); // Proceso de carga
  const [error, setError] = useState(null); // Estado para manejar mensajes de error
  const [loguedName, setLoguedName] = useState(''); // Estado para almacenar el nombre de usuario

  // Datos de prueba a remover en la versión final
  const username = 'cheetos';
  const password = '123456789';

  useEffect(() => {
    const loginAndFetchData = async () => {
      try {
        const response = await loginUser(username, password); // Fingimos un logueo
        const token = response.token;
        setToken(token); // Asignamos el token

        if (token) {
          await getAllBootcamps(token);
          const dashboardData = await getDashboardData(token); // Obtenemos datos del dashboard
          if (dashboardData && dashboardData.userLogin) {
            setLoguedName(dashboardData.userLogin.username); // seteamos el nombre del login hacia una variable local para referencia

          }
        }
      } catch (error) {
        console.error('Error al iniciar sesión y obtener datos del dashboard:', error);
        setError('No se pudo iniciar sesión. Por favor, verifica tus credenciales.'); // Establece el mensaje de error
      } finally {
        setLoading(false); // Cambia el estado de carga a false al final
      }
    };

    loginAndFetchData();
  }, [getAllBootcamps, loginUser, getDashboardData]);

  const handleDeleteBootcamp = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este bootcamp?')) {
      await deactivateBootcamp(token, id); // El token para borrar
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

      <header className=''>
        <nav>
          <h6 className="max">Bienvenido {loguedName}</h6>
          <button className="small-round" onClick={() => navigate('/bootcamp-form')}>
            <i>add</i>     
            <div class="tooltip bottom">Agrega un nuevo bootcamp</div>       
          </button>
          <button className="small-round" onClick={() => navigate('/bootcamp-form')}>
            <i>logout</i>            
            <div class="tooltip bottom">Cierra sesion</div>
          </button>
          
        </nav>
      </header>
      <main className="responsive">

        <article class="border  center-align middle-align">
          <div class="row">
            <div class="max">
              <h1>Bootcamps</h1>
            </div>
          </div>
        </article>

        
          {bootcamps.filter(bootcamp => bootcamp.active === true).map((bootcamp) => (

                  

        <article class=" round border " key={bootcamp.id}>
          <div class="row">
            <div class="max">
              <h2>{bootcamp.name}</h2>
              <p>{bootcamp.description}</p>
              <p>Tecnologías: {bootcamp.technologies.join(', ')}</p>
            </div>
          </div>
          <nav>
          <button onClick={() => handleDeleteBootcamp(bootcamp.id)}>Eliminar Bootcamp</button>
          <button onClick={() => navigate(`/bootcamp-form`, { state: { bootcamp } })}>Editar Bootcamp</button>
          </nav>
        </article>
          ))}
      
    </main >
    </>
  );
};

export default Dashboard;