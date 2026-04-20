import React, { Component } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Login extends Component {
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
        const { email, password } = this.state;
        const usersStorage = localStorage.getItem("users");

        if (usersStorage === null) {
            this.setState({ error: "Credenciales incorrectas" });
            return;
        }

        const usersParseado = JSON.parse(usersStorage);
        const usuarioEncontrado = usersParseado.find(user => user.email === email);
        if (usuarioEncontrado && usuarioEncontrado.password === password) {
            sessionStorage.setItem("usuarioEnSesion", JSON.stringify({ sesionActiva: true }));
            cookies.set("auth-user", email, { path: "/" });
            cookies.set("userSession", "true", { path: "/" });
            this.props.history.push("/");
        } else {
            this.setState({ error: "Credenciales incorrectas" });
        }
    }

    render() {
        return (
            <section>
                <h2>Login</h2>
                <form onSubmit={(event) => this.evitarSubmit(event)}>
                    <input type="email" name="email" placeholder="Email" onChange={(e) => this.controlarCambios(e)} value={this.state.email} />
                    <input type="password" name="password" placeholder="Password" onChange={(e) => this.controlarCambios(e)} value={this.state.password} />
                    <button type="submit">Entrar</button>
                </form>
                {this.state.error && <p>{this.state.error}</p>}
            </section>
        );
    }
}

export default Login;