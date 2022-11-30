using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using Project2.Clases;
using System.Data.SqlClient;
using System.Xml.Linq;

namespace Project2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class JugadorController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly ILogger<JugadorController> _logger;

        public JugadorController(ILogger<JugadorController> logger, IConfiguration config)
        {
            _logger = logger;
            _config = config;
        }


        [HttpGet]
        public List<Jugador> Get()
        {
            var cs = _config.GetValue<string>("ConnectionStrings:Connection");

            using var con = new SqlConnection(cs);
            con.Open();

            var jugadores = con.Query<Jugador>("SELECT * FROM jugador").ToList();

            jugadores.ForEach(jugadores => jugadores.Nombre = jugadores.Nombre.TrimEnd());

            con.Close();

            return jugadores;

        }

		//Obtener las puntos de cada jugador por ronda
		[HttpGet]
		[Route("GetRonda")]
		public List<Ronda> GetRonda()
		{
		var cs = _config.GetValue<string>("ConnectionStrings:Connection");

		using var con = new SqlConnection(cs);
		con.Open();

		var ronda = con.Query<Ronda>("SELECT * FROM ronda").ToList();


		con.Close();

		return ronda;

		}

		// Limpiar nombre al empezar cada juego
		[HttpPost]
		[Route("LimpiarNombre")]
		public void Limpiar()
		{
		var cs = _config.GetValue<string>("ConnectionStrings:Connection");

		using var con = new SqlConnection(cs);
		con.Open();

			con.Query("update jugador set nombre = ''");
		}
	}

	public class Ronda
	{
		public int numero_ronda { get; set; }
		public int puntos_jugador_1{ get; set; }
		public int puntos_jugador_2 { get; set; }
	}
}