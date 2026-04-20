import React, { Component } from "react";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
        };
    }

    controlarCambios(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    evitarSubmit(event) {
        event.preventDefault();
        const email = this.state.email;
        const password = this.state.password;
        if (password.length < 6) {
            this.setState({ error: "La contraseña debe tener al menos 6 caracteres" });
        } else {
            let usersStorage = localStorage.getItem("users");
            let users = usersStorage ? JSON.parse(usersStorage) : [];

            const existe = users.find(user => user.email === email);

            if (existe) {
                this.setState({ error: "El email ya está en uso" });
            } else {
                users.push({ email: email, password: password });
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
                    type="email" 
                    name="email" 
                    onChange={(e) => this.controlarCambios(e)} 
                    value={this.state.email} 
                />
                <input 
                    type="password" 
                    name="password" 
                    onChange={(e) => this.controlarCambios(e)} 
                    value={this.state.password} 
                />
                <button type="submit">Registrarme</button>
                {this.state.error && <p>{this.state.error}</p>}
            </form>
        );
    }
}

export default Register;