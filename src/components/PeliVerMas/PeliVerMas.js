import React, {Component} from "react";
import Popular from "../Popular/Popular";


class PeliVerMas extends Component{
    constructor(){
        super()
        this.state = {
            peliculas: [],
            siguientePag: 1
        }
    }

    componentDidMount(){
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=1a700a291cf896745821e2c04ca0ecaa")
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            this.setState({
                peliculas: data.results,
                siguientePag: data.page + 1
            })
        })
        .then(console.log(this.state.siguientePag))
        .catch(error => console.log(error));
    }

    cargarMas(){
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=1a700a291cf896745821e2c04ca0ecaa&page=${this.state.siguientePag}`)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data)
            this.setState({
                peliculas: this.state.peliculas.concat(data.results),
                siguientePag: data.page + 1
            })
        })
        .then(console.log(this.state.peliculas))
        .catch((error)=>console.log(error))

    }

    render(){
        return(
            <>
                <section>
                    <button onClick={()=>this.cargarMas()}>Cargar más</button>
                    {this.state.peliculas == [] ? <h1>Cargando...</h1>: this.state.peliculas.map((pelicula, idx) => <Popular key = {(pelicula + idx)} pelicula={pelicula}/>)}
                </section>
            </>
        )
    }
}


export default PeliVerMas