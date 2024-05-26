using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using proiect_pclp_CATalog.Server.Model;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace proiect_pclp_CATalog.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignupController : ControllerBase
    {

        private IConfiguration _configuration;
        private JsonDatabaseAlt<UserModel> db;

        public SignupController(IConfiguration configuration)
        {
            this._configuration = configuration;
            this.db = this.db = new JsonDatabaseAlt<UserModel>("/db/User_database.json");
        }



        // POST api/<SignupController>
        [HttpPost]
        public IActionResult Post([FromBody] UserLoginModel userLoginModel)
        {

            UserModel user = new UserModel();

            user.Login = userLoginModel.Login;

            string passwordHash = BCrypt.Net.BCrypt.EnhancedHashPassword(userLoginModel.Password, 13);
            user.Password = passwordHash;

            user.ShelterName = "null";
            user.Role = "User";

            UserModel u = db.GetElementByItem(user, "Login");

            if (u == null)
            {
                db.PostByObjt(user);

                

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
                new Claim(ClaimTypes.Sid, user.Id.ToString()),
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
