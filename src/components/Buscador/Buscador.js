import { Component } from "react";
import { withRouter } from "react-router-dom";

class Formulario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valor: "",
            tipo: "movie"
        };
    }

    cambiarTipo(event) {
        this.setState({
            tipo: event.target.value
        });
    }

    controlarCambios(event) {
        this.setState({
            valor: event.target.value
        });
    }

    evitarsubmit(event) {
        event.preventDefault();
        if (this.state.valor !== "") {
            this.props.history.push(`/Resultados/${this.state.tipo}/${this.state.valor}`);
        }
    }

    render() {
        return (
            <form onSubmit={(event) => this.evitarsubmit(event)}>
                <label>Buscar:</label>
                <input 
                    type="text" 
                    onChange={(event) => this.controlarCambios(event)} 
                    value={this.state.valor} 
                />
                <select 
                    onChange={(event) => this.cambiarTipo(event)} 
                    value={this.state.tipo}
                >
                    <option value="movie">Películas</option>
                    <option value="tv">Series</option>
                </select>
                <button type="submit">Buscar</button>
            </form>
        );
    }
}

export default withRouter(Formulario);