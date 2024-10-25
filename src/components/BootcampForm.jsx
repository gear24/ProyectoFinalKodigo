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
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJjaGVldG9zIiwiaWF0IjoxNzI5ODMxNTcwLCJleHAiOjE3Mjk4MzUxNzB9.ykaoRUCRGYlAU0IqD0qA76ySN5MnYOva2yHiEPktqiI';

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
