import React, {Component} from "react";
import PopularSerie from "../PopularSerie/PopularSerie";
import "../SPopular/SPopular.css";


class SPopularSerie extends Component{
    constructor(){
        super()
        this.state = {
            series: [],
        }
    }

    componentDidMount(){
        fetch("https://api.themoviedb.org/3/tv/popular?api_key=1a700a291cf896745821e2c04ca0ecaa")
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            this.setState({
                series: data.results,
            })

        })
        .catch(error => console.log(error));
    }


    render(){
        return(
            <>
                <section className='spopular'>
                    {this.state.series == [] ? <h1>Cargando...</h1>: this.state.series.map((serie, idx) => idx <= 3 ? <PopularSerie key = {(serie + idx)} serie={serie}/>: null)}
                </section>
            </>
        )
    }
}


export default SPopularSerie;