$("#cityNameInput")
    .attr("data-validation", "length alphanumeric")
    .attr("data-validation-length", "3-30")
    .attr("data-validation-error-msg", "City name should contain 3-30 alphanumeric characters.");

$("#populationInput")
    .attr("data-validation", "length")
    .attr("data-validation-length", "min1")
    .attr("data-validation-error-msg", "The population should positive number.");

$.validate({
    modules: 'security'
});