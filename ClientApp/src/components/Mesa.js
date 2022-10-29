import React, { Component } from 'react';
import { Container, Col, Row, Button } from 'reactstrap';
import { ModalReiniciar } from './ModalReiniciar';
import { useLocation } from "react-router-dom";

export class Mesa extends Component {
  static displayName = Mesa.name;

  constructor(props) {
      super(props);
      this.idJugador = props.idJugador;
      this.state = {
          cartas: [],
          loading: true,
          isModalOpen: false,
          ronda: props.ronda,
          validado: "",
          jugador: {
              nombreJugador: props.nombreJugador,
              puntosJugador: props.puntosJugador,
              estadoJugador : props.estadoJugador
          }
      };
      
    }
    modalToMesa = (answer) => {
        this.setState({
            isModalOpen: answer
        })
    }

    componentDidMount() {
        this.interval = setInterval(() => this.populateCartas(), 1000);
        this.interval = setInterval(() => this.datosJugador(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    static renderCartas(cartas) {
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
                    {cartas.map(carta =>
                        <Col>
                            <Button>
                                <img src={require(`${carta.imagen}`)} class="tarjeta" alt="">
                                     
                                </img>
                            </Button>
                        </Col>
                        )}
                    </Row>
                </Container>
        </tbody>
                </table>
    );
    }

    renderJugador() {
    return(
        <div>
            <h1>ID:</h1> {this.state.jugador.idJugador}
            <h2>Nombre: </h2> {this.state.jugador.nombreJugador}
            <h2>Puntos: </h2> {this.state.jugador.puntosJugador}
            <h2>Estado: </h2> {this.state.jugador.estadoJugador }
            </div>
        )
    }


    render() {    
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Mesa.renderCartas(this.state.cartas);

    return (
        <div>
            <h1>Id de prueba: {this.idJugador }</h1>
            {this.renderJugador()}
            <button className="btn btn-primary" onClick={this.toggleUserModal}>Juego nuevo</button>
            {this.state.isModalOpen ?
                <ModalReiniciar modalToMesa={this.modalToMesa}
                />
                : null}
            <button className="btn btn-primary" onClick={this.repartir}>Repartir</button>
            <button className="btn btn-primary" onClick={this.validar}>Validar</button>
        {contents}
      </div>

    );
    }

    reiniciar() {
        //this.setState({ cartas: [], loading: true });

        fetch('carta/Reiniciar', { 
            method: 'POST',
            mode: 'cors',
            body: ''
        })
    }

 

    repartir() {
        fetch('carta/Repartir', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body: ''
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
            body: 2
        });
        const data = await response.json();
        jugador.nombreJugador = data[0];
        jugador.estadoJugador = data[1];
        jugador.puntosJugador = data[2];
        this.setState({
            jugador : jugador
        })
    }

    async validar() {
        const response = await fetch('carta/Validar', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body: this.state.jugador.idJugador
        });
        const data = await response.json();
        this.setState({ ronda: data });
    }


  async populateCartas() {
      const response = await fetch('carta/GetCartas', {
          headers: {
              'Content-Type': 'application/json'
          },
          method: 'POST',
          mode: 'cors',
          body: 2
      });
      const data = await response.json();
      this.setState({ cartas: data, loading: false },
          console.log("Estado final :" + this.state.jugador.idJugador));
    }
}
