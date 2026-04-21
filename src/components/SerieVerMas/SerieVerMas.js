import React, {Component} from "react";
import PopularSerie from "../PopularSerie/PopularSerie";


class SerieVerMas extends Component{
    constructor(){
        super()
        this.state = {
            series: [],
            siguientePag: 1
        }
    }

    componentDidMount(){
        fetch("https://api.themoviedb.org/3/tv/popular?api_key=1a700a291cf896745821e2c04ca0ecaa")
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            this.setState({
                series: data.results,
                siguientePag: data.page + 1
            })
        })
        .then(console.log(this.state.siguientePag))
        .catch(error => console.log(error));
    }

    cargarMas(){
        fetch(`https://api.themoviedb.org/3/tv/popular?api_key=1a700a291cf896745821e2c04ca0ecaa&page=${this.state.siguientePag}`)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data)
            this.setState({
                series: this.state.series.concat(data.results),
                siguientePag: data.page + 1
            })
        })
        .then(console.log(this.state.series))
        .catch((error)=>console.log(error))

    }

    render(){
        return(
            <>
                <section className="peliculas">
                    <button onClick={()=>this.cargarMas()}>Cargar más</button>
                    {this.state.series == [] ? <h1>Cargando...</h1>: this.state.series.map((serie, idx) => <PopularSerie key = {(serie + idx)} serie={serie}/>)}
                </section>
            </>
        )
    }
}


export default SerieVerMas;