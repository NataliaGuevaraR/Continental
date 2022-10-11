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

        public CartaController(ILogger<CartaController> logger, IConfiguration config)
        {
            _logger = logger;
            _config = config;
        }

        public void sumar_puntos(int jugadorId, int ronda, int puntos)
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
        //TODO
        public Boolean validar_escalera (List<int> cartas_escalera)
        {

        }

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

            switch (ronda)
            {
                case 1://TT
                    if (cartas.GroupBy(x => x.Letra).Count() == 2)
                    {
                        sumar_puntos(jugadorId, ronda, puntaje);
                    }
                    else
                    {
                        //no cumple
                    }
                    break;
                case 2://TE
                    string casta_escalera = cartas.GroupBy(x => x.Casta).OrderByDescending(y => y.Count()).First().First().Casta;
                    var cartas_restantes = cartas.Where(x => x.Casta != casta_escalera).ToList();
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
                                        sumar_puntos(jugadorId, ronda, puntaje);
                                    }
                                    else
                                    {
                                        //no cumple
                                    }
                                }
                                else {
                                    if (cartas_escalera.OrderBy(x => x.Id).ToList()[0].Id == (cartas_escalera.OrderBy(x => x.Id).ToList()[3].Id - 3))
                                    {
                                        sumar_puntos(jugadorId, ronda, puntaje);
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
                                    sumar_puntos(jugadorId, ronda, puntaje);
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
                                    sumar_puntos(jugadorId, ronda, puntaje);
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
                case 3://EE
                    
                    break;
                case 4://TTT
                    if (cartas.GroupBy(x => x.Letra).Count() == 3)
                    {
                        sumar_puntos(jugadorId, ronda, puntaje);
                    }
                    else
                    {
                        //no cumple
                    }
                    break;
                case 5:// TTE
                    if ()
                    {
                    
                    }
                    
                    break;
                case 6:// TEE
                    if()
                    {
                        if()
                        {
                        
                        }
                        else()
                        {
                        //no cumple
                        }
                   
                    break;
                case 7:// EEE
                    List casta_escalera = cartas.GroupBy(x => x.Casta).OrderByDescending(y => y.Count()).Casta;
                    if(range(casta_escalera) > 3)
                    {
                     //no cumple
                    }
                    if(range(casta_escalera) == 3)
                    {
                        if(validar_escalera(casta_escalera[0]) && validar_escalera(casta_escalera[1]) && validar_escalera(casta_escalera[2]))
                        {
                            sumar_puntos(jugadorId, ronda, puntaje);
                        }
                    }
                    if(range(casta_escalera) == 2)
                    {
                        if(validar_escalera(casta_escalera[1]))
                        {
                            if(validar_dos_escaleras(casta_escalera[0])
                            {
                            sumar_puntos(jugadorId, ronda, puntaje);
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
                    if(range(casta_escalera) == 1)
                    {
                        if(cartas_escalera.OrderBy(x => x.Id).ToList().Id[0] == (cartas_escalera.OrderBy(x => x.Id).ToList()[11].Id - 11))
                        {
                         sumar_puntos(jugadorId, ronda, puntaje);
                        }
                        else
                        {
                        //no cumple
                        }
                    }
                    break;
                default:
                    // code block
                    break;
            }

        }
    }
}
