const express = require('express');
const cors = require("cors")
const  countries  = require("./dataCountries.js")
const app = express();

app.use(cors())
const port = 8000;

app.get("/countries", function (req, res) {

    // console.log("countries1", countries)

    res.json({ 
        countries
    })  
    // console.log("countries2", countries);
})

app.get("/countries/:name",function (req,res) {

    let oneCountry = req.params.name.toUpperCase()
    
    console.log(oneCountry);

    const arrayCountry=[]

    for (let i=0;i<countries.length;i++){

        const currentCountry = countries[i]

        if(oneCountry===currentCountry.name.toUpperCase()){
          arrayCountry.push(currentCountry)
    }
   }
     res.json({arrayCountry})

})


app.listen(port, function () {
    console.log('Serveur lancé et en écoute dans le port: ' + port);
});
