using Dapper;
using Microsoft.AspNetCore.Mvc;
using Project2.Clases;
using System.Collections.Immutable;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Runtime.InteropServices;
using static System.Net.Mime.MediaTypeNames;

namespace Project2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CartaController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly ILogger<CartaController> _logger;
        private readonly List<string> valores_cartas = new()
        {
            "A","2","3", "4","5", "6","7", "8","9", "10","J", "Q", "K"
        };
        private readonly List<string> cartas_precindibles = new()
        {
            "A","5","6","9","10"
        };


        public CartaController(ILogger<CartaController> logger, IConfiguration config)
        {
            _logger = logger;
            _config = config;
        }

        // sumar puntos
        public void Sumar_puntos(int jugadorId, int ronda, int puntos)
        {
            string aux_jugador = jugadorId == 1 ? "puntos_jugador_1" : "puntos_jugador_2";

            var cs = _config.GetValue<string>("ConnectionStrings:Connection");

            using var con = new SqlConnection(cs);


            con.Open();

            con.Query("update juego set ronda_actual = " + (ronda+1).ToString());
            con.Query("update jugador set puntos = " + puntos.ToString() + " WHERE id = " + jugadorId.ToString());
            con.Query("update ronda set " + aux_jugador + " = " + puntos.ToString() + " where numero_ronda = " + ronda.ToString());
            con.Close();

        }

        // validar una escalera 
        public bool ValidarEscalera (List<Carta> cartas_escalera)
        { 
            if (cartas_escalera.Count != 4)
            {
                return false;
            }

            if (cartas_escalera.Any(x => x.Letra == "A"))
            {
                if ((cartas_escalera.Any(x => x.Letra == "2") && cartas_escalera.Any(x => x.Letra == "3") && cartas_escalera.Any(x => x.Letra == "4")) || (cartas_escalera.Any(x => x.Letra == "J") && cartas_escalera.Any(x => x.Letra == "Q") && cartas_escalera.Any(x => x.Letra == "K")))
                {
                    return true;
                }
            }
            else
            {
                if (cartas_escalera.OrderBy(x => x.Id).ToList()[0].Id == (cartas_escalera.OrderBy(x => x.Id).ToList()[3].Id - 3))
                {
                    return true;
                }
            }
            return false;
        }
        // validar terna
        public bool ValidarTerna (List<Carta> cartas_ternas, int nTernas)
        {
            if (cartas_ternas.GroupBy(x => x.Letra).Count() == nTernas)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        // validar dos escaleras
        public bool ValidarDosEscaleras (List<Carta> cartasEscaleras)
        {

            return false;
        }

        // Obtener imagenes de cartas
        [HttpGet] 
        [Route("GetCartas")]
        public List<Carta> Get()
        {
            var cs = _config.GetValue<string>("ConnectionStrings:Connection");

            using var con = new SqlConnection(cs);
            con.Open();

            var cartas = con.Query<Carta>("SELECT * FROM carta").ToList();

            cartas.ForEach(cartas => cartas.Imagen = "./Imagenes/"+ cartas.Id +".png"); 

            con.Close();

            return cartas;

        }

        // Reiniciar juego
        [HttpPost]
        [Route("Reiniciar")]
        public void Reiniciar()
        {
            var cs = _config.GetValue<string>("ConnectionStrings:Connection");

            using var con = new SqlConnection(cs);
            con.Open();

            con.Query("update juego set ronda_actual = 0");
            con.Query("update carta set estado = 0");
            con.Query("update jugador set puntos = 0, estado = 0");
            con.Query("update ronda set puntos_jugador_1 = 0, puntos_jugador_2 = 0");

            con.Close();

        }

        // Repartir cartas
        [HttpPost]
        [Route("Repartir")]
        public void Repartir()
        {
            var cs = _config.GetValue<string>("ConnectionStrings:Connection");

            using var con = new SqlConnection(cs);
            con.Open();

            con.Query("exec Repartir 6");

            con.Close();

        }

        // Validar segun turno
        [HttpPost]
        [Route("Validar")]
        public void Validar()
        {
            int jugadorId = 1;

            var cs = _config.GetValue<string>("ConnectionStrings:Connection");

            using var con = new SqlConnection(cs);
            con.Open();

            int ronda = con.Query<int>("SELECT ronda_actual FROM juego").First();
            List<Carta> cartas = con.Query<Carta>("SELECT * FROM carta WHERE estado = "+ jugadorId.ToString()).ToList();
            cartas.ForEach(x => x.Letra = x.Letra.TrimEnd());
            cartas.ForEach(x => x.Casta = x.Casta.TrimEnd());

            int puntaje = cartas.Sum(x => x.Puntos);
            string casta_escalera = cartas.GroupBy(x => x.Casta).OrderByDescending(y => y.Count()).First().First().Casta;
            var cartas_restantes = cartas.Where(x => x.Casta != casta_escalera).ToList();
            var cartas_ordenadas_x_casta = cartas.GroupBy(x => x.Casta).OrderByDescending(y => y.Count()).Select(grp => grp.ToList()).ToList();
            int numero_castas = cartas_ordenadas_x_casta.Count;
            switch (ronda)
            {
                #region TT (6 CARTAS)
                case 1:
                    if (ValidarTerna(cartas, 2))
                    {
                        Sumar_puntos(jugadorId, ronda, puntaje);
                    }
                    else
                    { 
                        //no cumple
                    }
                    break;
                #endregion
                #region TE (7 CARTAS)
                case 2: 
                    
                    if (cartas_restantes.Count() < 2 || cartas_restantes.Count() > 3)
                    {
                        //no cumple
                    }
                    if (cartas_restantes.Count()== 2)
                    {
                        if( cartas_restantes[0].Letra == cartas_restantes[1].Letra)
                        {
                            if(cartas.Any(x => x.Casta == casta_escalera && x.Letra == cartas_restantes[0].Letra))
                            {
                                var cartas_escalera = cartas.Where(x => x.Casta == casta_escalera && x.Letra != cartas_restantes[0].Letra);

                                if (cartas_escalera.Any(x => x.Letra == "A"))
                                {
                                    if ((cartas_escalera.Any(x => x.Letra == "2") && cartas_escalera.Any(x => x.Letra == "3") && cartas_escalera.Any(x => x.Letra == "4")) || (cartas_escalera.Any(x => x.Letra == "J") && cartas_escalera.Any(x => x.Letra == "Q") && cartas_escalera.Any(x => x.Letra == "K")))
                                    {
                                        Sumar_puntos(jugadorId, ronda, puntaje);
                                    }
                                    else
                                    {
                                        //no cumple
                                    }
                                }
                                else {
                                    if (cartas_escalera.OrderBy(x => x.Id).ToList()[0].Id == (cartas_escalera.OrderBy(x => x.Id).ToList()[3].Id - 3))
                                    {
                                        Sumar_puntos(jugadorId, ronda, puntaje);
                                    }
                                    else
                                    {
                                        //no cumple
                                    }
                                }
                            }
                            else
                            {
                                //no cumple
                            }
                        }
                        else
                        {
                            //no cumple
                        }

                    }
                    if (cartas_restantes.Count() == 3)
                    {
                        if (cartas_restantes[0].Letra == cartas_restantes[1].Letra && cartas_restantes[0].Letra == cartas_restantes[2].Letra)
                        {
                            var cartas_escalera = cartas.Where(x => x.Casta == casta_escalera);

                            if (cartas_escalera.Any(x => x.Letra == "A"))
                            {
                                if ((cartas_escalera.Any(x => x.Letra == "2") && cartas_escalera.Any(x => x.Letra == "3") && cartas_escalera.Any(x => x.Letra == "4")) || (cartas_escalera.Any(x => x.Letra == "J") && cartas_escalera.Any(x => x.Letra == "Q") && cartas_escalera.Any(x => x.Letra == "K")))
                                {
                                    Sumar_puntos(jugadorId, ronda, puntaje);
                                }
                                else
                                {
                                    //no cumple
                                }
                            }
                            else
                            {
                                if (cartas_escalera.OrderBy(x => x.Id).ToList()[0].Id == (cartas_escalera.OrderBy(x => x.Id).ToList()[3].Id - 3))
                                {
                                    Sumar_puntos(jugadorId, ronda, puntaje);
                                }
                                else
                                {
                                    //no cumple
                                }
                            }
                        }
                        else
                        {
                            //no cumple
                        }
                    }
                    break;
                #endregion
                #region EE (8 CARTAS)
                case 3:
                    if (numero_castas > 2)
                    {
                        //no cumple
                    }
                    if (numero_castas == 2)
                    {
                        if(ValidarEscalera(cartas_ordenadas_x_casta[0]) && ValidarEscalera(cartas_ordenadas_x_casta[1]))
                        {
                            Sumar_puntos(jugadorId, ronda, puntaje);
                        }
                        else
                        {
                            //no cumple
                        }
                    }
                    if (numero_castas == 1)
                    {
                        if(cartas_ordenadas_x_casta[0].Any(x => x.Letra == "A"))
                        {

                        }
                        else
                        {
                            if(cartas_ordenadas_x_casta[0].OrderBy(x => x.Id).ToList()[0].Id == cartas_ordenadas_x_casta[0].OrderBy(x => x.Id).ToList()[3].Id - 3 && cartas_ordenadas_x_casta[0].OrderBy(x => x.Id).ToList()[4].Id == cartas_ordenadas_x_casta[0].OrderBy(x => x.Id).ToList()[7].Id - 3)
                            {
                                Sumar_puntos(jugadorId, ronda, puntaje);
                            }
                            else
                            {
                                //no cumple
                            }
                        }
                    }
                    break;
                #endregion
                #region TTT (9 CARTAS)
                case 4:
                    if (ValidarTerna(cartas, 3))
                    {
                        Sumar_puntos(jugadorId, ronda, puntaje);
                    }
                    else
                    {
                        //no cumple
                    }
                    break;
                #endregion
                #region TTE (10 CARTAS)
                case 5:
                    
                    
                    break;
                #endregion
                #region TEE (11 CARTAS)
                case 6:
                    /*if()
                    {
                        if()
                        {
                        
                        }
                        else
                        {
                        //no cumple
                        }*/
                   
                    break;
                #endregion
                #region EEE (12 CARTAS)
                case 7:
                    
                    if (numero_castas > 3)
                    {
                     //no cumple
                    }
                    if(numero_castas == 3)
                    {
                        if (ValidarEscalera(cartas_ordenadas_x_casta[0]) && ValidarEscalera(cartas_ordenadas_x_casta[1]) && ValidarEscalera(cartas_ordenadas_x_casta[2]))
                        {
                            Sumar_puntos(jugadorId, ronda, puntaje);
                        }
                        else
                        {
                            //no cumple
                        }
                    }
                    if(numero_castas == 2)
                    {   
                        if (cartas_ordenadas_x_casta[0].Count() != 8)
                        {
                            //no cumple
                        }
                        else
                        {
                            if (ValidarEscalera(cartas_ordenadas_x_casta[1]))
                            {
                                if (ValidarDosEscaleras(cartas_ordenadas_x_casta[0]))
                                {
                                    Sumar_puntos(jugadorId, ronda, puntaje);
                                }
                                else
                                {
                                    //no cumple
                                }
                            }
                            else
                            {
                                //no cumple
                            }
                        }
                    }
                    if(numero_castas == 1)
                    {
                        string carta_restante = valores_cartas.Except(cartas_ordenadas_x_casta[0].Select(x => x.Letra)).First();
                        if (cartas_precindibles.Contains(carta_restante))
                        {
                            Sumar_puntos(jugadorId, ronda, puntaje);
                        }
                        else
                        {
                            //no cumple
                        }
                    }
                    break;
                #endregion

                default:
                    // code block
                    break;
            }
        }
    }
}
