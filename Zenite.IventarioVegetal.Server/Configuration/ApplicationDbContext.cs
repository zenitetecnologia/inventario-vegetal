using Microsoft.EntityFrameworkCore;
using Zenite.IventarioVegetal.Server.Models;

namespace Zenite.IventarioVegetal.Server.Configuration
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<ItemEstoque> Estoque { get; set; }
    }
}