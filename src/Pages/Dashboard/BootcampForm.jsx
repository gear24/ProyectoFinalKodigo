import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../Services/Request';

const BootcampForm = () => {
  const location = useLocation();
  const bootcampToEdit = location.state?.bootcamp; // se toma el bootcamp desde el estado
  const { register, handleSubmit, setValue } = useForm();
  const { createBootcamp, updateBootcamp, goBack } = useAuth();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (bootcampToEdit) {
      setValue('name', bootcampToEdit.name);
      setValue('description', bootcampToEdit.description);
      setValue('technologies', bootcampToEdit.technologies.join(', '));
    }
  }, [bootcampToEdit, setValue]);

  const onSubmit = async (data) => {
    if (bootcampToEdit) {
      await updateBootcamp(token, bootcampToEdit.id, data.name, data.description, data.technologies.split(',').map(tech => tech.trim()));
    } else {
      await createBootcamp(token, data.name, data.description, data.technologies.split(',').map(tech => tech.trim()));
    }
  };

  return (
    <>
      <main className="responsive">        
        <article className="  center-align blue-grey10 ">
        <article className="border blue-grey-border">
          <div>
            <div className="max">
            {bootcampToEdit ? 
        <><i className="extra">edit_note</i><h1>Edicion de bootcamp</h1></> : 
        <><i className="extra">stylus_note</i><h1>Creacion de bootcamp</h1></> }
            </div>
          </div>
        </article>
        <div className="large-space"></div>

          <div>

            
            <form onSubmit={handleSubmit(onSubmit)}>

            
              <div className="field border blue-grey9">              
                <input type="text" {...register('name', { required: true })} placeholder="Titulo"/>
                <span className='helper'>Ingrese su titulo </span>      
              </div>

              <div className="field textarea border blue-grey9">    
                <textarea {...register('description', { required: true })} placeholder="Pedro pela papas con un pelador"></textarea>
                <span className='helper'>Ingrese su descripcion</span>      
              </div> 

              <div className="field border blue-grey8 ">              
                <input {...register('technologies', { required: true })} placeholder="Separadas por comas"/>
                <span className='helper'>Ingrese las tecnologias </span>      
              </div>

              <div className="space"></div>
              <nav className="center-align">
                <button type="submit" className='blue-grey3 black-text'>{bootcampToEdit ? 'Actualizar' : 'Agregar'} Bootcamp</button>
                <button className='blue-grey2 black-text' onClick={() => { goBack(''); }}><i>arrow_back</i> Ir atras</button>
              </nav>

            </form>
            
            



          </div>
          
        </article>



        
      </main>
    </>
  );
};

export default BootcampForm;
