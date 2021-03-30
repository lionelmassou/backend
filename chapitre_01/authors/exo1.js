var express = require('express');
// EXERCICE 1

var port = 8000;
var app = express();


app.get('/', (req, res) => {
  res.send('Authors API');
});


app.listen(port, () => {
    console.log('Server started on port: ' + port);
  });