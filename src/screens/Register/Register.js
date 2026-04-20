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

   cambiarUsername(event) {
        this.setState({
            usuario: event.target.value
        });
    }

    cambiarEmail(event) {
        this.setState({
            email: event.target.value
        });
    }

    cambiarPassword(event) {
        this.setState({
            password: event.target.value
        });}

    evitarSubmit(event) {
        event.preventDefault();
        const email = this.state.email;
        const contraseña = this.state.password;
        if (password.length < 6) {
            this.setState({ error: "La contraseña debe tener al menos 6 caracteres" });
        } else {
            let usersStorage = localStorage.getItem("users");
            let users = usersStorage ? JSON.parse(usersStorage) : [];

            const existe = users.find(user => user.email === email);

            if (existe) {
                this.setState({ error: "El email ya está en uso" });
            } else {
                users.push({ email: email, contraseña: contraseña });
                localStorage.setItem("users", JSON.stringify(users));
                this.props.history.push("/login");
            }
        }
    }

    render() {
        return (
            <form onSubmit={(event) => this.evitarSubmit(event)}>
                <h2>Crear Cuenta</h2>
                <input 
                    tipo="email" 
                    nombre="email" 
                    onChange={(event) => this.controlarCambios(event)} 
                    valor={this.state.email} 
                />
                <input 
                    tipo="password" 
                    nombre="password" 
                    onChange={(event) => this.controlarCambios(event)} 
                    valor={this.state.contraseña} 
                />
                <button tipo="submit">Registrarme</button>
            </form>
        );
    }
}

export default Register;