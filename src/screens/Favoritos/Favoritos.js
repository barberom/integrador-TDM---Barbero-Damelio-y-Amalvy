import React, { Component } from 'react';
import PopularSerie from '../../components/PopularSerie/PopularSerie';
import Popular from '../../components/Popular/Popular';

class Favoritos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recuperado: [],
            loading: true,
        }
    }

    componentDidMount() {
        let storage = localStorage.getItem('favoritos');
        let array = [];

        if (storage) {
            array = JSON.parse(storage);
        }

        let resultadosTemp = [];

        if (array.length === 0) {
            this.setState({ loading: false });
        }

        array.map(({ id, tipo }) => {
            fetch(`https://api.themoviedb.org/3/${tipo}/${id}?api_key=1a700a291cf896745821e2c04ca0ecaa`)
                .then((response) => response.json())
                .then((data) => {

                    let objetoFinal = data;

                    resultadosTemp.push(objetoFinal);

                    if (resultadosTemp.length === array.length) {
                        this.setState({
                            recuperado: resultadosTemp,
                            loading: false,
                        });
                    }
                })
                .catch((error) => console.log(error));
        });
    }

    eliminarDeFavoritos = (idParaEliminar) => {
        let nuevosFavoritos = this.state.recuperado.filter(
            (objeto) => objeto.id !== idParaEliminar
        );

        this.setState({
            recuperado: nuevosFavoritos,
        });

        let storage = localStorage.getItem('favoritos');
        if (storage) {
            let arrayStorage = JSON.parse(storage);
            let nuevoStorage = arrayStorage.filter((item) => item.id !== idParaEliminar);
            localStorage.setItem('favoritos', JSON.stringify(nuevoStorage));
        }
    }

    render() {
        return (
            <>
                <h2>Favoritos</h2>

                {this.state.loading ? (
                    <p>Cargando...</p>
                ) : this.state.recuperado.length === 0 ? (
                    <p>No hay favoritos</p>
                ) : (
                    this.state.recuperado.map((objeto, idx) => {
                        
                        if (objeto.seasons) {
                            console.log("chupame el pito nahue")
                            return (
                                <PopularSerie
                                    key={objeto.id}
                                    serie={objeto}
                                    eliminarDeFavoritos={this.eliminarDeFavoritos}
                                />
                            
                            );
                        } else {
                            console.log(objeto)
                            return (
                                <Popular
                                    key={objeto.id}
                                    pelicula={objeto}
                                    eliminarDeFavoritos={this.eliminarDeFavoritos}
                                />
                            );
                        }

                    })
                )}
            </>
        )
    }
}

export default Favoritos;