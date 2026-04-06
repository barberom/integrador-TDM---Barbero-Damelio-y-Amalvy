import React, {Component} from "react";
import { Link } from "react-router-dom";
import "./Popular.css";

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
            <article className='popular'>
                <img src= {`https://image.tmdb.org/t/p/w342/${this.props.pelicula.poster_path}`}/>
                <h2>{this.props.pelicula.title}</h2>
                <p className={this.state.clase}>{this.props.pelicula.overview}</p>
                <button onClick={()=>this.verDescripcion()}>Ver descripción</button>
                <Link to={`/detalleP/${this.props.pelicula.id}`}>Ir a detalle</Link>
                <button>❤️</button>
            </article>
        )
    }
}

export default Popular