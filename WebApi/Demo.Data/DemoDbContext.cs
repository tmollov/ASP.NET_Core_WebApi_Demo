using Demo.Models;
using Microsoft.EntityFrameworkCore;

namespace Demo.Data
{
    public class DemoDbContext : DbContext
    {
        public DemoDbContext()
        {

        }
        public DemoDbContext(DbContextOptions options) :
            base(options)
        {

        }

        public DbSet<City> Cities { get; set; }

        //public DbSet<Country> Countries { get; set; }
    }
}