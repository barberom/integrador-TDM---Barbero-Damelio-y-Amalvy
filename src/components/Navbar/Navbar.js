import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    manejadorLogout() {
        cookies.remove("usuariosSession", { path: "/" });
        cookies.remove("auth-usuario", { path: "/" });
        sessionStorage.removeItem("usuarioEnSesion");
        this.props.history.push("/Login");
    }

    render() {
        const estaLogueado = cookies.get("usuariosSession");

        return (
            <nav>
                <ul className="navbar">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/Peliculas">Peliculas</Link></li>
                    <li><Link to="/Series">Series</Link></li>
                    <li><Link to="/Favoritos">Favoritos</Link></li>
                </ul>

                <ul className="acceso">
                    {estaLogueado === undefined ? (
                        <>
                            <li><Link to="/Login">Login</Link></li>
                            <li><Link to="/Register">Register</Link></li>
                        </>
                    ) : (
                        <>
                            <li style={{color: "white"}}>
                                {cookies.get("auth-usuario")}
                            </li>
                            <li>
                                <button onClick={() => this.manejadorLogout()}>
                                    Cerrar Sesión
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        );
    }
}

export default withRouter(Navbar);