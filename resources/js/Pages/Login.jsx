import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Credenciales.css';
import { login } from '../Config/apiClient';
import { Colores } from '../Scripts/BibliotecaStyle';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
            if (response.error) {
                alert("Las credenciales son incorrectas")
                return;
            }

            navigate('/administrable');

        } catch (err) {
            console.error('Error en el login:', err.response?.data || err.message);
            setError('Error en el login:', err.response?.data || err.message);
        }

    };

    return (
        <div className="contenedor">
            <div className="contenedor_FiltroNegro">
                <div className="contenido_Login" style={{
                    width: '100%',
                    backgroundColor: Colores["Crema"],

                }}>

                    <div className="bloque_Login bloque_datos_login">
                        <h4 className="text-center text-dark">System Food - APPEXIA</h4>
                        <i><img src="/ImagenLogin.png" alt="Logo Restaurantes Appex-IA" /></i>

                        {error && <p className="error">{error}</p>}

                        <form id="form_Login" onSubmit={handleSubmit}>
                            <p>!Hola! Bienvenidos al sistema de Campos Chicken</p>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                placeholder="Usuario"
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

                            <button type="submit">Iniciar Sesión</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
