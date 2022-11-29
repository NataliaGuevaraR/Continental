import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Button } from 'reactstrap';
import { ModalReglas } from './ModalReglas';

export class Reglas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            modal: true,
            request: null
        };
    }
    static displayName = Reglas.name;

    modalToReglas = (answer => {
        this.setState({
            isModalOpen: answer
        })
    })

    render() {
        return (
            <html>
                <Container className="text-center">
                    <Row className="text-center">
                    <p><img src={require('./Imagenes/reglas.png')} alt=""/></p>
                    </Row>
                <Row>
                    <Col>
                        <Button onClick={this.toggleUserModal.bind(this)} value="Objetivos" color="light" variant="primary">
                            Objetivos
                        </Button>
                        {this.state.isModalOpen ?
                            <ModalReglas modalToReglas={this.modalToReglas} content={this.state.request }
                            />
                            : null}
                    </Col>
                    <Col>
                    <Button onClick={this.toggleUserModal.bind(this)} value="Inicio" color="light" variant="primary">
                        Inicio
                    </Button>
                    {this.state.isModalOpen ?
                        <ModalReglas modalToReglas={this.modalToReglas} content={this.state.request}
                        />
                            : null}
                    </Col>
                    <br /> <br /> <br />
                </Row>
                <Row>
                <Col>
                        <Button onClick={this.toggleUserModal.bind(this)} value="Orden" color="light" variant="primary">
                            Orden y valores
                        </Button>
                        {this.state.isModalOpen ?
                            <ModalReglas modalToReglas={this.modalToReglas} content={this.state.request}
                            />
                            : null}
                    </Col>
                    <Col>
                        <Button onClick={this.toggleUserModal.bind(this)} value="Combinaciones" color="light" variant="primary">
                            Combinaciones
                        </Button>
                        {this.state.isModalOpen ?
                            <ModalReglas modalToReglas={this.modalToReglas} content={this.state.request }
                            />
                            : null}
                    </Col>
                    <br /> <br /> <br />
                </Row>
                <Row>
                        <Col>
                        <Button onClick={this.toggleUserModal.bind(this)} value="Desarrollo" color="light" variant="primary">
                            Desarrollo
                                </Button>
                        {this.state.isModalOpen ?
                            <ModalReglas modalToReglas={this.modalToReglas} content={this.state.request}
                            />
                            : null}  
                    </Col>
                    <Col>
                    <Button onClick={this.toggleUserModal.bind(this)} value="Final" color="light" variant="primary">
                        Final
                    </Button>
                    {this.state.isModalOpen ?
                        <ModalReglas modalToReglas={this.modalToReglas} content={this.state.request}
                        />
                            : null}    
                    </Col>
                    <br /> <br /> <br /> <br /> <br />
                </Row>
                <Row>
                    <br /><br />
                    <p>
                    <Button onClick={this.toggle} color="light" size="sm">
                        <Link to="/"><h2 class="text-black">Volver al inicio</h2></Link>
                        </Button>
                    </p>
                    <br /> <br /> <br />
                </Row>
                </Container>
            </html>
        );
    }

    toggleUserModal = (event) => {
        console.log(event.target);
        this.setState({ request: event.target.value})
        this.setState((state) => {
            return { isModalOpen: !state.isModalOpen }
        })

    }
}
