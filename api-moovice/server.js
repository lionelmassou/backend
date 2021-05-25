var express = require('express');
var port = 8000;
var app = express();

const popularMovies = require("./dataPopular.js")
const weeklyMovies = require("./dataWeekly.js")


var cors = require('cors')
app.use(cors())

app.get('/', (req, res) => {
    res.send("My HomePage");
});

app.get('/Weekly', (req, res) => {
    res.json({
        weeklyMovies
    })
    console.log("weeklyMovies", weeklyMovies);
});

app.get('/WeeklyBattle', (req, res) => {
    res.json({
        weeklyMovies
    })
});

app.get('/Popular', (req, res) => {
    res.json({
        popularMovies
    })
    console.log("popularMovies", popularMovies);
});

app.get('/PopularBattle', function (req, res) {
    res.json({
        popularMovies
    })
});

app.get('/Favorites/:id', (req, res) => {

    url = "http://api.themoviedb.org/3/movie/${id}?api_key=e441f8a3a151d588a4932d2c5d310769"

    let id = req.params.id;

    res.json({
        // message: `Hello ${id}!`,
    });
});


app.listen(port, () => {
    console.log('Server started on port: ' + port);
});