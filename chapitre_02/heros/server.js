const express = require('express');
const app = express();

const { superHeros } = require("./dataSuperHeros.js")


var cors = require('cors');
const { request } = require('express');
const port = 8000;

const debug = (req, rest, next) => {
    console.log("I received a request at ", new Date().toTimeString());
}

app.use(cors())

app.use(express.json()) // permet de recevoir body json dans les requetes

app.use((req, res, next) => {
    // const dataHero = req.body
    //     console.log("dataHero c'est quoi? ", dataHero);

    debug()
    next();
});

const transformName = (req, res, next) => {

    if (req.body.name) {
        req.body.name = req.body.name.toLowerCase()
    }
    next()
}

app.get('/heroes', (req, res) => {

    res.json({
        superHeros
    });
    // console.log(" array de superHeros", superHeros);
});

app.get("/heroes/:name", (req, res) => {

    const name = (req.params.name)

    console.log("name of the hero ", name)

    const infoHero = superHeros.find(elem => {
        return elem.name.toLowerCase() === name.toLowerCase()
    })

    res.json({
        // infoHero : infoHero
        infoHero
    });
})

app.get("/heroes/:name/powers", (req, res) => {

    const name = (req.params.name)

    const infoHero = superHeros.find(elem => {
        return elem.name.toLowerCase() === name.toLowerCase()
    })


    res.json({

        powerHero: infoHero.power
    });
})

app.post("/heroes", transformName, (req, res) => {

    const newHero = req.body
    
        superHeros.push(newHero)

    res.json({
        message: "Ok, hero ajouté"
    })
});

app.post("/heroes/:name/powers", (req, res) => {

    const nameHero = req.params.name
    const powers = req.body

    const infoHero = superHeros.find(elem => {
        if (elem.name.toLowerCase() === nameHero.toLowerCase()) {
            return elem.name.push(powers)
        }
    })

    superHeros.push(newHero)

    res.json({
        message: "Pouvoir ajouté"
    })
});


app.get('*', (req, res) => {
    res.json({
        errorMessage: "The route doesn't exist :'("
    })
})


app.listen(port, () => {
    console.log('Server started on port: ' + port);
});