import React, {Component} from "react";
import Popular from "../Popular/Popular";
import "./SPopular.css";


class SPopular extends Component{
    constructor(){
        super()
        this.state = {
            peliculas: [],
        }
    }

    componentDidMount(){
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=1a700a291cf896745821e2c04ca0ecaa")
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            this.setState({
                peliculas: data.results,
            })

        })
        .catch(error => console.log(error));
    }


    render(){
        return(
            <>
                <section className='spopular'>
                    {this.state.peliculas == [] ? <h1>Cargando...</h1>: this.state.peliculas.map((pelicula, idx) => idx <= 3 ? <Popular key = {(pelicula + idx)} pelicula={pelicula}/>: null)}
                </section>
            </>
        )
    }
}


export default SPopular