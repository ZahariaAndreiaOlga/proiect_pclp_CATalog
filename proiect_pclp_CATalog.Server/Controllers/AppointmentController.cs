using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using proiect_pclp_CATalog.Server.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace proiect_pclp_CATalog.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {

        private JsonDatabaseAlt<AppointmentModel> db;

        public AppointmentController()
        {
            this.db = new JsonDatabaseAlt<AppointmentModel>("/db/Cat_appointment_database.json");
        }

        // GET: api/<AppointmentController>
        [HttpGet]
        public IEnumerable<AppointmentModel> Get()
        {
            List<AppointmentModel> listAppointment = db.GetAllObj();

            return listAppointment;
        }

        // GET api/<AppointmentController>/5
        [HttpGet("{id}")]
        public AppointmentModel Get(int id)
        {
            AppointmentModel myAppointment = db.GetObjtById(id);

            return myAppointment;
        }

        // POST api/<AppointmentController>
        [HttpPost]
        public void Post([FromBody] AppointmentModel appointment)
        {
            db.PostByObjt(appointment);
        }

        // PUT api/<AppointmentController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] AppointmentModel appointment)
        {
            db.UpdateObj(appointment, id);
        }

        // DELETE api/<AppointmentController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            db.DeleteByObj(id);
        }
    }
}
