const express = require('express');
const app = express();

const { superHeros } = require("./dataSuperHeros.js")


var cors = require('cors');
const { request } = require('express');
const port = 8000;

const debug = (req, rest, next) => {
    console.log("I received a request at ", new Date().toTimeString());
    next()
}

app.use(cors())

app.use(express.json()) // permet de recevoir body json dans les requetes

//
// // FONCTIONNE MAIS PAS LA BONNE SYNTHAXE
// app.use((req, res, next) => {
//     // const dataHero = req.body
//     //     console.log("dataHero c'est quoi? ", dataHero);

//     debug()
//     next();
// });
// //

// SOLUTION 
//
app.use(debug)
//


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

    const power = req.body.power

    const infoHero = superHeros.find(elem => {
        if (elem.name.toLowerCase() === nameHero.toLowerCase()) {
            return elem.power.push(power)
        }
    })

    res.json({
        message: "Pouvoir ajouté"
    })
});

app.delete('/heroes/:name', (req, res) => {

    console.log("voyons ce que j'affiche: ", req.params.name);

    const name = req.params.name


    // Fonctionne mais c'est pas le bon cheminement  

    // const infoHero = superHeros.find(elem => {
    //     if (elem.name.toLowerCase() === name.toLowerCase()) {
    //         return superHeros.pop(name)
    //     }
    // })

    const infoHero = superHeros.find(elem => {
        if (elem.name.toLowerCase() === name.toLowerCase()) {
            return name
        }
    })
    if (name) {
        superHeros.pop(name)
    }

    res.json({
        message: `le Heros ${name} a été surpprimé`
    })
})

app.put("/heroes", (req, res) => {

    const newHero = req.body

    superHeros.push(newHero)

    res.json({
        message: "Ok, hero ajouté"
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