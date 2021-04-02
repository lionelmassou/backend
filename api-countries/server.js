var express = require('express');
var port = 8000;
var app = express();

var cors = require('cors')
app.use(cors())


app.get("/countries", (req, res) => {
  res.json(["France", "Argentine", "Bresil", "Cameroun", "Espagne"]);
});

app.listen(port, () => {
    console.log('Server started on port: ' + port);
  });