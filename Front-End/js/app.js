var domain = "https://localhost:5001/";
var endpoint = "api/cities";
$("#addCityBtn").click((event) => {
    AddCity(event);
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

//Notifications
let loadingBox = $("#loadingBox");
let infoBox = $("#infoBox");
let errorBox = $("#errorBox");


// Bussiness logic
function GetCities() {
    tableBody.empty();
    $.get(domain + endpoint, function (cityData) {
        for (let i = 0; i < cityData.length; i++) {

            let cityId = cityData[i].cityId;
            let cityName = cityData[i].name;
            let cityPopulation = cityData[i].population;

            let row = $("<tr>");
            let th = $("<th>").attr("scope", "row").text(cityId);
            let tdCityName = $("<td>").text(cityName);
            let tdPopulation = $("<td>").text(cityPopulation);

            let deleteBtn = $("<button>").text("[Delete]").addClass("btn m-0").click(function (e) {
                $.ajax({
                    type: "DELETE",
                    url: domain + endpoint + `/${cityName}`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify(cityData[i]),
                    dataType: "json",
                    success: function () {
                        notifications.showInfo(`City ${cityName} deleted.`);
                    },
                    error: function () {
                        notifications.showError(`Cannot delete City ${cityName}.`);
                    },
                });
                console.log($(this).parent().remove());
            });

            row.append(th, tdCityName, tdPopulation, deleteBtn);
            tableBody.append(row);
        }
    });
}

function AddCity(event) {
    event.preventDefault();
    var inputs = addCityPage.find("form input").select(x => $(x).val());
    var city = {
        name: inputs[0].value,
        population: inputs[1].value
    };
    $.ajax({
        type: "POST",
        url: domain + endpoint,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(city),
        dataType: "json",
        success: function (data) {
            $(inputs[0]).val("");
            $(inputs[1]).val("");
            notifications.showInfo("City added.");
        },
        error: function () {
            notifications.showError("Cannot delete City " + city.name);
        },
    });
}

function ShowPages(home, addcity, allcities) {
    home === 1 ? homePage.attr("hidden", false).addClass("active") : homePage.attr("hidden", true).removeClass("active");
    addcity === 1 ? addCityPage.attr("hidden", false).addClass("active") : addCityPage.attr("hidden", true).removeClass("active");
    allcities === 1 ? showCitiesPage.attr("hidden", false).addClass("active") : showCitiesPage.attr("hidden", true).removeClass("active");
}

$(document).on({
    ajaxStart: function () {
        loadingBox.show();
    },
    ajaxStop: function () {
        loadingBox.hide();
    }
});