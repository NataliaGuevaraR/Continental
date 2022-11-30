import React, { Component } from 'react';
import { Container } from 'reactstrap';
import background from './Imagenes/background.jpg';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
        <div style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'repeat',
            backgroundSize: 'cover'
        }}>
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
