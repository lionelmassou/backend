var express = require('express');
var app = express();
var port = 8000;

// EXERCICE 4


var authors = "";
var books = "";

var allInfo = [
    {
        authors: "Lawrence Nowell , UK",
        books: "Beowulf",
    },
    {
        authors: "William Shakespeare , UK",
        books: "Hamlet, Othello, Romeo and Juliet, MacBeth",
    },
    {
        authors: "Charles Dickens , US",
        books: "Oliver Twist, A Christmas Carol",
    },
    {
        authors: "Oscar Wilde , UK",
        books: "The Picture of Dorian Gray, The Importance of Being Earnest",
    },
    {
        authors: "not found",
        books: "not found",
    },

];

// res.json({
//     authors = authors,
//     books: books,
// });


app.get('/authors/:id/', (req, res) => {

    var

    app.listen(port, function () {
        console.log('Serveur lancé et en écoute dans le port: ' + port);
    });

