import React, {Component} from "react";

class Detalle extends Component{

    constructor(props){
        super(props)
        this.state = {
           id: props.match.params.id,
           pelicula: [], 
        }
    }

    componentDidMount(){
        fetch({/* no se cual es la parte del link que tengo que parametrizar */} + this.state.id)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data)
            this.setState({
                pelicula: data
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
            <img src= {this.props.pelicula.poster_path}/> {/*Revisar el tema de la ruta porque no entiendo donde tengo que poner ese pedazo de ruta que me da la api */}
            <h2>{this.props.pelicula.title}</h2>
            <p>{this.props.pelicula.overview}</p>
            {/* Eventuamente se puede agregar mas propiedades, como la fecha de lanzamiento, genero, etc */}
            <button>Favoritos</button>

            </article>}
      </>  
    )
    }
}
export default Detalle