using System.Collections.Generic;
using System.IO;
using System.Linq;
using Demo.Data;
using Demo.Models;
using Demo.Services;
using Demo.Services.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;

namespace Demo.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddCors();
            services.AddScoped<ICityService,CityService>();

            services.AddDbContext<DemoDbContext>(options =>
            {
                options.UseInMemoryDatabase();
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                // If you want to seed some data to you DbContext
                //using (var scope = app.ApplicationServices.CreateScope())
                //{
                //    var dbContext = scope.ServiceProvider.GetService<DemoDbContext>();
                //    SeedSampleDataToDb(dbContext);
                //}

                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseCors(builder =>
            {
                builder.AllowAnyOrigin();
                builder.AllowAnyHeader();
                builder.AllowAnyMethod();
            });

            app.UseHttpsRedirection();
            app.UseMvc();
        }

        
        //public static void SeedSampleDataToDb(DemoDbContext context)
        //{
        //    var countriesjson = File.ReadAllText("countries.json");
        //    var countries = JsonConvert.DeserializeObject<Country[]>(countriesjson);
        //
        //    context.Countries.AddRange(countries);
        //    context.SaveChanges();
        //    
        //    context.Cities.Add(new City("Sofia",context.Countries.FirstOrDefault(x=>x.Name=="Bulgaria"),1000000));
        //    context.SaveChanges();
        //}
    }
}
