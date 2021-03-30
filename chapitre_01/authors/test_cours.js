var express = require('express');
var app = express();
var port = 8000;

app.get('/country/:countryName/capital', function (req, res) {
    var country = req.params.countryName;
    var capitalCity = "";
    var continent = "";

    switch (country) {
        case "france":
            capitalCity = "Paris";
            continent = "Europe"
            break;

        case "spain":
            capitalCity = "Madrid";
            continent = "Europe"
            break;

        case "argentina":
            capitalCity = "Buenos Aires";
            continent = "America"
            break;

        default:
            capitalCity = "not found"
            continent = "none"
            break;
    }

    res.json({
        capital: capitalCity,
        continent: continent
    });
});


app.listen(port, function () {
    console.log('Serveur lancé et en écoute dans le port: ' + port);
});