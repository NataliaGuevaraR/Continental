import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';

export class ModalManos extends Component {
    static displayName = ModalManos.name;
    constructor(props) {
        super(props);
        this.state = {
            modal: true
        };
        this.toggle = this.toggle.bind(this);
    }

    render() {
        return (
            <Modal isOpen={this.state.modal}>
                <ModalHeader>
                    <div class="row">
                        <h2 class="combinaciones">Combinaciones fijas</h2>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div class="container-md">
                        <div class="row">
                            <p>Se juegan 7 rondas, de menor a mayor dificultad, repartiéndose en cada una de ellas la cantidad justa para realizar las combinaciones de esa mano:</p>
                        </div>
                        <div class="row">
                            <ul class="list-group">
                                <li class="list-group-item"><strong>Primera ronda: </strong>Dos tríos. (TT) </li>
                                <li class="list-group-item"><strong>Segunda ronda: </strong> Un trío y una escalera. (TE) </li>
                                <li class="list-group-item"><strong>Tercera ronda: </strong> Dos escaleras. (EE) </li>
                                <li class="list-group-item"><strong>Cuarta ronda: </strong> Tres tríos. (TTT) </li>
                                <li class="list-group-item"><strong>Quinta ronda: </strong> Dos tríos y una escalera. (TTE) </li>
                                <li class="list-group-item"><strong>Sexta ronda: </strong> Un trío y dos escaleras. (TEE)</li>
                                <li class="list-group-item"><strong>Séptima ronda: </strong> Tres escaleras. (EEE)</li>
                            </ul>
                        </div>
                    </div>
                </ModalBody>
                <div class="modal-footer">
                    <Button onClick={this.toggle} className="btn-dark">Volver</Button>
                </div>
            </Modal>
        );
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
}