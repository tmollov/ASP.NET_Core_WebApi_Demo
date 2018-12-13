using System.Collections.Generic;
using System.Linq;
using Demo.Data;
using Demo.Models;
using Demo.Services.Interfaces;

namespace Demo.Services
{
    public class CityService : ICityService
    {
        private readonly DemoDbContext context;

        public CityService(DemoDbContext context)
        {
            this.context = context;
        }

        public City Add(City city)
        {
            this.context.Cities.Add(city);
            this.context.SaveChanges();
            return this.context.Cities.FirstOrDefault(x => x.Name == city.Name);
        }

        public List<City> GetCities()
        {
            return this.context.Cities.ToList();
        }

        public City GetCity(string CityName)
        {
            return this.context.Cities.FirstOrDefault(x => x.Name == CityName);
        }

        public bool IsCityAvailable(string CityName)
        {
            return this.context.Cities.Any(x => x.Name == CityName);
        }

        public City Update(string CityName, City cityInfo)
        {
            if (this.IsCityAvailable(CityName))
            {
                var city = this.context.Cities.FirstOrDefault(x => x.Name == CityName);
                city = cityInfo;
                this.context.Cities.Update(city);
                this.context.SaveChanges();
                return city;
            }

            return cityInfo;
        }

        public City Delete(string CityName)
        {
            City cityToDelete = null;
            if (this.IsCityAvailable(CityName))
            {
                cityToDelete = this.context.Cities.FirstOrDefault(x => x.Name == CityName);
                this.context.Cities.Remove(cityToDelete);
                this.context.SaveChanges();
            }

            return cityToDelete;
        }
    }
}
