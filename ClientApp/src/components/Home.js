import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import { ModalNombre } from './ModalNombre';


export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props); 
        this.state = {
            isModalOpen: false,
        }
    }

    render() {
        return (

            <div class="container-md text-center">
                <div>
                    <p>Aquí va la imagen principal del juego</p>
                </div>
                <div>
                    <button class="btn btn-primary"><Link to="/reglas"><h1 class="text-white">Ver reglas</h1></Link></button>
                </div>
                <div>
                    <button class="btn btn-primary" onClick={this.toggleUserModal}><h1 class="text-white">Comenzar juego nuevo</h1></button>
                    {this.state.isModalOpen ?
                        <ModalNombre
                        />
                        : null}
                </div>
            </div>
        );
    }

    toggleUserModal = () => {
        this.setState((state) => {
            return { isModalOpen: !state.isModalOpen }
        })
    }
}