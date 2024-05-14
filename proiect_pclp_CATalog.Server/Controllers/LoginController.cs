using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using proiect_pclp_CATalog.Server.Model;
using proiect_pclp_CATalog.Server;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace proiect_pclp_CATalog.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {

        private IConfiguration _configuration;
        private JsonDatabaseAlt<UserModel> db;

        public LoginController(IConfiguration configuration)
        {
            this._configuration = configuration;
            this.db = new JsonDatabaseAlt<UserModel>("/db/User_database.json");
        }

        // POST: api/<LoginController>
        [HttpPost]
        [AllowAnonymous]
        public IActionResult Login([FromBody] UserLoginModel userLoginModel)
        {



            UserModel user = Authenticate(userLoginModel);

            if (user != null)
            {
                string token = Generate(user);
                var data = new
                {
                    token = token
                };
                var json = JsonConvert.SerializeObject(data);
                return Ok(json);
            }

            return NotFound();
        }

        private UserModel Authenticate(UserLoginModel userLoginModel)
        {

            // Changing the pass
            UserModel user = db.CheckLoginPass(userLoginModel);

            if (user != null)
            {
                return user;
            }

            return null;
        }

        private string Generate(UserModel user)
        {
            SymmetricSecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this._configuration["Jwt:Key"]));
            SigningCredentials credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Email, user.Login),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var token = new JwtSecurityToken(
                this._configuration["Jwt:Issuer"],
                this._configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
