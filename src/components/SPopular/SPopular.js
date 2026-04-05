import React, {Component} from "react";
import Popular from "../Popular/Popular";
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYTcwMGEyOTFjZjg5Njc0NTgyMWUyYzA0Y2EwZWNhYSIsIm5iZiI6MTc3NTM5NjU5My45MzQsInN1YiI6IjY5ZDI2NmYxMWIzOTM5ZmJmMjEwOTAwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.88YY9Zcnz5fSZdGuLciVsHHOVmcu5Ae2xgjNR5HDPtI'
  }
};

class SPopular extends Component{
    constructor(){
        super()
        this.state = {
            peliculas: [],
        }
    }

    componentDidMount(){
        fetch("https://api.themoviedb.org/3/movie/popular", options)
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
                <section>
                    {this.state.peliculas == [] ? <h1>Cargando...</h1>: this.state.peliculas.map((pelicula, idx) => <Popular key = {(pelicula + idx)} pelicula={pelicula}/>)}
                </section>
            </>
        )
    }
}


export default SPopular