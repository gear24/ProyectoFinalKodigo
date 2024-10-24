// BootcampForm.js
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { useAuth } from './Peticiones/Request';

const BootcampForm = () => {
  const location = useLocation();
  const bootcampToEdit = location.state?.bootcamp; // se toma el bootcamp desde el estado
  const { register, handleSubmit, setValue } = useForm();
  const { createBootcamp, updateBootcamp,goBack } = useAuth();
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJjaGVldG9zIiwiaWF0IjoxNzI5NzY0ODA2LCJleHAiOjE3Mjk3Njg0MDZ9.2kmaiZ8G8nUNr1yp3XubcldLRckf04Z0twQuquQ7q3E';

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
    <><form onSubmit={handleSubmit(onSubmit)}>
          <div>
              <label>Nombre:</label>
              <input {...register('name', { required: true })} />
          </div>
          <div>
              <label>Descripción:</label>
              <textarea {...register('description', { required: true })} />
          </div>
          <div>
              <label>Tecnologías:</label>
              <input {...register('technologies', { required: true })} placeholder="Separadas por comas" />
          </div>
          <button type="submit">{bootcampToEdit ? 'Actualizar' : 'Agregar'} Bootcamp</button>
      </form><button onClick={() => { goBack(''); } }><i>arrow_back</i> Ir atras</button></>
  );
};

export default BootcampForm;
