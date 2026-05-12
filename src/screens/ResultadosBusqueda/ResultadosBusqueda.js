import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

function ResultadoBusqueda(props) {
    const [resultados, setResultados] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [tipo, setTipo] = useState(props.match.params.tipo);
    const [valor, setValor] = useState(props.match.params.valor);
    const [mostrarFavoritos, setMostrarFavoritos] = useState(false);

    useEffect(() => {
        const apiKey = "6aad86ecf8fd94ac9b44f0afc185ea99";
        fetch(`https://api.themoviedb.org/3/search/${tipo}?api_key=${apiKey}&query=${valor}`)
            .then(res => res.json())
            .then(data => {
                setResultados(data.results || []);
                setCargando(false);
             })
            .catch(err => {
                console.log(err);
                setCargando(false);
            });
    },[]);

    return (
        <>
            {cargando ? (
                <h1>Cargando resultados...</h1>
            ) : (
                <section>
                    {resultados.length > 0 ? (
                        resultados.map((item) => (
                            <article key={item.id} className="detalle">
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

export default withRouter(ResultadoBusqueda);