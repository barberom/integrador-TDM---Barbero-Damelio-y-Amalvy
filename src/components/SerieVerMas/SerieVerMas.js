import React, {useState, useEffect} from "react";
import PopularSerie from "../PopularSerie/PopularSerie";


function SerieVerMas(){
    
    const [series, setSeries] = useState([]);
    const [siguientePag, setSiguientePag] = useState(1);

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/tv/popular?api_key=1a700a291cf896745821e2c04ca0ecaa")
        .then((response) => response.json())
        .then((data) => {
            setSeries(data.results);
            setSiguientePag(data.page + 1);
            console.log(data)
        })
        .then(console.log(siguientePag))
        .catch(error => console.log(error));
    },[]);

    function cargarMas(){
        fetch(`https://api.themoviedb.org/3/tv/popular?api_key=1a700a291cf896745821e2c04ca0ecaa&page=${siguientePag}`)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data)
            setSeries(series.concat(data.results));
            setSiguientePag(data.page + 1);
        })
        .then(console.log(series))
        .catch((error)=>console.log(error))

    }

        return(
            <>
                <button className="cargarMas" onClick={()=>cargarMas()}>Cargar más</button>
                <section className="speliculas">
                    {series == [] ? <h1>Cargando...</h1>: series.map((serie, idx) => <PopularSerie key = {(serie + idx)} serie={serie}/>)}
                </section>
            </>
        )
    }

export default SerieVerMas;