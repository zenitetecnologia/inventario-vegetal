using Microsoft.AspNetCore.Mvc;
using Zenite.InventarioVegetal.Server.Services;
using Zenite.IventarioVegetal.Server.Models;

namespace Zenite.IventarioVegetal.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemEstoqueController : ControllerBase
    {
        private readonly ItemEstoqueService _service;

        public ItemEstoqueController(ItemEstoqueService service)
        {
            _service = service;
        }

        //GET
        [HttpGet]
        public async Task<ActionResult<List<ItemEstoque>>> Get()
        {
            var Lista = await _service.ObterTodos();
            return Ok(Lista);
        }

        //POST
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] ItemEstoque item)
        {
            try
            {
                await _service.AdicionarItem(item);
                return CreatedAtAction(nameof(Get), new { id = item.Id }, item);
            }
            catch(ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //PUT
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] ItemEstoque item)
        {
            if (id != item.Id) return BadRequest("ID Inconsistente.");

            try
            {
                await _service.AtualizarItem(item);
                return NoContent();
            }
            catch(ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //DELETE
        [HttpDelete("{id}")]

        public async Task<ActionResult> Delete(int id)
        {
            await _service.ExcluirItem(id);
            return NoContent();
        }

    }
}
