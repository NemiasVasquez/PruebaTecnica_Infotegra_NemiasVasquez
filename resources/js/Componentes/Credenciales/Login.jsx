import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Credenciales.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/auth/login', {
                email,
                password,
                remember
            });

            localStorage.setItem('token', response.data.access_token);

            navigate('/administrable');

        } catch (err) {
            console.error('Error en el login:', err.response?.data || err.message);
            setError('Credenciales incorrectas. Por favor, intenta nuevamente.');
        }
    };

    return (
        <div className="contenedor">
            <div className="contenedor_FiltroNegro">
                <div className="contenido_Login" style={{
                    width: '100%',
                    backgroundImage: `url('/fontdoLogin.jpg')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    margin: '0px auto',
                    backdropFilter: 'blur(50%)',
                }}>

                    <div className="bloque_Login bloque_datos_login">
                        <h4 className="text-center text-dark">RECAUDACIÓN - COESPELA</h4>
                        <i><img src="/LogoCoespe.png" alt="Colegio estadístico del Perú" /></i>

                        {error && <p className="error">{error}</p>}

                        <form id="form_Login" onSubmit={handleSubmit}>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Correo"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                            />
                            <div>
                                <input
                                    type="checkbox"
                                    name="remember"
                                    id="remember"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                />
                                <label htmlFor="remember">Recuérdame</label>
                            </div>
                            <button type="submit">Iniciar Sesión</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
