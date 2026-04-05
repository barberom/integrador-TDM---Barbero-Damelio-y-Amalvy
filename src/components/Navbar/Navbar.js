import { BrowserRouter, Link } from "react-router-dom";
function Navbar() {
    return(
        <nav>
            <ul className="navbar">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Peliculas">Peliculas</Link></li>
                <li><Link to="/Series">Series</Link></li>
                <li><Link to="/Favoritos">Favoritos</Link></li>
            </ul>
            <ul className="acceso">
                <li><Link to="/Login">Login</Link></li>
                <li><Link to="/Register">Register</Link></li>
            </ul>
        </nav>
    )
}


export default Navbar;