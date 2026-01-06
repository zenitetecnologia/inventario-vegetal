using Microsoft.EntityFrameworkCore;
using Zenite.IventarioVegetal.Server.Configuration;
using Zenite.IventarioVegetal.Server.Models;

namespace Zenite.IventarioVegetal.Server.Repositories
{
    public class ItemEstoqueRepository
    {
        private readonly ApplicationDbContext _context;

        public ItemEstoqueRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        //ADICIONAR
        public async Task AdicionarAsync(ItemEstoque item)
        {
            await _context.ItensEstoque.AddAsync(item);
            await _context.SaveChangesAsync();
        }

        //LISTAR TODOS
        public async Task<List<ItemEstoque>> ListarTodosAsync()
        {
            return await _context.ItensEstoque.ToListAsync();
        }

        //ATUALIZAR (BOTÃO DE LAPIS)
        public async Task AtualizarAsync(ItemEstoque item)
        {
            _context.ItensEstoque.Update(item);
            await _context.SaveChangesAsync();
        }

        //EXCLUIR
        public async Task ExcluirAsync(int id)
        {
            var item = await _context.ItensEstoque.FindAsync(id);
            if (item != null)
            {
                _context.ItensEstoque.Remove(item);
                await _context.SaveChangesAsync();
            }
        }
    }
}
