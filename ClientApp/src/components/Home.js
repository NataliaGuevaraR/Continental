import React, { Component } from 'react';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';
import { ModalNombre } from './ModalNombre';
import { Mesa } from './Mesa';
import { Reglas } from './Reglas';

export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props); 
        this.state = {
            isModalOpen: false,
        }
    }
        modalToHome = (answer) => {
        this.setState({
            isModalOpen: answer
        })
            this.reiniciar();
            this.repartir();

        this.props.navigate("/mesa");
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
                        <ModalNombre modalToHome={this.modalToHome }
                        />
                        : null}
                </div>
                <Routes>
                    <Route path="/mesa" element={<Mesa />} />
                    <Route path="/reglas" element={<Reglas />} />
                </Routes>
            </div>
        );
    }

    reiniciar() {
        fetch('carta/Reiniciar', {
            method: 'POST',
            mode: 'cors',
            body: ''
        })
    }

    repartir() {
        fetch('carta/Repartir', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(2)
        })
    }

    toggleUserModal = () => {
        this.setState((state) => {
            return { isModalOpen: !state.isModalOpen }
        })
    }
}
export function Redireccionar(props) {
    const navigate = useNavigate();
    return (<Home navigate={navigate} />);  
}