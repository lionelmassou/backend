const express = require('express');
const app = express();

let { superHeros } = require("./dataSuperHeros.js")

var cors = require('cors');
const { request } = require('express');
const port = 8000;

const debug = (req, rest, next) => {
    console.log("I received a request at ", new Date().toTimeString());
    next()
}

app.use(cors())

app.use(express.json()) // permet de recevoir body json dans les requetes

app.use(debug)

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

    const infoHero = superHeros.find(elem => {
        return elem.name.toLowerCase() === nameHero.toLowerCase()
    })

    if (infoHero) {
        res.json({
            errorMessage: "the hero is already in the list"
        })
    } else {
        superHeros.push(newHero)

        res.json({
            message: "Ok, hero ajouté"
        })
    }
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

app.delete('/heroes/:name', (req, res, next) => {

    const name = req.params.name

    const infoHero = superHeros.find(elem => {
        return elem.name.toLowerCase() === name.toLowerCase()
    })

    if (infoHero) {
        next()
    } else {
        res.json({
            errorMessage: "the hero is not in the list"
        })
    }
}, (req, res) => {
    const name = req.params.name

    // METHODE AVEC FILTER//

    // const newSuperHeros = superHeros.filter(elem => {
    //     return elem.name.toLocaleLowerCase() !== name.toLocaleLowerCase()
    // })

    // superHeros = newSuperHeros

    // ou 

    // superHeros = superHeros.filter(elem => {
    //     return elem.name.toLocaleLowerCase() !== name.toLocaleLowerCase()
    // })

    // METHODE AVEC SPLICE//

    // const newSuperHeros = superHeros.find((elem,index) => {
    //     return elem.name.toLocaleLowerCase() !== name.toLocaleLowerCase()
    // })

    // superHeros = newSuperHeros

    for (let i = 0; i < superHeros.length; i++) {
        if (superHeros[i].name.toLocaleLowerCase() === name.toLocaleLowerCase()) {
            superHeros.splice(i, 1)
        }
    }

    res.json({
        errorMessage: `the heros ${name} is deleted`
    })
})

app.delete("/heroes/:name/power/:power", (req, res, next) => {

    const name = req.params.name

    const infoHero = superHeros.find(elem => {
        return elem.name.toLowerCase() === name.toLowerCase()
    })

    if (infoHero) {
        next()
    } else {
        res.json({
            errorMessage: "the hero is not in the list"
        })
    }
}, (req, res) => {

    const name = req.params.name.toLocaleLowerCase()
    const power = req.params.power.toLocaleLowerCase()

    const infoHero = superHeros.find(elem => {
        return elem.name.toLowerCase() === name
    })

    const indexPower = infoHero.power.findIndex(elem => {
        return elem = power
    })

    if (power > -1) {

        selectedHeros.splice(indexPower, 1)
        res.json({
            message: `le pouvoir ${power} a bien été retiré du héros ${name}`
        })
    } else {
        res.json({
            message: `the power ${power} doesn't exist for ${name}`
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
        infoHero = changeHero
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