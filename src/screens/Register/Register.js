import React, { Component } from "react";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            contraseña: "",
            error: ""
        };
    }



    cambiarEmail(event) {
        this.setState({
            email: event.target.value
        });
    }

    cambiarContraseña(event) {
        this.setState({
            contraseña: event.target.value
        });}

    evitarSubmit(event) {
        event.preventDefault();
        const email = this.state.email;
        const contraseña = this.state.contraseña;
        if (contraseña.length < 6) {
            this.setState({ error: "La contraseña debe tener al menos 6 caracteres" });
        } else {
            let usuariosStorage = localStorage.getItem("usuarios");
            let usuarios = usuariosStorage ? JSON.parse(usuariosStorage) : [];

            const existe = usuarios.find(user => user.email === email);

            if (existe) {
                this.setState({ error: "El email ya está en uso" });
            } else {
                usuarios.push({ email: email, contraseña: contraseña });
                localStorage.setItem("usuarios", JSON.stringify(usuarios));
                this.props.history.push("/login");
            }
        }
    }

    render() {
        return (
            <section className="sRegister">
            <h2>Crear Cuenta</h2>
            <form onSubmit={(event) => this.evitarSubmit(event)}>
                
                <label for="email">Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    onChange={(event) => this.cambiarEmail(event)} 
                    value={this.state.email} 
                />

                <label for="contraseña">Contraseña:</label>
                <input 
                    type="password" 
                    name="contraseña" 
                    onChange={(event) => this.cambiarContraseña(event)} 
                    value={this.state.contraseña} 
                />
                <button type="submit">Registrarme</button>
            </form>
            </section>
        );
    }
}

export default Register;