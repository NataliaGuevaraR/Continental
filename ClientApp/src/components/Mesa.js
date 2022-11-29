import React, { Component } from 'react';
import { Container, Col, Row, Button } from 'reactstrap';
import { ModalReiniciar } from './ModalReiniciar';
import { useLocation, Link, useNavigate, Routes, Route } from "react-router-dom";
import { Redireccionar } from './Home';
import { ModalPuntos } from './ModalPuntos';
import { ModalManos } from './ModalManos';

export class Mesa extends Component {
    static reset = false;
    static displayName = Mesa.name;


    constructor(props) {
        super(props);
        this.idJugador = this.props.idJugador;
        this.state = {
            isManosOpen: false,
            isPuntosOpen: false,
            cartas: [],
            loading: true,
            isModalOpen: false,
            ronda: props.ronda,
            validado: props.validado,
            cartaTomada: false,
            jugador: {
                playerId: props.playerId,
                nombreJugador: props.nombreJugador,
                puntosJugador: props.puntosJugador,
                estadoJugador: props.estadoJugador
            }
        };

    }
    modalToMesa = (answer, follow) => {
        this.setState({
            isModalOpen: answer
        })
        if (follow) {
            this.reiniciar();
            this.props.navigate("/");
        }
    }

    manosToMesa = (answer => {
        this.setState({
            isManosOpen: answer
        })
    })

    puntosToMesa = (answer) => {
        this.setState({
            isPuntosOpen: answer,
        })
    }

    componentDidMount() {
        this.interval = setInterval(() => this.populateCartas(), 500);
        this.interval = setInterval(() => this.datosJugador(), 500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    renderCartas(cartas, idJugador, estadoJugador, cartaTomada) {
        if ((cartas.filter(carta => carta.estado == 2)).length > 0) {
            return (
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <tbody>
                        <Container>
                            <Row>
                                {cartas.map(carta => {
                                    if (carta.estado == parseInt(idJugador)) {
                                        if (estadoJugador == 0 || cartaTomada == false) {
                                            return (
                                                <Col>
                                                    <img src={require(`${carta.imagen}`)} class="tarjeta" alt="" />
                                                </Col>
                                            )
                                        }
                                        else if (estadoJugador == 1 && cartaTomada == true) {
                                            return (
                                                <Col>
                                                    <Button>
                                                        <img src={require(`${carta.imagen}`)} class="tarjeta" alt="" name={idJugador} id={carta.id} onClick={this.handleCartaButton.bind(this)} />
                                                    </Button>
                                                </Col>
                                            )
                                        }
                                }
                                })}
                                </Row>
                                <Row>
                                    {this.renderPozo (cartas, idJugador, estadoJugador, cartaTomada)}
                                </Row>
                        </Container>
                    </tbody>
                </table>
            );
        }
        else {
            return (
                <h2 class="text-white"><em>Esperando a jugador 2...</em></h2>)
        }
    }

    renderJugador() {
    return(
        <Container className="text-center">
            <Row>
                <Col>
                    <h2 class="text-white">Nombre: {this.state.jugador.nombreJugador} &emsp;  </h2>
                </Col>
                <Col>
                    <h2 class="text-white">Puntos: {this.state.jugador.puntosJugador} &emsp; </h2>
                </Col>
                <Col>
                    <h2 class="text-white">Ronda actual: {this.state.ronda} &emsp; </h2>
                </Col>
                <Col>
                    <h2 class="text-white">Respuesta: {this.state.validado} &emsp; </h2>
                </Col>
            </Row>
            <p><br /><br /></p>
            </Container>
        )
    }

    renderPozo(cartas, idJugador, estadoJugador, cartaTomada) {
        function getFromDeck() {
            let ordenadas = (cartas.sort(function (a, b) { return a.estado - b.estado}));
            let cartaFondo = ordenadas[0];
            let cartaFromDeck = [cartaFondo];
            return cartaFromDeck;
        }
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <tbody>
                    <Container className="text-center">
                        <Row>
                            <Col>
                                {cartas.map(carta => {
                                    if (carta.estado == 0) {
                                        if (estadoJugador == 0 || cartaTomada == true) {
                                            return (
                                                <Col>
                                                    <img src={require(`${carta.imagen}`)} class="tarjeta" alt="" />
                                                </Col>
                                            )
                                        }
                                        else if (estadoJugador == 1 && cartaTomada == false) {
                                            return (
                                                <Col>
                                                    <Button>
                                                        <img src={require(`${carta.imagen}`)} class="tarjeta" alt="tomar" name={idJugador} id={carta.id} onClick={this.handleCartaButton.bind(this)} />
                                                    </Button>
                                                </Col>
                                            )
                                        }
                                    }
                                })}
                            </Col>
                        <Col>
                            {getFromDeck().map(cartaFromDeck => {
                                if (estadoJugador == 0 || cartaTomada == true) {
                                        return (
                                            <Col>
                                                <img src={require(`${"./Imagenes/back.jpg"}`)} class="tarjeta" alt="" />
                                            </Col>
                                        )
                                    }
                                else if (estadoJugador == 1 && cartaTomada == false) {
                                        return (
                                            <Col>
                                                <Button>
                                                    <img src={require(`${"./Imagenes/back.jpg"}`)} class="tarjeta" alt="tomar" name={idJugador} id={cartaFromDeck.id} onClick={this.handleCartaButton.bind(this)} />
                                                </Button>
                                            </Col>
                                        )
                                    }
                            })}
                            </Col>
                        </Row>
                    </Container>
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCartas(this.state.cartas, this.props.idJugador, this.state.jugador.estadoJugador, this.state.cartaTomada);
        <Routes>
            <Route path="/" element={<Redireccionar />} />
        </Routes>

        return (
            <div>
                <div class="container-md text-center">
                    <div>
                        <p><img src={require('./Imagenes/header.png')} alt="" /></p>
                    </div>
                </div>
                {this.renderJugador()}
                <Container className="text-center">
                    <Row>
                        <Col>
                            <button class="btn btn-light" onClick={this.handleButton.bind(this)}>Validar</button>
                        </Col>
                        <Col>
                            <button class="btn btn-light" onClick={this.handlePuntos.bind(this)}>Ver puntos totales</button>
                        </Col>
                        <Col>
                            <button class="btn btn-light" onClick={this.toggleManosModal}>Ver manos necesarias</button>
                        </Col>
                        <Col>
                            <button class="btn btn-light" onClick={this.toggleUserModal}>Terminar juego</button>
                        </Col>
                    </Row>
                    <p><br /><br /></p>
                </Container>
            {this.state.isModalOpen ?
                <ModalReiniciar modalToMesa={this.modalToMesa}
                />
                    : null}
                {this.state.isManosOpen ?
                    <ModalManos manosToMesa={this.manosToMesa}
                    />
                    : null}

                {this.state.isPuntosOpen ?
                    <ModalPuntos puntosToMesa={this.puntosToMesa}
                    />
                    : null}
                {contents}

      </div>

    );
    }

    reiniciar() {
        fetch('carta/Reiniciar', { 
            method: 'POST',
            mode: 'cors',
            body: ''
        })
    }

    handleButton() {
        this.validar(this.props.idJugador);
    }

    handlePuntos() {
        this.setState((state) => {
            return { isPuntosOpen: !state.isPuntosOpen }
        })
    }

    toggleUserModal = () => {
        this.setState((state) => {
            return { isModalOpen: !state.isModalOpen }
        })
    }

    toggleManosModal = () => {
        this.setState((state) => {
            return { isManosOpen: !state.isManosOpen }
        })
    }

    async datosJugador() {
        var jugador = this.state.jugador;
        const response = await fetch('carta/GetDatosJugador', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body: this.props.idJugador
        });
        const data = await response.json();
        jugador.nombreJugador = data[0];
        jugador.estadoJugador = data[1];
        jugador.puntosJugador = data[2];
        this.setState({
            jugador: jugador,
            ronda: data[3]
        })
    }

    validar(value) {
        var modifiedValidado = "";
        fetch('carta/Validar', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body: value
        }).then(response => response.json()).then(data => { modifiedValidado = data; }).then(() => {
            this.setState({
                validado: modifiedValidado
            });
        }); 
    }


  async populateCartas() {
      const response = await fetch('carta/GetCartas', {
          headers: {
              'Content-Type': 'application/json'
          },
          method: 'POST',
          mode: 'cors',
          body: '' 
      });
      const data = await response.json();
      this.setState({ cartas: data, loading: false }
      );
    }

    handleCartaButton(event) {
        let invokerId = event.target.id;
        let playerId = event.target.name;
        let origin = event.target.alt;
        if (origin == "tomar") {
            this.setState({ cartaTomada: true })
        }
        else {
            this.setState({ cartaTomada: false })
        }
        this.cambiarEstadoCarta(playerId, invokerId);
    }

    cambiarEstadoCarta(idJugador, idCarta) {
        fetch('carta/CambioEstadoCarta', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                idJugador: idJugador,
                idCarta: idCarta
            })
        })
    }
}

export function GetMesa(props) {
    const location = useLocation();
    const idJugador = location.state.idJugador;
    const navigate = useNavigate();
    return (<Mesa idJugador={idJugador} navigate={navigate} />)
}