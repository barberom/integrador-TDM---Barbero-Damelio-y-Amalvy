import { Component } from "react";
import { withRouter } from "react-router-dom";
import Popular from "../../components/Popular/Popular";
import PopularSerie from "../../components/PopularSerie/PopularSerie";

class ResultadoBusqueda extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tipo: this.props.match.params.tipo,
            valor: this.props.match.params.valor,
            resultados: [], 
            cargando: true,
            mostrarFavoritos: false
        };
    }

    componentDidMount() {

        const apiKey = "6aad86ecf8fd94ac9b44f0afc185ea99";
        fetch(`https://api.themoviedb.org/3/search/${this.state.tipo}?api_key=${apiKey}&query=${this.state.valor}`)
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
                {this.state.cargando ? <h1>Cargando resultados...</h1> :
                <section className="speliculas">
                    {
                        this.state.resultados.length > 0 ? (
                        this.state.resultados.map((item) =>
                            this.state.tipo === "movie" ? (
                            <Popular key={item.id} pelicula={item} />
                            ) : (
                            <PopularSerie key={item.id} serie={item} />
                            )
                        )
                        ) : (
                        <h2>No se encontraron resultados para tu búsqueda</h2>
                        )
                    }
                </section>
                }
            </>
        );
    }
}
export default withRouter(ResultadoBusqueda);