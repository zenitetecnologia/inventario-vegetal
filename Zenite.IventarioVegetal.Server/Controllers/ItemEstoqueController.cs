using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Zenite.IventarioVegetal.Server.Configuration;
using Zenite.IventarioVegetal.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Zenite.IventarioVegetal.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemEstoqueController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ItemEstoqueController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var lista = await _context.Estoque.ToListAsync();
            return Ok(lista);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ItemEstoque item)
        {
            _context.Estoque.Add(item);
            await _context.SaveChangesAsync();
            return Ok(item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] ItemEstoque item)
        {
            var existente = await _context.Estoque.FindAsync(id);
            if (existente == null) return NotFound();

            existente.Descricao = item.Descricao;
            existente.Quantidade = item.Quantidade;
            existente.Data = item.Data;
            existente.Geladeira = item.Geladeira;

            await _context.SaveChangesAsync();
            return Ok(existente);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.Estoque.FindAsync(id);
            if (item == null) return NotFound();

            _context.Estoque.Remove(item);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}