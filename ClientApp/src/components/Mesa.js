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

    return (
      <div>
        <h1 id="tabelLabel" >Continental</h1>
        <p> puntaje </p>
            <button className="btn btn-primary" onClick={this.toggleUserModal}>Juego nuevo</button>
            {this.state.isModalOpen ?
                <ModalReiniciar modalToMesa={this.modalToMesa}
                />
                : null}
            <button className="btn btn-primary" onClick={this.repartir}>Repartir</button>
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
    this.setState({  cartas: data, loading: false });
  }
}

