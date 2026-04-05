import React from "react";
import Home from "./screens/Home/Home";
import Peliculas from "./screens/Peliculas/Peliculas";
import Series from "./screens/Series/Series";
import Favoritos from "./screens/Favoritos/Favoritos";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import NotFound from "./screens/NotFound/NotFound";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";


function App() {
  return (
      <>
        <Navbar/>
          <Switch>
            <Route path="/" exact={true} component={Home}/>
            <Route path="/Peliculas" component={Peliculas}/>
            <Route path="/Series" component={Series}/>
            <Route path="/Favoritos" component={Favoritos}/>
            <Route path="*" component={NotFound}/>
            <Route path="/Login" component={Login}/>
            <Route path="/Register" component={Register}/>
          </Switch>
        <footer>
          <p>Copyright © Dashboard 2022</p>
        </footer>
      </>
  );
}
export default App;
