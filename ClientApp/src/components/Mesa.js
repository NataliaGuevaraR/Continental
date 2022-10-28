import React, { Component } from 'react';
import { Container, Col, Row, Button } from 'reactstrap';
import { ModalReiniciar } from './ModalReiniciar';

export class Mesa extends Component {
  static displayName = Mesa.name;

  constructor(props) {
    super(props);
      this.state = {
          cartas: [],
          loading: true,
          isModalOpen: false,
          ronda: this.props.ronda,
          validado: "",
          jugador: {
              nombreJugador : this.props.nombreJugador,
              idJugador : this.props.idJugador,
              puntosJugador : this.props.puntosJugador
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

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Mesa.renderCartas(this.state.cartas);
            this.datosJugador(this.state.jugador.idJugador);
            this.rondaActual();        

    return (
      <div>
            <h1 id="tabelLabel" >ID: {this.state.jugador.idJugador }</h1>
            <p> Nombre: {this.state.jugador.nombreJugador} </p>
            <p> Puntos: {this.state.jugador.puntosJugador} </p>
            <p> Ronda: {this.state.ronda} </p>
            <p> Validación: {this.state.validado} </p>

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
        const response = await fetch('carta/GetDatosJugador', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body: this.state.jugador.idJugador
        });
        const data = await response.json();
        this.setState({ nombreJugador : data[0], puntosJugador : data[1]});
    }

    async rondaActual() {
        const response = await fetch('carta/GetRonda', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body: ''
        });
        const data = await response.json();
        this.setState({ ronda : data });
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
          body: this.state.jugador.idJugador
      });
    const data = await response.json();
    this.setState({ validado : data });
  }
}

