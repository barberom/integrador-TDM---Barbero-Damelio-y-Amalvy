import { Component } from "react";
import { withRouter } from "react-router-dom";

class ResultadoBusqueda extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultados: [], 
            cargando: true,
            mostrarFavoritos: false
        };
    }

    componentDidMount() {
        const { tipo, query } = this.props.match.params;
        const apiKey = "6aad86ecf8fd94ac9b44f0afc185ea99";
        fetch(`https://api.themoviedb.org/3/search/${tipo}?api_key=${apiKey}&query=${query}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ 
                    resultados: data.results || [],
                    cargando: false 
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({ cargando: false });
            });
    }

    render() {
        return (
            <>
                {this.state.cargando ? (
                    <h1>Cargando resultados...</h1>
                ) : (
                    <section>
                        {this.state.resultados.length > 0 ? (
                            this.state.resultados.map((item) => (
                                <article key={item.id}>
                                    <img 
                                        src={`https://image.tmdb.org/t/p/w342/${item.poster_path}`} 
                                        alt={item.title || item.name} />
                                    <h2>{item.title || item.name}</h2>
                                    <p>Rating: {item.vote_average}</p>
                                    <p>Sinópsis: {item.overview}</p>
                                </article>
                            ))
                        ) : (
                            <h2>No se encontraron resultados para tu búsqueda</h2>
                        )}
                    </section>
                )}
            </>
        );
    }
}
export default withRouter(ResultadoBusqueda);