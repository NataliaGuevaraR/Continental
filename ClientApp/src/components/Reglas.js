import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
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
                <div class="container-md text-center justify-content-center text-primary text-white">
                    <h1 class="titulo position-relative">REGLAS DEL JUEGO</h1>
                </div>
                <div class="row">
                    <div class="col text-center">
                        <Button onClick={this.toggleUserModal.bind(this)} value="Objetivos" variant="primary">
                            Objetivos
                        </Button>
                        {this.state.isModalOpen ?
                            <ModalReglas modalToReglas={this.modalToReglas} content={this.state.request }
                            />
                            : null}
                    </div>

                    <Button onClick={this.toggleUserModal.bind(this)} value="Inicio" variant="primary">
                        Inicio
                    </Button>
                    {this.state.isModalOpen ?
                        <ModalReglas modalToReglas={this.modalToReglas} content={this.state.request}
                        />
                        : null}
                </div>
                <div class="row">
                    <div class="col text-center">
                        <Button onClick={this.toggleUserModal.bind(this)} value="Orden" variant="primary">
                            Orden y valores
                        </Button>
                        {this.state.isModalOpen ?
                            <ModalReglas modalToReglas={this.modalToReglas} content={this.state.request}
                            />
                            : null}
                    </div>
                    <div class="col text-center">
                        <Button onClick={this.toggleUserModal.bind(this)} value="Combinaciones" variant="primary">
                            Combinaciones
                        </Button>
                        {this.state.isModalOpen ?
                            <ModalReglas modalToReglas={this.modalToReglas} content={this.state.request }
                            />
                            : null}
                    </div>
                </div>
                <div class="row">
                    <div class="col text-center">
                        <Button onClick={this.toggleUserModal.bind(this)} value="Desarrollo" variant="primary">
                            Desarrollo
                        </Button>
                        {this.state.isModalOpen ?
                            <ModalReglas modalToReglas={this.modalToReglas} content={this.state.request}
                            />
                            : null}  
                    </div>
                </div>
                <div class="row">
                    <Button onClick={this.toggleUserModal.bind(this)} value="Final" variant="primary">
                        Final
                    </Button>
                    {this.state.isModalOpen ?
                        <ModalReglas modalToReglas={this.modalToReglas} content={this.state.request}
                        />
                        : null}     
                </div>
                <div class="row">
                    <p> </p>
                </div>
                <div class="row">
                <br /><br />
                <Button onClick={this.toggle} variant="primary">
                    <Link to="/"><h1 class="text-white">Volver al inicio</h1></Link>
                    </Button>
                </div>
</html>
        );
    }

    toggleUserModal = (event) => {
        this.setState({ request: event.target.value})
        this.setState((state) => {
            return { isModalOpen: !state.isModalOpen }
        })

    }
}
