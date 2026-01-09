import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

function Login({ aoFazerLogin }) {
    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">Invent&aacute;rio Vegetal</h1>
                <p className="login-subtitle">Z&ecirc;nite Tecnologia</p>

                <div className="google-btn-wrapper">
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            aoFazerLogin(credentialResponse);
                        }}
                        onError={() => {
                            console.log('Login Falhou');
                        }}
                        useOneTap
                    />
                </div>
            </div>
        </div>
    );
}

export default Login;