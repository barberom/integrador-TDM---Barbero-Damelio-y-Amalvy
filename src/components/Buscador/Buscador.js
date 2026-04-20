import { Component } from "react";

class ResultadoBusqueda extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        // 1. Obtener parámetros de la URL (asumiendo que usas /Resultados/:tipo/:query)
        const { tipo, query } = this.props.match.params;
        const apiKey = "6aad86ecf8fd94ac9b44f0afc185ea99";
        
        // 2. Definir la URL de la API según el tipo
        const url = `https://api.themoviedb.org/3/search/${tipo}?api_key=${apiKey}&query=${query}`;

        fetch(url)
            .then(res => res.json())
            .then(data => this.setState({ 
                resultados: data.results, 
                cargando: false 
            }))
            .catch(err => console.log(err));

        // 3. Verificar si existe la cookie de sesión para mostrar favoritos
        // Suponiendo que tu cookie se llama "userSession"
        if (document.cookie.includes("userSession")) {
            this.setState({ esFavoritoVisible: true });
        }
    }

    render() {
        return (
            <section>
                <h2>Resultados de búsqueda:</h2>
                {this.state.cargando ? <p>Cargando...</p> : (
                    <div className="card-container">
                        {this.state.resultados.length > 0 ? (
                            this.state.resultados.map(item => (
                                <article key={item.id} className="card">
                                    <img src={`https://image.tmdb.org/t/p/w200${item.poster_path}`} alt={item.title || item.name} />
                                    <h3>{item.title || item.name}</h3>
                                    
                                    {/* Lógica de la consigna: Botón solo si hay cookie */}
                                    {this.state.esFavoritoVisible && (
                                        <button>Añadir a Favoritos</button>
                                    )}
                                </article>
                            ))
                        ) : <p>No se encontraron resultados.</p>}
                    </div>
                )}
            </section>
        );
    }
}

export default ResultadoBusqueda;