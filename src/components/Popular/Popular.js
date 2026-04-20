import React, {Component} from "react";
import { Link } from "react-router-dom";
import "./Popular.css";

class Popular extends Component{
    constructor(props){
        super(props)
        this.state = {
            descripcion: "mostrar",
            clase: "hide",
            detalle: "Ver más",
            estadoinv: 's',
            estado2: 'h',
            esFavorito: false,
        }
    }

    componentDidMount(){
        let storage = localStorage.getItem('favoritos');
        let storageParse = JSON.parse(storage);
        let filtro = [];
        if ( storageParse && storageParse.length > 0){
            filtro = storageParse.filter((e) => e.id === this.props.pelicula.id);
        }

        if (filtro.length > 0) {
            this.setState({
                estado2: 's',
                estadoinv: 'h',
                esFavorito: true,
            })
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

    agregarFav(){
        let storage = localStorage.getItem('favoritos');
        let storageParse = JSON.parse(storage);
        if (storageParse && this.state.esFavorito === false) {
            storageParse.push({"id": this.props.pelicula.id, "tipo": "movie"});
            localStorage.setItem('favoritos', JSON.stringify(storageParse));
        }
        else {
            localStorage.setItem('favoritos', JSON.stringify([{"id": this.props.pelicula.id, "tipo": "movie"}]));
        }
        this.setState({
            estado2: 's',
            estadoinv: 'h',
            esFavorito: true,
        })
        {console.log(localStorage)}
    }

    sacarFav(){
        this.setState({
            estado2: 'h',
            estadoinv: 's',
            esFavorito: false,
        })
        let storage = localStorage.getItem('favoritos');
        let storageParse = JSON.parse(storage);
        if (storageParse.length != 0) {
            let filtro = storageParse.filter((e) => e.id !== this.props.pelicula.id);
            localStorage.setItem('favoritos', JSON.stringify(filtro));
            {console.log(localStorage)}
        }

    }


    

    render(){
        return(
            <article className='popular'>
                <img src= {`https://image.tmdb.org/t/p/w342/${this.props.pelicula.poster_path}`}/>
                <h2>{this.props.pelicula.title}</h2>
                <p className={this.state.clase}>{this.props.pelicula.overview}</p>
                <div className="botones-home">
                    <button onClick={()=>this.verDescripcion()}>{this.state.detalle}</button>
                    <Link to={`/detalleP/${this.props.pelicula.id}`}>Ir a detalle</Link>
                    <button className={this.state.estadoinv} onClick={() => this.agregarFav()}>🩶</button>
                    <button className={this.state.estado2} onClick={() => this.sacarFav()}>❤️</button>
                </div>
            </article>
        )
    }
}

export default Popular