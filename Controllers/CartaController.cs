using Dapper;
using Microsoft.AspNetCore.Mvc;
using Project2.Clases;
using System.Data.SqlClient;
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

        [HttpGet]
        [Route("GetCartas")]
        public List<Carta> Get()
        {
            var cs = _config.GetValue<string>("ConnectionStrings:Connection");

            using var con = new SqlConnection(cs);
            con.Open();

            var cartas = con.Query<Carta>("SELECT * FROM carta").ToList();

            cartas.ForEach(cartas => cartas.Imagen = "./Imagenes/"+ cartas.Id +".png"); //(`./Imagenes/${ cartas.logo}`)

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

            con.Query("exec Repartir 12");

            con.Close();

        }
    }
}