import React, {useEffect, useState} from "react";
import Popular from "../Popular/Popular";
import "./PeliVerMas.css";


function PeliVerMas(){

    const [peliculas, setPeliculas] = useState([]);
    const [siguientePag, setSiguientePag] = useState(1);

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=1a700a291cf896745821e2c04ca0ecaa")
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setPeliculas(data.results);
            setSiguientePag(data.page + 1);
        })
        .then(console.log(siguientePag))
        .catch(error => console.log(error));
    },[])

    function cargarMas(){
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=1a700a291cf896745821e2c04ca0ecaa&page=${siguientePag}`)
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data)
            setPeliculas(peliculas.concat(data.results));
            setSiguientePag(data.page + 1);
        })
        .then(console.log(peliculas))
        .catch((error)=>console.log(error))

    }

        return(
            <>
                <button className="cargarMas" onClick={()=>cargarMas()}>Cargar más</button>
                <section className="speliculas">
                    {peliculas == [] ? <h1>Cargando...</h1>: peliculas.map((pelicula, idx) => <Popular key = {(pelicula + idx)} pelicula={pelicula}/>)}
                </section>
            </>
        )
    }


export default PeliVerMas