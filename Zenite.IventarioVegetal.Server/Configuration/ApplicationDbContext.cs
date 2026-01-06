using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Zenite.IventarioVegetal.Server.Models;

namespace Zenite.IventarioVegetal.Server.Configuration
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<ItemEstoque> ItensEstoque { get; set; }
        }
}
