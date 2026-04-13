import React from "react";
import SPopular from "../../components/SPopular/SPopular";
import SPopularSerie from "../../components/SPopularSeries/SPopularSeries";
import Formulario from "../../components/Buscador/Buscador";

function Home(){
    return(
        <>
        <Formulario/>
        <h1>Películas Populares</h1>
        <SPopular/>
        <h1>Series Populares</h1>
        <SPopularSerie/>
        </>
    )
}

export default Home