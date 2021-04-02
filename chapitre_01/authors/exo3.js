var express = require('express');
var app = express();
var port = 8000;

// EXERCICE 3

app.get('/authors/:number/books/', (req, res) => {
    var authors = req.params.number;
    var books = "";
    
    switch (authors) {

        case "1":
            res.send("Beowulf");
            // books = "Beowulf";
            break;

        case "2":
            res.send("Hamlet, Othello, Romeo and Juliet, MacBeth");
            // books = "Hamlet, Othello, Romeo and Juliet, MacBeth";
            break;

        case "3":
            res.send("Oliver Twist, A Christmas Carol");
            // books = "Oliver Twist, A Christmas Carol";
            break;

        case "4":
            res.send("The Picture of Dorian Gray, The Importance of Being Earnest");
            // books = "The Picture of Dorian Gray, The Importance of Being Earnest";
            break;

        default:
            res.send("not found");
            // books = "not found"
            break;
    }

    // res.json({
    //     books: books,
    // });
});

app.listen(port, function () {
    console.log('Serveur lancé et en écoute dans le port: ' + port);
});

