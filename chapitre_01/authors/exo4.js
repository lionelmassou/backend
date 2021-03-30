var express = require('express');
var app = express();
var port = 8000;

// EXERCICE 4

app.get('/authors/:id', (req, res) => {
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
            books = "not found"
            break;
    }

    res.json({
        books: books,
    });
});

app.get('/authors/:id/books/', (req, res) => {
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
            books = "not found"
            break;
    }

    res.json({
        books: books,
    });
});

app.listen(port, function () {
    console.log('Serveur lancé et en écoute dans le port: ' + port);
});

