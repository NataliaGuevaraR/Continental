import React, { Component } from 'react';

export class Reglas extends Component {
  static displayName = Reglas.name;

  render() {
      return (
<html>               

        <div class="container-md d-flex text-center justify-content-center text-primary text-white">
                  <h1 class="titulo position-relative">REGLAS DEL JUEGO</h1>
              </div>
              <div class="row">
                  <div class="col text-center">
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#objetivosModal">
                      Objetivos
                  </button>

                  <div class="modal fade" id="objetivosModal" tabindex="-1" aria-labelledby="objetivosModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                          <div class="modal-content">
                              <div class="modal-body justify-content-center text-center">
                                  <h2 class="objetivos">Objetivos</h2>
                                  <p>Ligar las cartas en combinaciones establecidas y exponerlas, el puntaje de las cartas
                                      del ganador en la mesa se suman a su puntaje y gana el juego el que tiene más puntos
                                      al final de la partida. En este juego usaremos una baraja de poker inglesa con comodines
                                      lo que da un total de 54 cartas.</p>
                              </div>
                              <div class="modal-footer">
                                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                              </div>
                          </div>
                      </div>
                      </div>
                  </div>

                  <div class="col text-center">

                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#cartasModal">
                      Cartas
                  </button>
                  <div class="modal fade" id="cartasModal" tabindex="-1" aria-labelledby="cartasModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                          <div class="modal-content">
                              <div class="modal-body text-center">
                                  <h2 class="objetivos">Objetivos</h2>
                                  <p>Ligar las cartas en combinaciones establecidas y exponerlas, el puntaje de las cartas
                                      del ganador en la mesa se suman a su puntaje y gana el juego el que tiene más puntos
                                      al final de la partida. En este juego usaremos una baraja de poker inglesa con comodines
                                      lo que da un total de 54 cartas.</p>
                              </div>
                              <div class="modal-footer">
                                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                              </div>
                          </div>
                      </div>
                      </div>
                      </div>
              </div>
              <div class="row">
                  <div class="col text-center">
                      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ordenModal">
                          Orden y valores
                      </button>
                      <div class="modal fade" id="ordenModal" tabindex="-1" aria-labelledby="ordenModalLabel" aria-hidden="true">
                          <div class="modal-dialog">
                              <div class="modal-content">
                                  <div class="modal-body text-center">
                                      <div class="container-md">
                                          <div class="row">
                                              <h2 class="orden">Orden y valor de las cartas</h2>
                                          </div>
                                          <div class="row">
                                              <p>El orden de las cartas, es el usual, del as al rey de forma correlativa. El valor de las cartas es:</p>
                                          </div>
                                          <div class="row">
                                          <table class="table table-striped-columns table-bordered">
                                              <tr>
                                                  <th scope="col">Comodín</th>
                                                  <th scope="col">50 puntos</th>
                                              </tr>
                                              <tr>
                                                  <th scope="col">As</th>
                                                  <th scope="col">20 puntos</th>
                                              </tr>
                                              <tr>
                                                  <th scope="col">K, Q, J</th>
                                                  <th scope="col">10 puntos</th>
                                              </tr>
                                              <tr>
                                                  <th scope="col">2, 3, 4 ,5 ,6, 7, 8, 9, 10</th>
                                                  <th scope="col">Su valor</th>
                                              </tr>
                                              </table>
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
                  <div class="col text-center">
                      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#combinacionesModal">
                          Combinaciones
                      </button>
                      <div class="modal fade" id="combinacionesModal" tabindex="-1" aria-labelledby="combinacionesModalLabel" aria-hidden="true">
                          <div class="modal-dialog">
                              <div class="modal-content">
                                  <div class="modal-body">
                                      <div class="container-md">
                                          <div class="row">
                                          <h2 class="combinaciones">Combinaciones fijas</h2>
                                          </div>
                                          <div class="row">
                                          <p>Se juegan 7 rondas, de menor a mayor dificultad, repartiéndose en cada una de ellas la cantidad justa para realizar las combinaciones de esa mano:</p>
                                          </div>
                                          <div class="row">
                                              <ul class="list-group">
                                              <li class="list-group-item"><strong>(TT) Primera ronda: </strong> se reparten seis cartas y deben realizarse dos tríos.</li>
                                              <li class="list-group-item"><strong>(TE) Segunda ronda: </strong> siete cartas; un trío y una escalera.</li>
                                              <li class="list-group-item"><strong>(EE) Tercera ronda: </strong> ocho cartas; dos escaleras.</li>
                                              <li class="list-group-item"><strong>(TTT) Cuarta ronda: </strong> nueve cartas; tres tríos.</li>
                                              <li class="list-group-item"><strong>(TTE) Quinta ronda: </strong> diez cartas; dos tríos y una escalera.</li>
                                              <li class="list-group-item"><strong>(TEE) Sexta ronda: </strong> once cartas; un trío y dos escaleras.</li>
                                              <li class="list-group-item"><strong>(EEE) Séptima ronda: </strong> doce cartas; tres escaleras.</li>
                                              </ul>
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
              </div>
              <div class="row">
                  <div class="col text-center">

                      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#comodinModal">
                          Comodín
                      </button>
                      <div class="modal fade" id="comodinModal" tabindex="-1" aria-labelledby="comodinModalLabel" aria-hidden="true">
                          <div class="modal-dialog">
                              <div class="modal-content">
                                  <div class="modal-body text-center">
                                      <div class="container-md">
                                          <h2>El comodín</h2>
                                          <p>El comodín, también llamado joker, es una carta especial que reemplaza a cualquier otra de la baraja.
                                              En el continental puede hacerse un trío con dos comodines y una carta natural, pero no un trío de comodines.</p>
                                      </div>
                                  </div>
                                  <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                  </div>
                              </div>
                          </div>
                      </div>
   
                  </div>
                  <div class="col text-center">

                      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#desarrolloModal">
                          Desarrollo del juego
                      </button>
                      <div class="modal fade" id="desarrolloModal" tabindex="-1" aria-labelledby="desarrolloModalLabel" aria-hidden="true">
                          <div class="modal-dialog">
                              <div class="modal-content">
                                  <div class="modal-body text-center">
                                      <div>
                                          <h2>Desarrollo</h2>
                                          <p>Cada jugador, en su turno, puede tomar la carta descubierta del pozo o bien la carta superior
                                              del mazo. Termina su turno descartándose de una de las cartas de la mano, que dejará sobre el
                                              pozo.Durante su turno cierra el jugador que tenga las combinaciones que correspondan al juego
                                              en curso.Cuando alguien cierra, los puntos del ganador son sumados a su total. A continuación
                                              se recogen las cartas y se reparten las cartas correspondientes.</p>
                                      </div>
                                  </div>
                                  <div class="modal-footer">
                                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                  </div>
                              </div>
                          </div>
                      </div>


                  </div>
              </div>
              <div class="row">


                  <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#finalModal">
                      Final
                  </button>
                  <div class="modal fade" id="finalModal" tabindex="-1" aria-labelledby="finalModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                          <div class="modal-content">
                              <div class="modal-body text-center">
                                  <div class="container-md">
                                      <h2>Final</h2>
                                      <p>Después de acabadas las 7 rondas el jugador con más puntos gana.</p>
                                  </div>
                              </div>
                              <div class="modal-footer">
                                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                              </div>
                          </div>
                      </div>
                  </div>

                  </div>

    </html>
    );
  }
}
