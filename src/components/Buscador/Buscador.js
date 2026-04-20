import { Component } from "react";
import { withRouter } from "react-router-dom";

class Formulario extends Component{
constructor (props) {
super(props)
this.state = {
valor:"",
tipo: "peliculas"}}

evitarsubmit(event) {event.preventDefault();this.props.history.push(`/Resultados/${this.state.tipo}/${this.state.valor}`);}

controlarCambios(event){this.setState ({valor: event.target.value});()=>console.log(this.state.setState)
}

render(){

return (
<form onSubmit={(event)=>this.evitarsubmit(event)}>
<label>Name:</label>
<input type= "Text" onChange={(event)=>this.controlarCambios(event)} value={this.state.valor}/>
<input type = "submit" value = "submit"/>
<select onChange={(event)=>this.cambiarTipo(event)}value={this.state.tipo}>
<option value="peliculas">Películas</option>
<option value="series">Series</option>
</select>
</form>
)
}
}

export default withRouter(Formulario);