import React, {Component} from "react";

class DetalleP extends Component{

    constructor(props){
        super(props)
        this.state = {
           id: props.match.params.id,
           pelicula: [], 
           generos: [],
           estadoinv: 's',
           estado2: 'h',
           esFavorito: false,
        }
    }

    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/movie/${this.state.id}?api_key=1a700a291cf896745821e2c04ca0ecaa`)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data)
            this.setState({
                pelicula: data,
                generos: data.genres
            })
            let storage = localStorage.getItem('favoritos');
            let storageParse = JSON.parse(storage);
            let filtro = [];

            if (storageParse && storageParse.length > 0){
                filtro = storageParse.filter((e) => e.id === data.id);
            }

            if (filtro.length > 0) {
                this.setState({
                    estado2: 's',
                    estadoinv: 'h',
                    esFavorito: true,
                })
            }

        })
        .catch((error) =>{
            console.log(error)
            
        }) 
        
    }

    agregarFav(){
        let storage = localStorage.getItem('favoritos');
        let storageParse = JSON.parse(storage);
        if (storageParse && this.state.esFavorito === false) {
            storageParse.push({"id": this.state.pelicula.id, "tipo": "movie"});
            localStorage.setItem('favoritos', JSON.stringify(storageParse));
        }
        else {
            localStorage.setItem('favoritos', JSON.stringify([{"id": this.state.pelicula.id, "tipo": "movie"}]));
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
        if (storageParse && storageParse.length != 0) {
            let filtro = storageParse.filter((e) => e.id !== this.state.pelicula.id);
            localStorage.setItem('favoritos', JSON.stringify(filtro));
            {console.log(localStorage)}
        }

        if (this.props.eliminarDeFavoritos) {
            this.props.eliminarDeFavoritos(this.state.pelicula.id);
        }

    }

    
    

    render(){
    return(
        <>
        {this.state.pelicula.id === undefined ? <h1>Cargando...</h1>:<article className="detalle">
            <img src= {`https://image.tmdb.org/t/p/w342/${this.state.pelicula.poster_path}`}/>
            <h2>{this.state.pelicula.original_title}</h2>
            <p>Rating: {this.state.pelicula.vote_average}</p>
            <p>Fecha de estreno: {this.state.pelicula.release_date}</p>
            <p>Duración: {this.state.pelicula.runtime}</p>
            <p>Sinópsis: {this.state.pelicula.overview}</p>
            <p>Géneros:</p>
            <ul>
                {this.state.generos.map((genero)=> <li key={genero.id}>{genero.name}</li>)}  
            </ul> 
            <button className={this.state.estadoinv} onClick={() => this.agregarFav()}>🩶</button>
            <button className={this.state.estado2} onClick={() => this.sacarFav()}>❤️</button>

            </article>}
      </>  
    )
    }
}

export default DetalleP