import React, { Component } from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { Mesa } from './Mesa';

export class ModalNombre extends Component {
    static displayName = ModalNombre.name;
    constructor(props) {
        super(props);
        this.state = {
            modal: true,
            jugador: {
                name: props.name,
            }
        };
        this.toggle = this.toggle.bind(this);
    }

    render() {
        return (
            <Modal isOpen={this.state.modal}>
                <ModalBody>
                    <div class="container-md text-center">
                        <div class="row">
                            <h1>Nombre para el juego</h1>
                        </div>
                        <div class="row">
                            <input class="form-control" id="nickname" type="text" placeholder="Nickname" aria-label="nickname" value={this.state.jugador.name} onChange={this.handleName.bind(this)} />
                        </div>
                        <div class="row">
                            <button type="submit"className="btn btn-primary" onClick={this.handleButton.bind(this)}>Jugar</button>
                        </div>
                    </div>
                </ModalBody>
                <div class="modal-footer">
                    <Button onClick={this.toggle} variant="primary">Volver</Button>
                </div>
                <Routes>
                    <Route path="/mesa" element={<Mesa />} />
                </Routes>
            </Modal>
        );
    }

    handleName(event) {
        var jugador = this.state.jugador;
        var modifiedName = event.target.value;
        jugador.nombre = modifiedName;
        this.setState({
            jugador: jugador
        })
    }

    handleButton() {
        this.GuardarNombre((this.state.jugador.nombre).toString());
        this.reiniciar();
        this.props.navigate("/mesa");
    }

    GuardarNombre(value) {
        fetch('carta/GuardarNombre', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(value)
        })
    }

    reiniciar() {
        fetch('carta/Reiniciar', {
            method: 'POST',
            mode: 'cors',
            body: ''
        })
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
}
export function Redireccionar(props) {
    const navigate = useNavigate()
    return (<ModalNombre navigate={navigate} />)
}