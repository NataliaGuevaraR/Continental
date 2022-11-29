import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';

export class ModalReiniciar extends Component {
    static displayName = ModalReiniciar.name;
    constructor(props) {
        super(props);
        this.state = {
            modal: true,
        };
        this.toggle = this.toggle.bind(this);
    }

    render() {
        return (
            <Modal isOpen={this.state.modal}>
                <ModalBody>
                    <div class="container-md text-center">
                        <div class="row">
                            <h2 class="secondary"> ¿Seguro de querer terminar la partida? </h2>
                            <p><br /><br /></p>
                        </div>
                        <div class="row">
                            <div class="col">
                                <button class="btn btn-dark" onClick={this.handleButton.bind(this)}>Sí, seguro</button>
                            </div>
                            <div class="col">
                                <button class="btn btn-dark" onClick={this.toggle}>No, volver</button>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        );
    }

    handleButton() {
        this.limpiarNombre();
        this.toggle();
        this.props.modalToMesa(false, true);
    }

    reiniciar() {
        fetch('carta/Reiniciar', {
            method: 'POST',
            mode: 'cors',
            body: ''
        })
    }

    limpiarNombre() {
        fetch('jugador/LimpiarNombre', {
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