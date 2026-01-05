using System;
using System.Collections.Generic;
using System.Text;

namespace Zenite.IventarioVegetal.Server.Entities
{
   
        public class Produto
        {
            public int Id { get; set; } 
            public string Nome { get; set; } = string.Empty;
            public decimal Preco { get; set; } 
        }
    
}
