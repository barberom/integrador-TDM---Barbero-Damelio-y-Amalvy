import React, {Component} from "react";

class Popular extends Component{
    constructor(props){
        super(props)
        this.state = {
            descripcion: "mostrar",
            clase: "hide"
        }
    }

    verDescripcion(){
        if(this.state.descripcion == "mostrar"){
            this.setState({
                descripcion: "no mostrar",
                clase: "show"
            })
        }
        else{
            this.setState({
                descripcion: "mostrar",
                clase: "hide"
            })
        }
    }

    render(){
        return(
            <article>
            <img src= {this.props.pelicula.poster_path}/> {/*Revisar el tema de la ruta porque no entiendo donde tengo que poner ese pedazo de ruta que me da la api */}
            <h2>{this.props.pelicula.title}</h2>
            <p className={this.state.clase}>{this.props.pelicula.overview}</p>
            <button onClick={()=>this.verDescripcion()}>Ver descripción</button>
            <Link to={`/detalle/${this.props.pelicula.id}`}>Ir a detalle</Link>
            <button>Favoritos</button>

            </article>
        )
    }
}

export default Popular