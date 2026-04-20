import React, {Component} from "react";

class DetalleP extends Component{

    constructor(props){
        super(props)
        this.state = {
           id: props.match.params.id,
           pelicula: [], 
           generos: []
        }
    }

    componentDidMount(){
        const { tipo, query } = this.props.match.params;
        const apiKey = "6aad86ecf8fd94ac9b44f0afc185ea99";
        
        fetch(`https://api.themoviedb.org/3/search/${tipo}?api_key=${apiKey}&query=${query}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ 
                    resultados: data.results, 
                    cargando: false 
                });
            })
            .catch(err => console.log(err));

        }
    }

    render(){
    return(
        <>
        {this.state.pelicula == [] ? <h1>Cargando...</h1>:<article>
            <img src= {`https://image.tmdb.org/t/p/w342/${this.state.pelicula.poster_path}`}/>
            <h2>{this.state.pelicula.original_title}</h2>
            <p>Rating: {this.state.pelicula.vote_average}</p>
            <p>Fecha de estreno: {this.state.pelicula.release_date}</p>
            <p>Duración: {this.state.pelicula.runtime}</p>
            <p>Sinópsis: {this.state.pelicula.overview}</p>
            <p>Géneros:</p>
            <ul>
                {this.state.generos.map((genero)=> <li>{genero.name}</li>)}  
            </ul> 
            <button>Favoritos</button>

            </article>}
      </>  
    )
    }
}
export default DetalleP