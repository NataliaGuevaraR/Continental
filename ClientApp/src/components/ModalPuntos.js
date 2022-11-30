import React, { Component } from 'react';
import { Modal, ModalBody, Button } from 'reactstrap';

export class ModalPuntos extends Component {
    static displayName = ModalPuntos.name;
    constructor(props) {
        super(props);
        this.state = {
            modal: true,
            ronda: [],
            loading: true,
            jugador: []
        };
    }

    componentDidMount() {
        this.populateJugador();
        this.interval = setInterval(() => this.populateRonda(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    static renderJugadores(ronda, jugador) {
        return (
            <table className='table table-striped text-center' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Ronda</th>
                        <th>{jugador[0].nombre}</th>
                        <th>{jugador[1].nombre}</th>
                    </tr>
                </thead>
                <tbody>
                    {ronda.map(ronda =>
                        <tr key={ronda.numero_ronda}>
                            <td>{ronda.numero_ronda}</td>
                            <td>{ronda.puntos_jugador_1}</td>
                            <td>{ronda.puntos_jugador_2}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
       let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : ModalPuntos.renderJugadores(this.state.ronda, this.state.jugador);
        return (
            <Modal isOpen={this.state.modal}>
                <ModalBody>
                    <div className="text-center">
                        <h1 id="tableLabel" >Puntos totales</h1>
                        {contents}
                    </div>
                </ModalBody>
                <div class="modal-footer">
                    <Button className="btn-dark" onClick={this.handleButton.bind(this)}>Volver</Button>
                </div>
            </Modal>
        );
    }

    async populateRonda() {
        const response = await fetch('jugador/GetRonda');
        const data = await response.json();
        this.setState({ ronda: data, loading: false });
    }

    async populateJugador() {
        const response = await fetch('jugador');
        const data = await response.json();
        this.setState({ jugador: data });
    }

    handleButton() {
        this.setState({
            modal: false
        },
            this.props.puntosToMesa(false))
    }
}