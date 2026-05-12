import React, { useState, useEffect } from "react";

function Register(props) {

    const [email, setEmail] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState("");

    function cambiarEmail(event) {
        setEmail(event.target.value);
    }

    function cambiarContraseña(event) {
        setContraseña(event.target.value);
    }

    function evitarSubmit(event) {
        console.log("evitando submit");
        event.preventDefault();
        setError("");
        
        let email = email;
        let contraseña = contraseña;

        if (contraseña.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        let usuariosStorage = localStorage.getItem("usuarios");
        let usuarios = usuariosStorage ? JSON.parse(usuariosStorage) : [];

        let repetidos = usuarios.filter(user => user.email === email);

        if (repetidos.length > 0) {
            setError("El email ya está en uso");
            return;
        }
            
        usuarios.push({ email: email, contraseña: contraseña });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        props.history.push("/login");
    }

        return (
            <section className="sRegister">
            <h2>Crear Cuenta</h2>
            <form onSubmit={(event) => evitarSubmit(event)}>
                <label>Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    onChange={(event) => cambiarEmail(event)} 
                    value={email} 
                />
                <label>Contraseña:</label>
                <input 
                    type="password" 
                    name="contraseña" 
                    onChange={(event) => cambiarContraseña(event)} 
                    value={contraseña} 
                />
                <button type="submit">Registrarme</button>
            </form>
            {error !== "" ? <p>{error}</p> : null}
            </section>
        );
    }

export default Register;