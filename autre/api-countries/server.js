var express = require('express');
var port = 8000;
var app = express();

var randomCountry = require('random-country');

var cors = require('cors')
app.use(cors())

var countryRandom = randomCountry({ full: true });

// app.get("/countries", (req, res) => {
//   res.json(["France", "Argentine", "Bresil", "Cameroun", "Espagne"]);
// });

app.get("/countries", (req, res) => {
  var arrayCountry = [];

  for (var i = 0; i < 6; i++) {
    arrayCountry.push(countryRandom);
    countryRandom = randomCountry({ full: true });
  }
  res.json(arrayCountry);
});

app.listen(port, () => {
    console.log('Server started on port: ' + port);
  });