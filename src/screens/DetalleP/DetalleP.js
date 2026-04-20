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
        fetch(`https://api.themoviedb.org/3/movie/${this.state.id}?api_key=1a700a291cf896745821e2c04ca0ecaa`)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data)
            this.setState({
                pelicula: data,
                generos: data.genres
            })

        })
        .catch((error) =>{
            console.log(error)
            
        }) 
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