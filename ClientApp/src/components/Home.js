import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (

            <div class="container-md text-center">
                <div>
                    <p>Aquí va la imagen principal del juego</p>
                </div>
                <div>
                    <button class="btn btn-primary"><Link to="/reglas"><h1 class="text-white">Ver reglas</h1></Link></button>
                </div>
                <div>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#nombreModal"><h1 class="text-white">Comenzar juego nuevo</h1></button>
                </div>
                <div class="modal fade" id="nombreModal" tabindex="-1" aria-labelledby="nombreModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-body justify-content-center text-center">
                                <div class="container-md text-center">
                                    <div class="row">
                                        <h1>Nombre para el juego</h1>
                                    </div>
                                    <div class="row">
                                        <input class="form-control" id="nombre" type="text" placeholder="Nickname" aria-label="nickname" />
                                    </div>
                                    <div class="row">
                                        <button className="btn btn-primary" onClick={this.GuardarNombre(nombre)}>Jugar</button>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    GuardarNombre() {
        fetch('carta/GuardarNombre', {
            method: 'POST',
            mode: 'cors',
            body: ''
        })
    }
}
