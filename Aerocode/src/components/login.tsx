import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

const LoginForm: React.FC = () => {
    
    const [formData, setFormData] = useState({
        email: '',
        senha: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault(); 
        
        console.log("Tentativa de Login (Dados sem verificação):", formData);
            
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">✈️ Acesso Aerocode</h2>
                <p className="login-subtitle">Entre para acessar sua área do funcionário.</p>
                
                <form onSubmit={handleLogin} className="login-form">
                    {/* Campo E-mail */}
                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="seu.nome@aerocode.com"
                        />
                    </div>

                    {/* Campo Senha */}
                    <div className="form-group">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            value={formData.senha}
                            onChange={handleChange}
                            placeholder="Sua senha"
                        />
                    </div>

                    <Link to="/DashboardAero" type="submit" className="login-button">
                        Avançar
                    </Link>
                    
                </form>
            </div>
        </div>
    );
};

export default LoginForm;