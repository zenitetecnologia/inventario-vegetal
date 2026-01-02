namespace Zenite.IventarioVegetal.Server.Models
{
    public class ItemEstoque
    {
        public int Id { get; set; }
        public string Descricao { get; set; } 
        public decimal Quantidade { get; set; }
        public DateTime Data { get; set; }
        public bool Geladeira { get; set; }
    }
}