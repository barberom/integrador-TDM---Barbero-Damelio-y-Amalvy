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
        console.log("evitando submit");
        event.preventDefault();
        
        this.setState({ error: "" });
        
        let email = this.state.email;
        let contraseña = this.state.contraseña;

        if (contraseña.length < 6) {
            this.setState({ error: "La contraseña debe tener al menos 6 caracteres" });
            return;
        }

        let usuariosStorage = localStorage.getItem("usuarios");
        let usuarios = usuariosStorage ? JSON.parse(usuariosStorage) : [];

        let repetidos = usuarios.filter(user => user.email === email);

        if (repetidos.length > 0) {
            this.setState({ error: "El email ya está en uso" });
            return;
        }
            
        usuarios.push({ email: email, contraseña: contraseña });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        this.props.history.push("/login");
    }

    render() {
        return (
            <section className="sRegister">
            <h2>Crear Cuenta</h2>
            <form onSubmit={(event) => this.evitarSubmit(event)}>
                <label>Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    onChange={(event) => this.cambiarEmail(event)} 
                    value={this.state.email} 
                />
                <label>Contraseña:</label>
                <input 
                    type="password" 
                    name="contraseña" 
                    onChange={(event) => this.cambiarContraseña(event)} 
                    value={this.state.contraseña} 
                />
                <button type="submit">Registrarme</button>
            </form>
            {this.state.error !== "" ? <p>{this.state.error}</p> : null}
            </section>
        );
    }
}

export default Register;