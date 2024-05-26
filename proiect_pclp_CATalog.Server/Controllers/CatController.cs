using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using proiect_pclp_CATalog.Server.Model;
using proiect_pclp_CATalog.Server;
using System.Collections.Generic;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace proiect_pclp_CATalog.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatController : ControllerBase
    {
        private JsonDatabaseAlt<CatModel> db;
        private JsonDatabaseAlt<AppointmentModel> dbAppointment;
        public CatController()
        {
            this.db = new JsonDatabaseAlt<CatModel>("/db/Cat_database.json");
            this.dbAppointment = new JsonDatabaseAlt<AppointmentModel>("/db/Cat_appointment_database.json");
        }

        // GET: api/<CatController>
        [HttpGet]
        public IEnumerable<CatModel> Get()
        {
            List<CatModel> myCatList = db.GetAllObj();
            List<CatModel> unadoptedCat = myCatList.Where(cat => !cat.Adopted).ToList();

            return unadoptedCat;
        }

        // GET api/<CatController>/5
        [HttpGet("{id}")]
        public CatModel Get(int id)
        {

            CatModel myCat = db.GetObjtById(id);
            List<AppointmentModel> appointmentList = dbAppointment.GetAllObj();
            List<AppointmentModel> catAppointmentList = appointmentList.Where(appointment => appointment.IdCat == id).ToList();

            /*
            var data = new
            {
                id = myCat.Id,
                name = myCat.Name,
                breed = myCat.Breed,
                age = myCat.Age,
                sex = myCat.Sex,
                picture = myCat.Picture,
                vaccinationStatus = myCat.VaccinationStatus,
                personalityTraits = myCat.PersonalityTraits,
                adopted = myCat.Adopted,
                creationDate = myCat.creationDate,
                updatedDate = myCat.updatedDate,
                catAppointment = catAppointmentList
            };
            var json = JsonConvert.SerializeObject(data);
            return Ok(json);
            */
            myCat.Appointment = catAppointmentList;

            return myCat;
        }

        // POST api/<CatController>
        [HttpPost]
        //[Authorize(Roles = "Admin")]
        public void Post([FromBody] CatModel value)
        {
            if (value.Picture == "")
            {
                value.Picture = "https://youtooz.com/cdn/shop/products/nalathecat_photo_nologo_nh_square_02_1.jpg";
            }

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
