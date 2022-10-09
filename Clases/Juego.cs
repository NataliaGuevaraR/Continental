namespace Project2.Clases
{
    public class Juego
    {
        public string RondaActual { get; set; }
        public List<Ronda> Rondas { get; set; }
    }

    public class Ronda
    {
        public int NumeroRonda { get; set; }
        public int PuntosJugador1 { get; set; }
        public int PuntosJugador2 { get; set; }
    }
}
