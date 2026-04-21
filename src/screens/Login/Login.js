import React, { Component } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Login extends Component {
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
        });
    }

    evitarSubmit(event) {
        event.preventDefault();

        const usuariosEnStorage = localStorage.getItem("usuarios");

        if (usuariosEnStorage !== null) {
            const usuariosParseados = JSON.parse(usuariosEnStorage);
            const usuarioEncontrado = usuariosParseados.find(user => user.email === this.state.email);

            if (usuarioEncontrado && usuarioEncontrado.contraseña === this.state.contraseña) {
                
                cookies.set("usuariosSession", "true", { path: "/" });
                cookies.set("auth-usuario", this.state.email, { path: "/" });

                this.props.history.push("/");
            } else {
                this.setState({ error: "Credenciales incorrectas" });
            }
        } else {
            this.setState({ error: "Credenciales incorrectas" });
        }
    }

    render() {
        return (
            <section>
                <h2>Iniciar Sesión</h2>
                <form onSubmit={(event) => this.evitarSubmit(event)}>
                    <div>
                        <label>Email: </label>
                        <input 
                            type="email" 
                            onChange={(event) => this.cambiarEmail(event)} 
                            value={this.state.email} 
                        />
                    </div>
                    <div>
                        <label>Contraseña: </label>
                        <input 
                            type="password" 
                            onChange={(event) => this.cambiarContraseña(event)} 
                            value={this.state.contraseña} 
                        />
                    </div>
                    <button type="submit">Enviar</button>
                </form>
                {this.state.error !== "" ? <p>{this.state.error}</p> : null}
            </section>
        );
    }
}

export default Login;