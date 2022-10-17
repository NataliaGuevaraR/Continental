import React, { Component } from 'react';

export class Name extends Component {
    static displayName = Name.name;

    render() {
        return (

    <html>
        <body>
            <div class="container-md text-center">
                <div class="row">
                    <h1>Nombre para el juego</h1>
                </div>
                <div class="row">
                    <input class="form-control" type="text" placeholder="Nickname" aria-label="nickname"/>
                </div>
                <div class="row">
                    <button class="btn btn-primary" type="submit">¡Jugar!</button>
                </div>
            </div>
         </body>
    </html>

        );
    }
}