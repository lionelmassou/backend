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

    if (req.body.name = undefined) {
        res.json({
            errorMessage: "to add a hero, send at least his name"
        })
    } else {
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

    if (name) {
        res.json({
            // infoHero : infoHero
            infoHero
        });
    } else {
        res.json({
            message: "error tu t'es loupé quelque part"
        })
    }
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
        return elem.name.toLowerCase() === nameHero.toLowerCase()
    })

    if (nameHero) {
        infoHero.power.push(power)
        res.json({
            message: "Pouvoir ajouté"
        })
    } else {
        res.json({
            message: "error tu t'es loupé quelque part"
        })
    }
});

app.delete('/heroes/:name', (req, res) => {

    // console.log("voyons ce que j'affiche: ", req.params.name);

    const name = req.params.name
    // let id = 0

    const infoHero = superHeros.find((elem, id) => {
        if (elem.name.toLowerCase() === name.toLowerCase()) {
            return id
        }
    })

    console.log("id: ", infoHero);

    if (name) {
        superHeros.slice(infoHero, 1)
        res.json({
            message: `le Heros ${name} a été surpprimé`
        })
    } else {
        res.json({
            message: `le Heros ${name} n'est pas dans la liste`
        })
    }

})

app.delete("/heroes/:name/power/:power", (req, res) => {

    const name = req.params.name
    const power = req.params.power

    const infoHero = superHeros.find(elem => {
        if (elem.name.toLowerCase() === name.toLowerCase()) {
            return elem.power === power

        } else {
            res.json({
                message: "the power doesn't exist"
            })
        }
    })
    if (power) {
        //ici on doit supprimer un pouvoir spécifique
        res.json({
            message: `le pouvoir ${power} a bien été retiré du héros ${name}`
        })
    }

})

app.put("/heroes/:name", (req, res) => {

    const name = req.params.name
    const changeHero = req.body

    const infoHero = superHeros.find(elem => {
        if (elem.name.toLowerCase() === name.toLowerCase()) {
            return name
        }
    })

    if (name) {
        infoHero.name = changeHero.name
        res.json({
            message: `le nom de ${name} a été modifié par ${changeHero.name}`
        })
    } else {
        res.json({
            message: `le Heros ${name} n'est pas dans la liste`
        })
    }
});

app.get('*', (req, res) => {
    res.json({
        errorMessage: "The route doesn't exist :'("
    })
})


app.listen(port, () => {
    console.log('Server started on port: ' + port);
});