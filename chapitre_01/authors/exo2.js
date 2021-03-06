var express = require('express');
var app = express();
var port = 8000;

// EXERCICE 2

app.get('/authors/:id', (req, res) => {
    var authors = req.params.id;
    var name = "";
    var country = "";

    switch (authors) {

        case "1":
            res.send('Lawrence Nowell, UK');
            // name = "Lawrence Nowell";
            // country = "UK"
            break;

        case "2":
            res.send('William Shakespeare, UK');
            // name = "William Shakespeare";
            // country = "UK"
            break;

        case "3":
            res.send('Charles Dickens, US');
            // name = "Charles Dickens";
            // country = "US"
            break;

        case "4":
            res.send('Oscar Wilde, UK');
            // name = "Oscar Wilde";
            // country = "UK"
            break;

        default:
            res.send('not found, none');
            // name = "not found"
            // country = "none"
            break;
    }

    // res.json({
    //     name: name,
    //     country: country,
    // });
});

app.listen(port, function () {
    console.log('Serveur lancé et en écoute dans le port: ' + port);
});

