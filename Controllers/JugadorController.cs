﻿using Dapper;
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

		// Limpiar nombre al empezar cada juego
		[HttpPost]
		[Route("LimpiarNombre")]
		public void Limpiar()
		{
		var cs = _config.GetValue<string>("ConnectionStrings:Connection");

		using var con = new SqlConnection(cs);
		con.Open();

		string nombre_id1 = con.Query<string>("select nombre from jugador where id = 1").First();
		string nombre_id2 = con.Query<string>("select nombre from jugador where id = 2").First();

		if (nombre_id1 != "                    " && nombre_id2 != "                    ")
			con.Query("update jugador set nombre = ''");
		}
	}
}