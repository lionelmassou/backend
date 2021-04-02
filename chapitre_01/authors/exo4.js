var express = require('express');
var app = express();
var port = 8000;

// EXERCICE 4

app.get('/authors/:id', (req, res) => {
    var authors = req.params.id;
    var name = "";
    var nationality = "";

    switch (authors) {

        case "1":
            name = "Lawrence Nowell";
            nationality = "UK";
            break;

        case "2":
            name = "William Shakespeare";
            nationality = "UK";
            break;

        case "3":
            name = "Charles Dickens";
            nationality = "US";
            break;

        case "4":
            name = "Oscar Wilde";
            nationality = "UK";
            break;

        default:
            name = "not found";
            nationality = "none";
            break;
    }

    res.json({
        name: name,
        nationality: nationality,
    });
});


app.get('/authors/:number/books/', (req, res) => {
    var authors = req.params.number;
    var books = "";

    switch (authors) {

        case "1":
            books = "Beowulf";
            break;

        case "2":
            books = "Hamlet, Othello, Romeo and Juliet, MacBeth";
            break;

        case "3":
            books = "Oliver Twist, A Christmas Carol";
            break;

        case "4":
            books = "The Picture of Dorian Gray, The Importance of Being Earnest";
            break;

        default:
            books = "not found";
            break;
    }

    res.json({
        books: [books],
    });
});

app.listen(port, function () {
    console.log('Serveur lancé et en écoute dans le port: ' + port);
});
