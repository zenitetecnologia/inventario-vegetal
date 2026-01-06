using Microsoft.EntityFrameworkCore;
using Zenite.IventarioVegetal.Server.Configuration;
using Zenite.IventarioVegetal.Server.Repositories;
using Zenite.InventarioVegetal.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Configuração do Banco de Dados
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

//  programa a cria o Repository e o Service
builder.Services.AddScoped<ItemEstoqueRepository>();
builder.Services.AddScoped<ItemEstoqueService>();
// -----------------------------------------------------

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();