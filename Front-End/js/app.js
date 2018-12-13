var domain = "https://localhost:5001/";
var endpoint = "api/cities";
$("#addCityBtn").click((event) => {
    AddCity(event)
});
$("#GetAllCities").click(GetCities);
//containers
var homePage = $("#HomePage");
var addCityPage = $("#AddCityPage");
var showCitiesPage = $("#ShowAllCitiesPage");
var tableBody = $("#tableBody");


// navbar
var homeLink = $("#homeLink").click(() => {
    ShowPages(1, 0, 0);
});
var addCityLink = $("#addCityLink").click(() => {
    ShowPages(0, 1, 0);
});
var showCitiesLink = $("#showCitiesLink")
    .click(function () {
        ShowPages(0, 0, 1);
    });


function GetCities() {
    tableBody.empty();
    $.get(domain + endpoint, function (data) {

        for (var i = 0; i < data.length; i++) {
            var th = $("<th>").attr("scope", "row").text(i);
            var tdCountryName = $("<td>").text(data[i].country);
            var tdCityName = $("<td>").text(data[i].name);
            var tdPopulation = $("<td>").text(data[i].population);

            tableBody.append($("<tr>").append(th, tdCountryName, tdCityName, tdPopulation));
        }
    });
}

function AddCity(event) {
    event.preventDefault();
    var inputs = addCityPage.find("form input").select(x => $(x).val());
    var city = {
        name: inputs[0].value,
        country: inputs[1].value,
        population: inputs[2].value
    };
    $.ajax({
        type: "POST",
        url: domain + endpoint,
        headers: { 
            'Content-Type': 'application/json' 
        },
        data: JSON.stringify(city),
        dataType:"json",
        success: function(data){
            console.log("City Added");
        },
        error: function(){
            console.log("post city Failed");
        },
    });
    //$.post(domain + endpoint,city,function (data) {
    //    console.log(data);
    //});
}

function ShowPages(home, addcity, allcities) {
    home === 1 ? homePage.attr("hidden", false).addClass("active") : homePage.attr("hidden", true).removeClass("active");
    addcity === 1 ? addCityPage.attr("hidden", false).addClass("active") : addCityPage.attr("hidden", true).removeClass("active");
    allcities === 1 ? showCitiesPage.attr("hidden", false).addClass("active") : showCitiesPage.attr("hidden", true).removeClass("active");
}