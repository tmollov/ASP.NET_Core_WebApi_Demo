using System.ComponentModel.DataAnnotations;

namespace Demo.Models
{
    public class City
    {
        public City()
        {

        }
        public City(string name, long population)
        {
            this.Name = name;
            this.Population = population;
        }


        public int CityId { get; set; }

        [Required]
        [MinLength(4)]
        public string Name { get; set; }

        [Required]
        [Range(1, long.MaxValue)]
        public long Population { get; set; }
    }
}
