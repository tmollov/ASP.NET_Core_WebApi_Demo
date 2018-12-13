using System.Collections.Generic;
using Demo.Models;

namespace Demo.Services.Interfaces
{
    public interface ICityService
    {
        City Add(City city);
        List<City> GetCities();
        City GetCity(string CityName);
        bool IsCityAvailable(string CityName);
        City Update(string CityName, City cityInfo);
        City Delete(string CityName);
    }
}
