using Zenite.IventarioVegetal.Server.Models;
using Zenite.IventarioVegetal.Server.Repositories;

namespace Zenite.InventarioVegetal.Server.Services
{
    public class ItemEstoqueService
    {
        private readonly ItemEstoqueRepository _repository;

        public ItemEstoqueService(ItemEstoqueRepository repository)
        {
            _repository = repository;
        }

        public async Task AdicionarItem(ItemEstoque item)
        {
            ValidarItem(item);
            await _repository.AdicionarAsync(item);
        }

        public async Task<List<ItemEstoque>> ObterTodos()
        {
            return await _repository.ListarTodosAsync();
        }

        public async Task AtualizarItem(ItemEstoque item)
        {
            ValidarItem(item);
            await _repository.AtualizarAsync(item);
        }

        public async Task ExcluirItem(int id)
        {
            await _repository.ExcluirAsync(id);
        }

        private void ValidarItem(ItemEstoque item)
        {
            if (string.IsNullOrWhiteSpace(item.Descricao))
                throw new ArgumentException("A descrição do item é obrigatória.");

            if (item.Quantidade < 0)
                throw new ArgumentException("A quantidade não pode ser menor que zero.");

            if (item.Data == DateTime.MinValue)
                throw new ArgumentException("A data informada é inválida.");
        }
    }
}