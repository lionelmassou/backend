const express = require('express');
const cors = require("cors")
const  countries  = require("./dataCountries.js")
const app = express();

app.use(cors())
const port = 8000;

app.get("/countries", function (req, res) {

    console.log("countries", countries)

    res.json({
        countries
    })

  
})

app.listen(port, function () {
    console.log('Serveur lancé et en écoute dans le port: ' + port);
});
