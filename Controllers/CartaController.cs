﻿using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using Project2.Clases;
using System.Data.SqlClient;
using System.Text.Json;

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
		public string Sumar_puntos(int jugadorId, int ronda, int puntos)
		{
		string aux_jugador = jugadorId == 1 ? "puntos_jugador_1" : "puntos_jugador_2";

		var cs = _config.GetValue<string>("ConnectionStrings:Connection");

		using var con = new SqlConnection(cs);

		con.Open();

		con.Query("update juego set ronda_actual = " + (ronda + 1).ToString());
		con.Query("update jugador set puntos = " + puntos.ToString() + " WHERE id = " + jugadorId.ToString());
		con.Query("update ronda set " + aux_jugador + " = " + puntos.ToString() + " where numero_ronda = " + ronda.ToString());

		con.Close();
		//Repartir((ronda + 1).ToString());//Repartir((ronda + 1).ToString());
		Repartir();

		return "Usted ha sumado " + puntos.ToString() + " puntos";
		}

		// validar una escalera 
		public bool ValidarEscalera(List<Carta> cartas)
		{
		if (cartas.GroupBy(x => x.Casta).Count() > 1)
			return false;

		if (cartas.Count != 4)
			return false;

		if (cartas.Any(x => x.Letra == "A") && ((cartas.Any(x => x.Letra == "2") && cartas.Any(x => x.Letra == "3") && cartas.Any(x => x.Letra == "4")) || (cartas.Any(x => x.Letra == "J") && cartas.Any(x => x.Letra == "Q") && cartas.Any(x => x.Letra == "K"))))
			return true;
		else if (cartas[0].Id == (cartas[3].Id - 3))
			return true;
		return false;
		}

		// validar dos escaleras
		public bool ValidarDosEscaleras(List<List<Carta>> cartas_ordenadas_x_casta, int numero_castas)
		{
		if (numero_castas == 2 && ValidarEscalera(cartas_ordenadas_x_casta[0]) && ValidarEscalera(cartas_ordenadas_x_casta[1]))
			return true;
		else if (numero_castas == 1)
		{
		var primera_escalera = cartas_ordenadas_x_casta[0].Take(4).ToList();
		var segunda_escalera = cartas_ordenadas_x_casta[0].Except(primera_escalera).ToList();

		if (ValidarEscalera(primera_escalera) && ValidarEscalera(segunda_escalera))
			return true;

		if (cartas_ordenadas_x_casta[0].Any(x => x.Letra == "A"))
		{
		var lista_a = cartas_ordenadas_x_casta[0].Where(x => x.Letra != "A").Concat(cartas_ordenadas_x_casta[0].Where(x => x.Letra == "A")).ToList();
		primera_escalera = lista_a.Take(4).ToList();
		segunda_escalera = lista_a.Except(primera_escalera).ToList();

		if (ValidarEscalera(primera_escalera) && ValidarEscalera(segunda_escalera))
			return true;
		}
		}
		return false;
		}

		// Obtener cartas
		[HttpPost]
		[Route("GetCartas")]
		public List<Carta> Get()
		{
		var cs = _config.GetValue<string>("ConnectionStrings:Connection");

		using var con = new SqlConnection(cs);
		con.Open();

		var cartas = con.Query<Carta>("SELECT * FROM carta;").ToList();


		cartas.ForEach(cartas => cartas.Imagen = "./Imagenes/" + cartas.Id + ".png");

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

		//con.Query("update jugador set nombre = ''");
		con.Query("update juego set ronda_actual = 1");
		con.Query("update carta set estado = 0");
		con.Query("update jugador set puntos = 0, estado = 0");
		con.Query("update jugador set estado = 1 where id = 1");
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

		int ronda = con.Query<int>("SELECT ronda_actual FROM juego").First();
		int ronda1 = ronda + 5;
		con.Query("exec Repartir " + ronda1);

		con.Close();

		}

		// Guardar nombre
		[HttpPost]
		[Route("GuardarNombre")]
		public int GuardarNombre([FromBody] JsonElement content)
		{
		string name = content.ToString();

		var cs = _config.GetValue<string>("ConnectionStrings:Connection");

		using var con = new SqlConnection(cs);
		con.Open();

		string nombre_id1 = con.Query<string>("select nombre from jugador where id = 1").First();
		string nombre_id2 = con.Query<string>("select nombre from jugador where id = 2").First();

		int id = 1;

		if (nombre_id1 != "                    " )
		
			id = 2;

		con.Query("update jugador set nombre = '" +  name +  "' where id = "+ id);
		return id;
		
		}

		// Cambiar estado carta 
		[HttpPost]
		[Route("CambioEstadoCarta")]
		public void CambiarEstado([FromBody] JsonElement content)
		{

		var contents = JsonSerializer.Deserialize<Receiver>(content);

		int IdJugador = int.Parse(contents!.idJugador);
		int IdCarta = int.Parse(contents!.idCarta);
		int IdJugador2 = 2;

		var cs = _config.GetValue<string>("ConnectionStrings:Connection");

		using var con = new SqlConnection(cs);
		con.Open();

		int EstadoCarta = con.Query<int>("SELECT estado FROM carta where id = " + IdCarta.ToString()).First();
		int NCartasPozo = con.Query<int>("select count (*) from carta where estado = 0").First();

		if (IdJugador == 2)
			IdJugador2 = 1;

		if (EstadoCarta == IdJugador )
		{
			
			if (NCartasPozo == 1)
			{
			int IdCartaPozo = con.Query<int>("select id from carta where estado = 0").First();
			con.Query("update carta set estado = estado - 1 where estado < 0;"); //aumentar el estado de las cartas de la baraja para dar espacio a la carta nueva
			con.Query("update carta set estado = -1 where id = " + IdCartaPozo.ToString());
			con.Query("update carta set estado = 0 where id = " + IdCarta.ToString());
			}
			if(NCartasPozo == 0)
			
			con.Query("update carta set estado = 0 where id = " + IdCarta.ToString());


		con.Query("update jugador set estado = 0");
		con.Query("update jugador set estado = 1 where id = " + IdJugador2);

		}
		if(EstadoCarta <= 0)
		{
		con.Query("update carta set estado = "+ IdJugador.ToString() +"where id = " + IdCarta.ToString());
		}
		}

		// get datos jugador
		[HttpPost]
		[Route("GetDatosJugador")]
		public string[] GetDatosJugador([FromBody] JsonElement content)
		{
		int IdJugador = int.Parse(content.ToString());
		string[] DatosJugador = { "", "", "", "" };
		var cs = _config.GetValue<string>("ConnectionStrings:Connection");

		using var con = new SqlConnection(cs);
		con.Open();

		DatosJugador[0] = con.Query<string>("SELECT nombre FROM jugador where id = " + IdJugador).First();
		DatosJugador[1] = con.Query<string>("SELECT estado FROM jugador where id = " + IdJugador).First();
		DatosJugador[2] = con.Query<string>("SELECT puntos FROM jugador where id = " + IdJugador).First();
		DatosJugador[3] = con.Query<string>("SELECT ronda_actual FROM juego;").First();

		con.Close();
		return DatosJugador;
		}

		// get puntos por ronda
		[HttpPost]
		[Route("GetPuntosRonda")]
		public List<Ronda> GetPuntosRonda([FromBody] JsonElement contents)
		{
		string content = contents.ToString();

		var cs = _config.GetValue<string>("ConnectionStrings:Connection");

		using var con = new SqlConnection(cs);
		con.Open();

		List<Ronda> rondas = con.Query<Ronda>("SELECT * FROM ronda ;".ToString()).ToList();

		con.Close();

		return rondas;
		}

		// Validar segun turno
		[HttpPost]
        [Route("Validar")]
        public string[] Validar([FromBody] JsonElement content)
        {
			string[] answer = { "" };
			answer[0] = "Imposible";
			int jugadorId = int.Parse(content.ToString());
            var cs = _config.GetValue<string>("ConnectionStrings:Connection");

            using var con = new SqlConnection(cs);
            con.Open();

            int ronda = con.Query<int>("SELECT ronda_actual FROM juego").First();
            List<Carta> cartas = con.Query<Carta>("SELECT * FROM carta WHERE estado = "+ jugadorId.ToString()).ToList();

            con.Close();
            
            cartas.ForEach(x => x.Letra = x.Letra.TrimEnd());
            cartas.ForEach(x => x.Casta = x.Casta.TrimEnd());
            cartas = cartas.OrderBy(x => x.Id).ToList();

            int puntaje = cartas.Sum(x => x.Puntos);
            
            var cartas_agrupadas_x_casta = cartas.GroupBy(x => x.Casta).OrderByDescending(y => y.Count()).Select(grp => grp.ToList()).ToList();
            string casta_dominante = cartas_agrupadas_x_casta[0][0].Casta;
            var cartas_restantes = cartas.Where(x => x.Casta != casta_dominante).ToList();
            int numero_castas = cartas_agrupadas_x_casta.Count;

            var cartas_agrupadas_x_letra = cartas.GroupBy(x => x.Letra).OrderByDescending(y => y.Count()).Select(grp => grp.ToList()).ToList();


            switch (ronda)
            {
                #region TT (6 CARTAS)
                case 1:
				if (cartas_agrupadas_x_letra.Count == 2)
				{
				answer[0] = Sumar_puntos(jugadorId, ronda, puntaje);
				break;
				}
				else
				{
				answer[0] = "No tiene dos ternas";
				break;
				}
                #endregion
                #region TE (7 CARTAS)
                case 2:
                    List<Carta> cartas_posible_escalera_TE = new();
                    if (cartas_agrupadas_x_letra[1].Count > 1){
		answer[0] = "No tiene una terna y una escalera";
		break;
		}
                        
                    if (cartas_agrupadas_x_letra[0].Count == 3)
                        cartas_posible_escalera_TE = cartas.Where(x => x.Letra != cartas_agrupadas_x_letra[0][0].Letra).ToList();
                    if (cartas_agrupadas_x_letra[0].Count == 4)
                    {
                        var carta_letra_repetida_casta_dominante = cartas_agrupadas_x_letra[0].Where(x => x.Casta == casta_dominante);
                        cartas_posible_escalera_TE = cartas.Where(x => x.Letra != cartas_agrupadas_x_letra[0][0].Letra).Concat(carta_letra_repetida_casta_dominante).ToList();
                    }
                    if (ValidarEscalera(cartas_posible_escalera_TE)){
		answer[0] = Sumar_puntos(jugadorId, ronda, puntaje);
		break;
		}
		answer[0] = "No tiene una terna y una escalera";
		break;
                #endregion
                #region EE (8 CARTAS)
                case 3:
                    if (ValidarDosEscaleras(cartas_agrupadas_x_casta, numero_castas)){
		answer[0] = Sumar_puntos(jugadorId, ronda, puntaje);
		break;
		}
                    else{
		answer[0] = "No tiene dos escaleras";
		break;
		}
                        
                #endregion
                #region TTT (9 CARTAS)
                case 4:
                    if (cartas_agrupadas_x_letra.Count == 3){
		answer[0] = Sumar_puntos(jugadorId, ronda, puntaje);
		break;
		}
                    else{
		answer[0] = "No tiene tres ternas";
		break;
		}          
                #endregion 
                #region TTE (10 CARTAS)
                case 5:
                    if (cartas_agrupadas_x_casta[0].Count < 4 || cartas_agrupadas_x_letra[2].Count >=3 || cartas_agrupadas_x_letra[1].Count < 3 || cartas_agrupadas_x_casta[1].Count >= 4){
		answer[0] = "No tiene dos ternas y una escalera";
		break;
		}   
                    List<Carta> cartas_posible_escalera_TTE = cartas_agrupadas_x_casta[0];
                    if (cartas_agrupadas_x_letra[0].Count == 3)
                        cartas_posible_escalera_TTE = cartas_posible_escalera_TTE.Except(cartas_agrupadas_x_letra[0]).ToList();
                    if (cartas_agrupadas_x_letra[1].Count == 3)
                        cartas_posible_escalera_TTE = cartas_posible_escalera_TTE.Except(cartas_agrupadas_x_letra[1]).ToList();
                    if(ValidarEscalera(cartas_posible_escalera_TTE)){
		answer[0] = Sumar_puntos(jugadorId, ronda, puntaje);
		break;
		}
		answer[0] = "No tiene dos ternas y una escalera";
		break;
                #endregion
                #region TEE (11 CARTAS)
                case 6:
                    if (cartas_agrupadas_x_casta[0].Count < 4 || cartas_agrupadas_x_letra[1].Count >= 3 || cartas_agrupadas_x_letra[0].Count < 3){
		answer[0] = "No tiene una terna y dos escaleras";
		break;
		}
                        
                    List<Carta> cartas_posible_escalera_TEE = new();

                    if (cartas_agrupadas_x_casta[0].Count>=8)
                        cartas_posible_escalera_TEE = cartas_agrupadas_x_casta[0];
                    else
                        cartas_posible_escalera_TEE = cartas_agrupadas_x_casta[0].Concat(cartas_agrupadas_x_casta[1]).ToList();

                    if (cartas_agrupadas_x_letra[0].Count == 3)
                        cartas_posible_escalera_TEE = cartas_posible_escalera_TEE.Except(cartas_agrupadas_x_letra[0]).ToList();
                    if (cartas_agrupadas_x_letra[0].Count == 4)
                    {
                        var carta_terna_dominante = cartas_agrupadas_x_letra[0].Where(x => x.Casta == casta_dominante).ToList();
                        cartas_posible_escalera_TEE = cartas_posible_escalera_TEE.Except(carta_terna_dominante).ToList();
                    }
                    var aux_cartas_posible_escalera_TEE = cartas_posible_escalera_TEE.GroupBy(x => x.Casta).OrderByDescending(y => y.Count()).Select(grp => grp.ToList()).ToList();
                    if (ValidarDosEscaleras(aux_cartas_posible_escalera_TEE, numero_castas)){
		answer[0] = Sumar_puntos(jugadorId, ronda, puntaje);
		break;
		}
		answer[0] = "No tiene una terna y dos escaleras";
		break;
                #endregion
                #region EEE (12 CARTAS)
                case 7:
                    if(numero_castas == 3)
                    {
                        if (ValidarEscalera(cartas_agrupadas_x_casta[0]) && ValidarEscalera(cartas_agrupadas_x_casta[1]) && ValidarEscalera(cartas_agrupadas_x_casta[2]))
                            Sumar_puntos(jugadorId, ronda, puntaje);
                    }
                    if(numero_castas == 2)
                    {
                        if (cartas_agrupadas_x_casta[0].Count == 8)
                        {
                            if (ValidarEscalera(cartas_agrupadas_x_casta[1]))
                            {
                                if (ValidarDosEscaleras(cartas_agrupadas_x_casta, numero_castas))
                                    Sumar_puntos(jugadorId, ronda, puntaje);
                            }
                        }
                    }
                    if(numero_castas == 1)
                    {
                        string carta_restante = valores_cartas.Except(cartas_agrupadas_x_casta[0].Select(x => x.Letra)).First();
                        if (cartas_precindibles.Contains(carta_restante))
                            Sumar_puntos(jugadorId, ronda, puntaje);
                    }
		answer[0] = "No tiene tres escaleras";
		break;
                #endregion

                default:
                    break;
            }
		return answer;
        }
    }
	public class Receiver
	{
		public string idJugador { get; set; }
		public string idCarta { get; set; }
	}
}
