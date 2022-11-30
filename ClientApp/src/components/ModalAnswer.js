import React, { Component } from 'react';
import { Button, Modal, ModalBody, Container, Row, ModalHeader} from 'reactstrap';

export class ModalAnswer extends Component {
    static displayName = ModalAnswer.name;
    constructor(props) {
        super(props);
        this.state = {
            modal: true,
            response: this.props.response
        };
        this.toggle = this.toggle.bind(this);
    }

    render() {
        console.log(this.state.content);
        return (
            <Modal isOpen={this.state.modal}>
                <ModalHeader className="text-center">
                    <h1 className="text-dark">
                        Respuesta
                    </h1>
                </ModalHeader>
                <ModalBody>
                    <Container className="text-center text-black">
                        <Row>
                            <p><br /> <br /> <br /></p>
                            <h2>{this.state.response}</h2>
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
        this.props.answerToMesa(false);
    }

}