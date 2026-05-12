import React, { useState, useEffect } from "react";
import PopularSerie from "../PopularSerie/PopularSerie";
import "../SPopular/SPopular.css";


function SPopularSerie() {
    const [series, setSeries] = useState([]);


    useEffect(() => {
        fetch("https://api.themoviedb.org/3/tv/popular?api_key=1a700a291cf896745821e2c04ca0ecaa")
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setSeries(data.results);
        })
        .catch(error => console.log(error));
    }, [])


        return(
            <>
                <section className='spopular'>
                    {series == [] ? <h1>Cargando...</h1>: series.map((serie, idx) => idx <= 3 ? <PopularSerie key = {(serie + idx)} serie={serie}/>: null)}
                </section>
            </>
        )
    }

export default SPopularSerie;