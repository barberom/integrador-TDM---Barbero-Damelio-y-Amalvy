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
import Detalle from "./screens/Detalle/Detalle";


function App() {
  return (
      <>
        <Navbar/>
          <Switch>
            <Route path="/" exact={true} component={Home}/>
            <Route path="/Peliculas" component={Peliculas}/>
            <Route path="/Series" component={Series}/>
            <Route path="/detalle/:id" component={Detalle}/>
            <Route path="/Favoritos" component={Favoritos}/>
            <Route path="/Login" component={Login}/>
            <Route path="/Register" component={Register}/>
            <Route path="*" component={NotFound}/>
          </Switch>
        <footer>
          <p> Amalvy | Barbero | Damelio</p>
        </footer>
      </>
  );
}
export default App;
