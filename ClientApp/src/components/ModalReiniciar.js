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
                            <h2 class="secondary"> ¿Seguro de querer iniciar otra partida? </h2>
                        </div>
                        <div class="row">
                            <div class="col">
                                <button className="btn btn-primary" onClick={this.handleButton.bind(this)}>Sí, seguro</button>
                            </div>
                            <div class="col">
                                <button className="btn btn-primary" onClick={this.toggle}>No, volver</button>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        );
    }

    handleButton() {
        this.reiniciar();
        //this.limpiarNombre();
        this.toggle();
        this.props.modalToHome(false);
    }

    reiniciar() {
        fetch('carta/Reiniciar', {
            method: 'POST',
            mode: 'cors',
            body: ''
        })
    }

    limpiarNombre() {
        fetch('carta/LimpiarNombre', {
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