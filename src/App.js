import React from "react";
import Home from "./screens/Home/Home";
import Peliculas from "./screens/Peliculas/Peliculas";
import Series from "./screens/Series/Series";
import Favoritos from "./screens/Favoritos/Favoritos";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar"
import NotFound from "./screens/NotFound/NotFound";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import DetalleP from "./screens/DetalleP/DetalleP";
import DetalleS from "./screens/DetalleS/DetalleS";
import ResultadosBusqueda from "./screens/ResultadosBusqueda/ResultadosBusqueda";


function App() {
  return (
      <>
        <Navbar/>
          <Switch>
            <Route path="/" exact={true} component={Home}/>
            <Route path="/Peliculas" component={Peliculas}/>
            <Route path="/Series" component={Series}/>
            <Route path="/detalleP/:id" component={DetalleP}/>
            <Route path="/detalleS/:id" component={DetalleS}/>
            {/* <Route path="/Favoritos" component={Favoritos}/>*/}
            <Route path="/Login" component={Login}/>
            <Route path="/Register" component={Register}/>
            <Route path="/Resultados/:tipo/:valor" component={ResultadosBusqueda}/>
            <Route path="*" component={NotFound}/>
          </Switch>
        <footer>
          <p> Amalvy | Barbero | Damelio</p>
        </footer>
      </>
  );
}
export default App;
