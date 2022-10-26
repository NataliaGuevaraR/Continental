import React, { Component } from 'react';
import {Card, Container, Col, Row, Button} from 'reactstrap';

export class Mesa extends Component {
  static displayName = Mesa.name;

  constructor(props) {
    super(props);
    this.state = { cartas: [], loading: true };
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
                            <Card>
                                <Button>
                                    <img src={require(`${carta.imagen}`)} class="tarjeta" alt="" />
                                </Button>
                            </Card>
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
            <button className="btn btn-primary" onClick={this.reiniciar}>Juego nuevo</button>
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
        //this.setState({ cartas: [], loading: true });

        fetch('carta/Repartir', {
            method: 'POST',
            mode: 'cors',
            body: ''
        })
    }

  async populateCartas() {
    const response = await fetch('carta/GetCartas');
    const data = await response.json();
    this.setState({  cartas: data, loading: false });
  }
}

