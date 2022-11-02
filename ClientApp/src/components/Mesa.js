import React, { Component } from 'react';
import { Container, Col, Row, Button } from 'reactstrap';
import { ModalReiniciar } from './ModalReiniciar';
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import { Redireccionar } from './Home';
import { ModalPuntos } from './ModalPuntos';

export class Mesa extends Component {
  static displayName = Mesa.name;

  constructor(props) {
      super(props);
      this.idJugador = this.props.idJugador;
      this.state = {
          isPuntosOpen : false,
          cartas: [],
          loading: true,
          isModalOpen: false,
          ronda: props.ronda,
          validado: props.validado,
          jugador: {
              playerId : props.playerId,
              nombreJugador: props.nombreJugador,
              puntosJugador: props.puntosJugador,
              estadoJugador : props.estadoJugador
          }
      };
      
    }
    modalToMesa = (answer, follow) => {
        this.setState({
            isModalOpen: answer
        })
        if (follow) {
            this.props.navigate("/");
        }
    }

    puntosToMesa = (answer) => {
        this.setState({
            isPuntosOpen: answer,
        })
    }

    componentDidMount() {
        this.interval = setInterval(() => this.populateCartas(), 1000);
        this.interval = setInterval(() => this.datosJugador(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    static renderCartas(cartas, idJugador, estadoJugador) {
        if ((cartas.filter(carta => carta.estado == 2)).length > 0) {
            return (
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Carta</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Container>
                            <Row>
                                {cartas.map(carta => {
                                    if (carta.estado == parseInt(idJugador)) {
                                        if (estadoJugador == 0) {
                                            return (
                                                <Col>
                                                    <img src={require(`${carta.imagen}`)} class="tarjeta" alt="" />
                                                </Col>
                                            )
                                        }
                                        else {
                                            return (
                                                <Col>
                                                    <Button>
                                                        <img src={require(`${carta.imagen}`)} class="tarjeta" alt="" name={idJugador} id={carta.id} onClick={Mesa.handleCartaButton} />
                                                    </Button>
                                                </Col>
                                            )
                                        }
                                }
                                })}
                                </Row>
                                <Row>
                                    {Mesa.renderPozo (cartas, idJugador, estadoJugador)}
                                </Row>
                        </Container>
                    </tbody>
                </table>
            );
        }
        else {
            return (
                <h2><em>Esperando a jugador 2...</em></h2>)
        }
    }

    renderJugador() {
    return(
        <div class="container d-flex">
            <h1>ID:</h1> {this.props.idJugador}
            <h2>Nombre: </h2> {this.state.jugador.nombreJugador}
            <h2>Puntos: </h2> {this.state.jugador.puntosJugador}
            <h2>Estado: </h2> {this.state.jugador.estadoJugador}
            <h2>Ronda actual: </h2> {this.state.ronda}
            <h2>Respuesta: {this.state.validado}</h2>
            </div>
        )
    }

    static renderPozo(cartas, idJugador, estadoJugador) {
        function getFromDeck() {
            let ordenadas = (cartas.sort(function (a, b) { return a.estado - b.estado}));
            let cartaFondo = ordenadas[0];
            let cartaFromDeck = [cartaFondo];
            return cartaFromDeck;
        }
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Pozo</th>
                    </tr>
                </thead>
                <tbody>
                    <Container>
                        <Row>
                            <Col>
                                {cartas.map(carta => {
                                    if (carta.estado == 0) {
                                        if (estadoJugador == 0) {
                                            return (
                                                <Col>
                                                    <img src={require(`${carta.imagen}`)} class="tarjeta" alt="" />
                                                </Col>
                                            )
                                        }
                                        else {
                                            return (
                                                <Col>
                                                    <Button>
                                                        <img src={require(`${carta.imagen}`)} class="tarjeta" alt="" name={idJugador} id={carta.id} onClick={Mesa.handleCartaButton} />
                                                    </Button>
                                                </Col>
                                            )
                                        }
                                    }
                                })}
                            </Col>
                        <Col>
                            {getFromDeck().map(cartaFromDeck => {
                                    if (estadoJugador == 0) {
                                        return (
                                            <Col>
                                                <img src={require(`${"./Imagenes/back.jpg"}`)} class="tarjeta" alt="" />
                                            </Col>
                                        )
                                    }
                                    else {
                                        return (
                                            <Col>
                                                <Button>
                                                    <img src={require(`${"./Imagenes/back.jpg"}`)} class="tarjeta" alt="" name={idJugador} id={cartaFromDeck.id} onClick={Mesa.handleCartaButton} />
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
            : Mesa.renderCartas(this.state.cartas, this.props.idJugador, this.state.jugador.estadoJugador);
        <Routes>
            <Route path="/" element={<Redireccionar />} />
        </Routes>

        return (
            <div>
                {this.renderJugador()}
            <button className="btn btn-primary" onClick={this.toggleUserModal}>Terminar juego</button>
            {this.state.isModalOpen ?
                <ModalReiniciar modalToMesa={this.modalToMesa}
                />
                : null}
                <button className="btn btn-primary" onClick={this.handleButton.bind(this)}>Validar</button>
                <button className="btn btn-primary" onClick={this.handlePuntos.bind(this)}>Ver puntos totales</button>
                {this.state.isPuntosOpen ?
                    <ModalPuntos puntosToMesa={this.puntosToMesa}
                    />
                    : null}
                {contents }
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

    static handleCartaButton(event) {
        let invokerId = event.target.id;
        let playerId = event.target.name;
        Mesa.cambiarEstadoCarta(playerId, invokerId);
    }

    static cambiarEstadoCarta(idJugador, idCarta) {
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
    return (<Mesa idJugador={idJugador} navigate={navigate } />)
}