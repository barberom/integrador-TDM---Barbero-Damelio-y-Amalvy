import React, { Component } from 'react';
import PopularSerie from '../../components/PopularSerie/PopularSerie';
import Popular from '../../components/Popular/Popular';

class Favoritos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            personajesRecuperados: [],
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
        array.map(id => {
            fetch(`https://rickandmortyapi.com/api/character/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    resultadosTemp = resultadosTemp.concat(data);
                    this.setState({
                        personajesRecuperados: resultadosTemp,
                    })
                })
                .catch((error) => console.log(error));

                this.setState({ loading: false });
        })
    
        
            
        

    }


    render() {
        return (
            <>
                <h2>Favoritos</h2>

                {this.state.loading ?
                    <p>Cargando...</p> :
                    this.state.personajesRecuperados.map((objeto,idx) => <CardRM 
                        key={objeto.name + idx}
                        id={objeto.id}
                        imagen={objeto.image} 
                        nombre={objeto.name} 
                        estado={objeto.status}
                        especie={objeto.species}
                        /*ver mas*/
                        origen={objeto.origin.name}
                        /*borrar*/
                        borrarPersonaje={() => this.borrarPersonaje(objeto.id)}
                    />)
                }  
            </>
        )
    }

}
export default Favoritos;