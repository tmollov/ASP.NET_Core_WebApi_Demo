using System.Collections.Generic;
using System.Linq;
using Demo.Models;
using Demo.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Demo.WebApi.Controllers
{
    public class CitiesController : ApiController
    {
        private readonly ICityService cityService;

        public CitiesController(ICityService cityService)
        {
            this.cityService = cityService;
        }
        // GET api/cities
        [HttpGet]
        public ActionResult<IEnumerable<City>> Get()
        {
            return this.cityService.GetCities();
        }

        // GET api/cities/Sofia
        [HttpGet("{cityName}")]
        public ActionResult<City> Get(string cityName)
        {
            if (this.cityService.IsCityAvailable(cityName))
            {
                return this.cityService.GetCity(cityName);
            }
            return NotFound();
        }

        // POST api/cities
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesDefaultResponseType]
        public ActionResult<City> Post([FromBody] City model)
        {
            this.cityService.Add(model);
            return CreatedAtAction(nameof(Get), new { id = model.Name }, model);
        }

        // PUT api/cities/Sofia
        [HttpPut("{cityName}")]
        public ActionResult<City> Put(string cityName, [FromBody] City model)
        {
            return this.cityService.Update(cityName,model);
        }

        // DELETE api/cities/Sofia
        [HttpDelete("{cityName}")]
        public ActionResult<City> Delete(string cityName)
        {
            return this.cityService.Delete(cityName);
        }
    }
}
