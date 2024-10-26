import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import '../../assets/css/SignUp.css'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom';
import { register as registerUser,login } from '../../Services/authService'
function SignUp() {
    const passwordLength = 6;
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const onSubmitForm = async (data) => {
        if (data.password !== data.confirmPassword) {
            Swal.fire({
                title: '¡Error de contraseñas!',
                text: 'Las contraseñas no coinciden.',
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo'
            });
        }
        else if (data.password.length < passwordLength) {
            Swal.fire({
                title: '¡Error de contraseñas!',
                text: `Las contraseñas deben tener ${passwordLength} o más digitos.`,
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo'
            });
        }
        else {
            registerUser(data).then((oRegister) => {
                login(data).then((oToken) => {
                    localStorage.setItem('jwt', oToken.token)
                    Swal.fire({
                        title: '¡Bien hecho!',
                        text: oRegister.message,
                        icon: 'success',
                        confirmButtonText: `<span onClick={${redirectTo('/dashboard')}}>Aceptrar</span>`
                    });
                }).catch((error) => {
                    Swal.fire({
                        title: '¡Error al iniciar sesión con usuario creado!',
                        text: error.message,
                        icon: 'error',
                        confirmButtonText: 'Intentar de nuevo'
                    });
                });
            })
                .catch((error) => {
                    Swal.fire({
                        title: '¡Error al registrar usuario!',
                        text: error.message,
                        icon: 'error',
                        confirmButtonText: 'Intentar de nuevo'
                    });
                });
        }
    }
    function redirectTo(path) {
        navigate(path);
    };
    useEffect(() => {
    }, []);

    return (
        <div className="signup" id="signup">
            <form className="signup__form" onSubmit={handleSubmit(onSubmitForm)}>
                <h2 className="signup__title">Registrarte</h2>

                <div className="signup__group">
                    <div>
                        <label className="signup__label">Correo</label>
                        <input type="text" placeholder="Correo electrónico" id="email" className="signup__input" {...register('username')} />
                    </div>

                    <div>
                        <label className="signup__label">Contraseña</label>
                        <input type="password" placeholder="Escribe tu contraseña" id="password" className="signup__input" {...register('password')} />
                    </div>
                    <div>
                        <label className="signup__label">Confirmar Contraseña</label>
                        <input type="password" placeholder="Confirma tu contraseña" id="confirm-password" className="signup__input" {...register('confirmPassword')} />
                    </div>
                </div>

                <div>
                    <p className="signup__login">
                        ¿Ya tienes una cuenta? <Link to="/login">Inciar Sesión</Link>
                    </p>
                    <button type="submit" className="signup__button">Registrarte</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp
