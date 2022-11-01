import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';

export class ModalPuntos extends Component {
    static displayName = ModalPuntos.name;
    constructor(props) {
        super(props);
        this.state = {
            modal: true,
            jugadores: [],
            loading: true
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => this.populateJugadores(), 1000);

    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    static renderJugadores(jugadores) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Puntos</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {jugadores.map(jugador =>
                        <tr key={jugador.id}>
                            <td>{jugador.nombre}</td>
                            <td>{jugador.puntos}</td>
                            <td>{jugador.estado}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
       let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : ModalPuntos.renderJugadores(this.state.jugadores);
        return (
            <Modal isOpen={this.state.modal}>
                <ModalBody>
                    <div>
                        <h1 id="tabelLabel" >Jugador</h1>
                        {contents}
                    </div>
                </ModalBody>
                <div class="modal-footer">
                    <button type="submit" className="btn btn-primary" onClick={this.handleButton.bind(this)}>Volver</button>
                </div>
            </Modal>
        );
    }

    async populateJugadores() {
        const response = await fetch('jugador');
        const data = await response.json();
        this.setState({ jugadores: data, loading: false });
    }

    handleButton() {
        this.setState({
            modal: false
        },
            this.props.puntosToMesa(false))
    }
}