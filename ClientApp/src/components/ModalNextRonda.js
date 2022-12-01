import React, { Component } from 'react';
import { Button, Modal, ModalBody, Container, Row, ModalHeader } from 'reactstrap';

export class ModalNextRonda extends Component {
    static displayName = ModalNextRonda.name;
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
                <ModalHeader className="text-center">
                    <h1 className="text-dark">
                        Siguiente ronda
                    </h1>
                </ModalHeader>
                <ModalBody>
                    <Container className="text-center text-black">
                        <Row>
                            <p><br /> <br /> <br /></p>
                            <h2>¡Ronda perdida! <br /> <em>Más suerte para la próxima...</em></h2>
                            <p><br /> <br /><br /></p>
                        </Row>
                    </Container>
                </ModalBody>
                <div class="modal-footer text-center">
                    <Button onClick={this.toggle} className="btn-dark">Aceptar</Button>
                </div>
            </Modal>
        );
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
        this.props.nextRondaToMesa(false);
    }

}