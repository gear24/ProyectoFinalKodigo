import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderNav = ({ loguedName }) => {
  const navigate = useNavigate();

  function logOut(){
    localStorage.clear();
    navigate('/login');
  }
  return (
    <header className='blue-grey10'>
      <nav>
        <h6 className="max ">Bienvenido {loguedName}</h6>
        <button className="small-round blue-grey2" onClick={() => navigate('/bootcamp-form')}>
          <i>add</i>
          <div className="tooltip bottom">Agrega un nuevo bootcamp</div>
        </button>
        <button className="small-round blue-grey2" onClick={() => logOut()}>
          <i>logout</i>
          <div className="tooltip bottom">Cierra sesión</div>
        </button>
      </nav>
    </header>
  );
};

export default HeaderNav;
