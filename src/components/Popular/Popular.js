import React from "react";
import { Link } from "react-router-dom";
import "./Popular.css";
import Cookies from "universal-cookie";
import { useState, useEffect } from "react";
const cookies = new Cookies()
function Popular(props){

    const [descripcion, setDescripcion] = useState("mostrar")
    const [clase, setClase] = useState("hide")
    const [detalle, setDetalle] = useState("Ver más")
    const [estadoinv, setEstadoInv] = useState('h')
    const [estado2, setEstado2] = useState('h')
    const [esFavorito, setEsFavorito] = useState(false)

    useEffect(() => {
        let storage = localStorage.getItem('favoritos');
        let storageParse = JSON.parse(storage);
        let filtro = [];
        if ( storageParse && storageParse.length > 0){
            filtro = storageParse.filter((e) => e.id === props.pelicula.id);
        }

        if (filtro.length > 0) {
            setEstado2('s')
            setEstadoInv('h')
            setEsFavorito(true)
        }
        cookies.get('auth-usuario') ? setEstadoInv('s') : null
        props.fav === 'si'?  setEstadoInv('h'): null
    },[])

    function verDescripcion(){
        if(descripcion == "mostrar"){

            setDescripcion("no mostrar")
            setClase("show")
            setDetalle("Ver menos")

        }
        else{
            setDescripcion("mostrar")
            setClase("hide")
            setDetalle("Ver más")
        }
    }

    function agregarFav(){
        let storage = localStorage.getItem('favoritos');
        let storageParse = JSON.parse(storage);
        if (storageParse && esFavorito === false) {
            storageParse.push({"id": props.pelicula.id, "tipo": "movie"});
            localStorage.setItem('favoritos', JSON.stringify(storageParse));
        }
        else {
            localStorage.setItem('favoritos', JSON.stringify([{"id": props.pelicula.id, "tipo": "movie"}]));
        }
        
        setEstado2('s')
        setEstadoInv('h')
        setEsFavorito(true)

        {console.log(localStorage)}
    }

    function sacarFav(){

        setEstado2('h')
        setEstadoInv('s')
        setEsFavorito(false)

        let storage = localStorage.getItem('favoritos');
        let storageParse = JSON.parse(storage);
        if (storageParse && storageParse.length != 0) {
            let filtro = storageParse.filter((e) => e.id !== props.pelicula.id);
            localStorage.setItem('favoritos', JSON.stringify(filtro));
            {console.log(localStorage)}
        }

        if (props.eliminarDeFavoritos) {
            props.eliminarDeFavoritos(props.pelicula.id);
        }

    }


    
        return(
            <article className='popular'>
                <img src= {`https://image.tmdb.org/t/p/w342/${props.pelicula.poster_path}`}/>
                <h2>{props.pelicula.title}</h2>
                <p className={clase}>{props.pelicula.overview}</p>
                <div className="botones-home">
                    <button onClick={()=>verDescripcion()}>{detalle}</button>
                    <Link to={`/detalleP/${props.pelicula.id}`}>Ir a detalle</Link>
                    <button className={estadoinv} onClick={() => agregarFav()}>🩶</button>
                    <button className={estado2} onClick={() => sacarFav()}>❤️</button>
                </div>
            </article>
        )
    }


export default Popular