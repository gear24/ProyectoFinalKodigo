import { useEffect } from 'react';
import { useForm } from "react-hook-form"
import '../../assets/css/Login.css'
import { login } from '../../Services/authService'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

function Login() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmitForm = (data) => {
        login(data).then((oToken) => {
            localStorage.setItem('jwt', oToken.token)
            Swal.fire({
                title: '¡Bien hecho!',
                text: "¡Has iniciado sesión correctamente!",
                icon: 'success',
                confirmButtonText: `<span onClick={${redirectTo('/dashboard')}}>Aceptrar</span>`
            });
        }).catch((error) => {
            Swal.fire({
                title: '¡Error al iniciar sesión!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo'
            });
        });
    }
    function redirectTo(path) {
        navigate(path);
    };
    useEffect(() => {
    }, []);

    return (
        <div className="login" id="login">
            <form className="login__form" onSubmit={handleSubmit(onSubmitForm)}>
                <h2 className="login__title">Iniciar sesión</h2>

                <div className="login__group">
                    <div>
                        <label className="login__label">Correo</label>
                        <input type="text" placeholder="Correo electrónico" id="email" className="login__input" {...register('username')} />
                    </div>

                    <div>
                        <label className="login__label">Contraseña</label>
                        <input type="password" placeholder="Escribe tu contraseña" id="password" className="login__input" {...register('password')} />
                    </div>
                </div>

                <div className='login__actions'>
                    <p className="login__signup">
                        ¿Aún no tienes una cuenta? <Link to="/register">Registrate</Link>
                    </p>

                    <button type="submit" className="login__button">Inciar Sesión</button>
                </div>
            </form>
        </div>
    )
}

export default Login;