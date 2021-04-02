var request = require("request");

function getCountries() {


    request.get(
        "https://localhost:8000/countries/all",
        // "https://restcountries.eu/rest/v1/all",

        function (err, res, body) {

            countriesNames = JSON.parse(body);

            var allCountries = countriesNames.map((elem) => elem.name);
            console.log(typeof allCountries);

            console.log(allCountries.join(" - "));

        })
}

console.log(getCountries());