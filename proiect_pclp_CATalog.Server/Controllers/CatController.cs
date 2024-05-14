using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using proiect_pclp_CATalog.Server.Model;
using proiect_pclp_CATalog.Server;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace proiect_pclp_CATalog.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatController : ControllerBase
    {
        private JsonDatabaseAlt<CatModel> db;
        public CatController()
        {
            this.db = new JsonDatabaseAlt<CatModel>("/db/Cat_database.json");
        }

        // GET: api/<CatController>
        [HttpGet]
        public IEnumerable<CatModel> Get()
        {
            List<CatModel> myCatList = db.GetAllObj();

            return myCatList;
        }

        // GET api/<CatController>/5
        [HttpGet("{id}")]
        public CatModel Get(int id)
        {

            CatModel myCatList = db.GetObjtById(id);

            return myCatList;
        }

        // POST api/<CatController>
        [HttpPost]
        //[Authorize(Roles = "Admin")]
        public void Post([FromBody] CatModel value)
        {
            db.PostByObjt(value);
        }

        // PUT api/<CatController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] CatModel value)
        {
            db.UpdateObj(value, id);
        }

        // DELETE api/<CatController>/5
        [HttpDelete("{id}")]
       // [Authorize(Roles = "Admin")]
        public void Delete(int id)
        {
            db.DeleteByObj(id);
        }
    }
}
