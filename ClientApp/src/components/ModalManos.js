import React, { Component } from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';

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
                <ModalBody>
                    <div class="container-md">
                        <div class="row">
                            <h2 class="combinaciones">Combinaciones fijas</h2>
                        </div>
                        <div class="row">
                            <p>Se juegan 7 rondas, de menor a mayor dificultad, repartiéndose en cada una de ellas la cantidad justa para realizar las combinaciones de esa mano:</p>
                        </div>
                        <div class="row">
                            <ul class="list-group">
                                <li class="list-group-item"><strong>(TT) Primera ronda: </strong> se reparten seis cartas y deben realizarse dos tríos.</li>
                                <li class="list-group-item"><strong>(TE) Segunda ronda: </strong> siete cartas; un trío y una escalera.</li>
                                <li class="list-group-item"><strong>(EE) Tercera ronda: </strong> ocho cartas; dos escaleras.</li>
                                <li class="list-group-item"><strong>(TTT) Cuarta ronda: </strong> nueve cartas; tres tríos.</li>
                                <li class="list-group-item"><strong>(TTE) Quinta ronda: </strong> diez cartas; dos tríos y una escalera.</li>
                                <li class="list-group-item"><strong>(TEE) Sexta ronda: </strong> once cartas; un trío y dos escaleras.</li>
                                <li class="list-group-item"><strong>(EEE) Séptima ronda: </strong> doce cartas; tres escaleras.</li>
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