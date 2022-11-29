import React, { Component } from 'react';
import { Link, useNavigate, Routes, Route } from 'react-router-dom';
import { ModalNombre } from './ModalNombre';
import { GetMesa } from './Mesa';
import { Reglas } from './Reglas';
import { Container, Col, Row, Button } from 'reactstrap';

export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props); 
        this.state = {
            isModalOpen: false,
            playerId: props.playerId,
        }
    }
    modalToHome = (answer, playerNumber) => {
        this.setState({
            isModalOpen: answer,
            playerId: playerNumber,
        }, () => {
            this.reiniciar();
            if (this.state.playerId == 2) {
                this.repartir();
            }
            this.props.navigate("/mesa", {
                state: {
                    idJugador: this.state.playerId,
                }
            });
    })
}
    
    render() {
        return (
            <div class="container-md text-center">
                <div>
                    <p><img src={require('./Imagenes/main.png')} alt=""/></p>
                </div>
                <Row>
                    <p><br /><br /><br />
                    </p>
                </Row>
                <Row>
                    <Col>
                        <button class="btn btn-light">
                            <Link to="/reglas"><h1 class="text-black">Ver reglas</h1></Link>
                        </button>
                    </Col>
                    <Col>
                        <button class="btn btn-light" onClick={this.toggleUserModal}><h1 class="text-black">Comenzar juego nuevo</h1></button>
                        {this.state.isModalOpen ?
                            <ModalNombre modalToHome={this.modalToHome}
                            />
                            : null}
                    </Col>
                </Row>
                
                <Routes>
                    <Route path="/mesa" element={<GetMesa idJugador={this.state.playerId} />} />
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
            body: ''
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