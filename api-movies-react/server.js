const express = require('express');
const cors = require("cors")
const  movies  = require("./dataMovies.js")
const app = express();

app.use(cors())
const port = 8000;

app.get("/", function (req, res) {

    // console.log("movies1", movies)

    res.json({ 
        movies
    })  
    // console.log("movies2", movies);
})  

app.get("/:title",function (req,res) {

    let oneMovie = req.params.title.toUpperCase()
    
    console.log(oneMovie);

    const arrayMovie=[]

    for (let i=0;i<movies.length;i++){

        const currentMovie = movies[i]

        if(oneMovie===currentMovie.title.toUpperCase()){
            arrayMovie.push(currentMovie)
    }
   }
     res.json({arrayMovie})

})


app.listen(port, function () {
    console.log('Serveur lancé et en écoute dans le port: ' + port);
});
