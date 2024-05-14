using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using proiect_pclp_CATalog.Server.Model;
using proiect_pclp_CATalog.Server;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace proiect_pclp_CATalog.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = "Admin")] 
    public class UserController : ControllerBase
    {
        private JsonDatabaseAlt<UserModel> db;
        public UserController()
        {
            this.db = new JsonDatabaseAlt<UserModel>("/db/User_database.json");
        }

        // GET: api/<UserController>
        [HttpGet]
        public IEnumerable<UserModelDto> Get()
        {
            List<UserModel> myUserList = db.GetAllObj();
            return myUserList.Select(u => new UserModelDto
            {
                Id = u.Id,
                Login = u.Login,
                ShelterName = u.ShelterName,
                Role = u.Role
            });
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public UserModelDto Get(int id)
        {
            UserModel myUser = db.GetObjtById(id);

            return new UserModelDto
            {
                Id = id,
                Login = myUser.Login,
                ShelterName = myUser.ShelterName,
                Role = myUser.Role
            };
        }

        // POST api/<UserController>
        [HttpPost]
        public void Post([FromBody] UserModel value)
        {
            // Changing the pass

            string passwordHash = BCrypt.Net.BCrypt.EnhancedHashPassword(value.Password, 13);
            value.Password = passwordHash;
            db.PostByObjt(value);

        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] UserModel value)
        {
            // Changing the pass

            if (value.Password != null)
            {
                string passwordHash = BCrypt.Net.BCrypt.EnhancedHashPassword(value.Password, 13);
                value.Password = passwordHash;
            }
            db.UpdateObj(value, id);

        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            db.DeleteByObj(id);
        }
    }
}
