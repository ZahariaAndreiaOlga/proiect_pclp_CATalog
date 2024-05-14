using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// JWT (Json Web Token)
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Repertory Configuration
string path = Directory.GetCurrentDirectory() + "/db"; // Folder
string pathCat = path + "/Cat_database.json"; // Cat File
string pathUser = path + "/User_database.json"; // User File

if (!File.Exists(pathCat) || !File.Exists(pathUser)) //db (database-creaza fisierele)
{
    try
    {
        if (!Directory.Exists(path))
        {
            Directory.CreateDirectory(path);
        }

        if (!File.Exists(pathCat))
        {
            StreamWriter writeCat = new StreamWriter(path + "/Cat_database.json");
            writeCat.WriteLine("[]");
            writeCat.Close();
        }

        if (!File.Exists(pathUser))
        {
            StreamWriter writeUser = new StreamWriter(path + "/User_database.json");
            writeUser.WriteLine("[]");
            writeUser.Close();
        }
    }
    catch (Exception e)
    {
        Console.WriteLine("Exception: " + e.Message);
    }
    finally
    {
        Console.WriteLine("Files creations succeded");
    }
}

app.UseHttpsRedirection();

app.UseCors(options => //Deschide API-ul ca public, aceeasi chestie ca la tipurile de data private,public samd
{
    options.AllowAnyHeader();
    options.AllowAnyMethod();
    options.AllowAnyOrigin();
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
