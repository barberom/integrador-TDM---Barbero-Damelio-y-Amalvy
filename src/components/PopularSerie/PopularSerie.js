import React, {Component} from "react";
import { Link } from "react-router-dom";
import "../Popular/Popular.css";

class PopularSerie extends Component{
    constructor(props){
        super(props)
        this.state = {
            descripcion: "mostrar",
            clase: "hide",
            detalle: "Ver más",
        }
    }

    verDescripcion(){
        if(this.state.descripcion == "mostrar"){
            this.setState({
                descripcion: "no mostrar",
                clase: "show",
                detalle: "Ver menos"
            })
        }
        else{
            this.setState({
                descripcion: "mostrar",
                clase: "hide",
                detalle: "Ver más"
            })
        }
    }

    render(){
        return(
            <article className='popular'>
                <img src= {`https://image.tmdb.org/t/p/w342/${this.props.serie.poster_path}`}/>
                <h2>{this.props.serie.name}</h2>
                <p className={this.state.clase}>{this.props.serie.overview}</p>
                <div className="botones-home">
                    <button onClick={()=>this.verDescripcion()}>{this.state.detalle}</button>
                    <Link to={`/detalleS/${this.props.serie.id}`}>Ir a detalle</Link>
                    <button>🩶</button>
                </div>
            </article>
        )
    }
}

export default PopularSerie;