import React, {useState, useEffect} from "react";
import Popular from "../Popular/Popular";
import "./SPopular.css";


function SPopular(){

    const [peliculas, setPeliculas] = useState([]);

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=1a700a291cf896745821e2c04ca0ecaa")
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setPeliculas(data.results);
        })
        .catch(error => console.log(error));
    },[])

        return(
            <>
                <section className='spopular'>
                    {peliculas == [] ? <h1>Cargando...</h1>: peliculas.map((pelicula, idx) => idx <= 3 ? <Popular key = {(pelicula + idx)} pelicula={pelicula}/>: null)}
                </section>
            </>
        )
    }

export default SPopular