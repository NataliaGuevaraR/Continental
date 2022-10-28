using Dapper;
using Microsoft.AspNetCore.Mvc;
using Project2.Clases;
using System.Data.SqlClient;

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
    }
}