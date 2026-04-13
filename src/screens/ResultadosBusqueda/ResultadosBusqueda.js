import { Component } from "react";
import { withRouter } from "react-router-dom";

class Buscador extends Component{
    constructor(props){
    super(props);

}
ejecutarBusqueda(e){
    e.preventdefault();
    this.props.history.push("/Resultados/" + Buscador)
}
componentDidMount(){
    
}
render(){
    return (

    )
}

}
























export default whithRouter Buscador