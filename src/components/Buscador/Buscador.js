import { Component } from "react";

class Formulario extends Component{

constructor (props) {
    super(props)
    this.state = {valor:""}
}


evitarsubmit(event) {
    event.preventDefault();
    this.props.history.push("/Resultados/" + valor)

}
controlarCambios(event){
    this.setState ({valor: event.target.value});
    ()=>console.log(this.state.setState)
}
render(){
    return (
        <form onSubmit={(event)=>this.evitarsubmit(event)}>
            <label>Name:</label>
            <input type= "Text" onChange={(event)=>this.controlarCambios(event)} value={this.state.valor}/>
            <input type = "submit" value = "submit"/>
        </form>
    )
}
}

export default Formulario