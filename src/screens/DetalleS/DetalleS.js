import React, {Component} from "react";

class DetalleS extends Component{

    constructor(props){
        super(props)
        this.state = {
           id: props.match.params.id,
           serie: [], 
           generos: [],
           estadoinv: 's',
           estado2: 'h',
           esFavorito: false,
        }
    }

    componentDidMount(){
        fetch(`https://api.themoviedb.org/3/tv/${this.state.id}?api_key=1a700a291cf896745821e2c04ca0ecaa`)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data)
            this.setState({
                serie: data,
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
            storageParse.push({"id": this.state.serie.id, "tipo": "tv"});
            localStorage.setItem('favoritos', JSON.stringify(storageParse));
        }
        else {
            localStorage.setItem('favoritos', JSON.stringify([{"id": this.state.serie.id, "tipo": "tv"}]));
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
            let filtro = storageParse.filter((e) => e.id !== this.state.serie.id);
            localStorage.setItem('favoritos', JSON.stringify(filtro));
            {console.log(localStorage)}
        }

        if (this.props.eliminarDeFavoritos) {
            this.props.eliminarDeFavoritos(this.state.serie.id);
        }

    }


    render(){
    return(
        <>
        {this.state.serie == [] ? <h1>Cargando...</h1>:<article>
            <img src= {`https://image.tmdb.org/t/p/w342/${this.state.serie.poster_path}`}/>
            <h2>{this.state.serie.original_name}</h2>
            <p>Rating: {this.state.serie.vote_average}</p>
            <p>Fecha de estreno: {this.state.serie.release_date}</p>
            <p>Sinópsis: {this.state.serie.overview}</p>
            <p>Géneros:</p>
            <ul>
                {this.state.generos.map((genero)=> <li>{genero.name}</li>)}  
            </ul> 
            <button className={this.state.estadoinv} onClick={() => this.agregarFav()}>🩶</button>
            <button className={this.state.estado2} onClick={() => this.sacarFav()}>❤️</button>

            </article>}
      </>  
    )
    }
}
export default DetalleS