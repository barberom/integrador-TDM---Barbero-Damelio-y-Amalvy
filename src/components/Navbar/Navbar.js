import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

function Navbar(props) {

    function manejadorLogout() {
        cookies.remove("usuariosSession", { path: "/" });
        cookies.remove("auth-usuario", { path: "/" });
        sessionStorage.removeItem("usuarioEnSesion");
        props.history.push("/Login");
    }
        
    const estaLogueado = cookies.get("auth-usuario");

    return (
        <nav className="nav">
            <ul className="nav nav-tabs my-4">
                <li className="nav-item"><Link className="nav-a nav-link" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/Peliculas">Peliculas</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/Series">Series</Link></li>
            </ul>

            <ul className="acceso">
                {estaLogueado === undefined ? (
                    <>
                        <li><Link className="nav-link" to="/Login">Login</Link></li>
                        <li><Link className="nav-link" to="/Register">Register</Link></li>
                    </>
                ) : (
                    <>
                        <li className="nav-item"><Link className="nav-link" to="/Favoritos">Favoritos</Link></li>
                        <li>
                            {cookies.get("auth-usuario")}
                        </li>
                        <li>
                            <button className="btn btn-secondary" onClick={() => manejadorLogout()}>
                                Cerrar Sesión
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}


export default withRouter(Navbar);