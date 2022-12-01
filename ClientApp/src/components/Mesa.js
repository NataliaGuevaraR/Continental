import React, { Component } from 'react';
import { Container, Col, Row, Button } from 'reactstrap';
import { ModalReiniciar } from './ModalReiniciar';
import { useLocation, Link, useNavigate, Routes, Route } from "react-router-dom";
import { Redireccionar } from './Home';
import { ModalPuntos } from './ModalPuntos';
import { ModalManos } from './ModalManos';
import { ModalAnswer } from './ModalAnswer';
import { ModalNextRonda } from './ModalNextRonda';


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
            isAnswerOpen: false,
            isNextRondaOpen: false,
            ronda: props.ronda,
            validado: props.validado,
            cartaTomada: false,
            jugador: {
                playerId: props.playerId,
                nombreJugador: props.nombreJugador,
                puntosJugador: props.puntosJugador,
                estadoJugador: props.estadoJugador
            },
            playersList: []
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

    answerToMesa = (answer) => {
        this.setState({
            isAnswerOpen: answer,
        })
    }

    nextRondaToMesa = (answer) => {
        this.setState({
            isNextRondaOpen: answer,
        })
    }

    componentDidMount() {
        this.interval = setInterval(() => this.populateCartas(), 500);
        this.interval = setInterval(() => this.datosJugador(), 500);
        this.interval = setInterval(() => this.populatePlayers(), 500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    renderCartas(cartas, idJugador, estadoJugador, cartaTomada) {
        if ((cartas.filter(carta => carta.estado == 2)).length > 0) {
            return (
                <div class="game">
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
                </div>
            );
        }
                
        else {
            return (
                <div class="no-game">
                    <Container className="text-center text-white container-fluid">
                        <h2 class="text-white"><em>Esperando a jugador 2...</em></h2>
                            <p><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></p>
                        </Container>
                </div>
            )
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
            </Row>
            <p><br /></p>
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

    renderButtons() {
        return (
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
        )
    }

    renderFinish() {
        return (
            <div class="no-game">
                <Container className="text-center text-white">
                    <p><br /> <br /> <br /></p>
                    <h2 class="text-white"><em>Juego finalizado...</em></h2>
                    <p><br/> <br /></p>
                    <button><Link to="/"><h2 class="text-black">Volver al menú principal</h2></Link></button>
                    <p><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /></p>
                    </Container>
            </div>
        )
    }

    render() {
        function determineValid(playersList) {
            let count = 0;
            for (let element of playersList) {
                if (element.nombre == "") {
                    count = count + 1;
                }
            }
            if (count > 1) {
                return false;
            }
            else {
                return true;
            }
        }

        let contentsPlayer = null;
        let contentsButtons = null;
        let contentsMesa = null;
        

        if (determineValid(this.state.playersList) == true) {
            contentsPlayer = this.renderJugador();
            contentsButtons = this.renderButtons();
            contentsMesa = this.state.loading
                ? <p><em>Loading...</em></p>
                : this.renderCartas(this.state.cartas, this.props.idJugador, this.state.jugador.estadoJugador, this.state.cartaTomada);
        }
        else {
            contentsMesa = this.renderFinish();
        }
        
        
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

                {this.state.isAnswerOpen ?
                    <ModalAnswer answerToMesa={this.answerToMesa} response={this.state.validado}
                    />
                    : null}

                {this.state.isNextRondaOpen ?
                    <ModalNextRonda nextRondaToMesa={this.nextRondaToMesa}
                    />
                    : null}
                
                {contentsPlayer}
                {contentsButtons}
                {contentsMesa}
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

    toggleAnswerModal = () => {
        this.setState((state) => {
            return { isAnswerOpen: !state.isAnswerOpen }
        })
    }

    toggleManosModal = () => {
        this.setState((state) => {
            return { isManosOpen: !state.isManosOpen }
        })
    }

    toggleNextRondaModal = () => {
        this.setState((state) => {
            return { isNextRondaOpen: !state.isNextRondaOpen }
        })
    }

    async datosJugador() {
        var jugador = this.state.jugador;
        var currentRonda = this.state.ronda;
        var nextRonda = null;
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
        nextRonda = data[3];
        this.setState({
            jugador: jugador,
            ronda: nextRonda
        })
        console.log("Old: " + currentRonda);
        console.log("New: " + nextRonda);
        if ((currentRonda != nextRonda) && this.state.isAnswerOpen == false && currentRonda !== undefined) {
            this.toggleNextRondaModal();
        }
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
                validado: modifiedValidado,
                isAnswerOpen: true
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

    async populatePlayers() {
        const response = await fetch('jugador');
        const data = await response.json();
        this.setState({ playersList: data });
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