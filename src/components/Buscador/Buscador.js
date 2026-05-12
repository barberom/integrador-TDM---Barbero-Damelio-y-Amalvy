import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

function Formulario(props){

    const [valor, setValor] = useState("");
    const [tipo, setTipo] = useState("movie");

    function cambiarTipo(event) {
        setTipo(event.target.value);
    }

    function controlarCambios(event) {
        setValor(event.target.value);
    }

    function evitarsubmit(event) {
        event.preventDefault();
        if (valor !== "") {
            props.history.push(`/Resultados/${tipo}/${valor}`);
        }
    }

    return (
        <form onSubmit={(event) => evitarsubmit(event)}>
            <label>Buscar:</label>
            <input 
                type="text" 
                onChange={(event) => controlarCambios(event)} 
                value={valor} 
            />
            <select 
                onChange={(event) => cambiarTipo(event)} 
                value={tipo}
            >
                <option value="movie">Películas</option>
                <option value="tv">Series</option>
            </select>
            <button type="submit">Buscar</button>
        </form>
    );
}

export default withRouter(Formulario);