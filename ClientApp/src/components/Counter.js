import React, { Component } from 'react';

export class Counter extends Component {
    static displayName = Counter.name;

    constructor(props) {
        super(props);
        this.state = { jugadores: [], loading: true };
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
            : Counter.renderJugadores(this.state.jugadores);

        return (
            <div>
                <h1 id="tabelLabel" >Jugador</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    async populateJugadores() {
        const response = await fetch('jugador');
        const data = await response.json();
        this.setState({ jugadores: data, loading: false });
    }
}
