const express = require('express');
const app = express();

const mongoose = require('mongoose')

var cors = require('cors');
const { request } = require('express');
const port = 8000;

app.use(cors())
app.use(express.json())

const debug = (req, rest, next) => {
    console.log("I received a request at ", new Date().toTimeString());
    next()
}
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

// ça drop le database mais la laisse vide pour le test d'apres
// mongoose.connect("mongodb://localhost:27017/heros", (err) => {
//     mongoose.connection.db.dropDatabase()
// })

mongoose.connect("mongodb://localhost:27017/heros", (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log("I'm connected to the database");
    }
})

const herosSchema = mongoose.Schema({
    name: String,
    power: Array,
    color: String,
    isAlive: Boolean,
    age: Number,
    image: String
    // created: { type: Date, default: Date.now }
})

const Heros = mongoose.model('Heros', herosSchema)

// const firstHeros = new Heros(
//     {
//         name: "Iron Man",
//         power: ["money"],
//         color: "red",
//         isAlive: true,
//         age: 46,
//         image: "https://blog.fr.playstation.com/tachyon/sites/10/2019/07/unnamed-file-18.jpg?resize=1088,500&crop_strategy=smart"
//     }
// )
// const secondHeros = new Heros(
//     {
//         name: "Thor",
//         power: ["electricty", "worthy"],
//         color: "blue",
//         isAlive: true,
//         age: 300,
//         image: "https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782809465761_1_75.jpg"
//     }
// )
// const thirdHeros = new Heros(
//     {
//         name: "Daredevil",
//         power: ["blind"],
//         color: "red",
//         isAlive: false,
//         age: 30,
//         image: "https://aws.vdkimg.com/film/2/5/1/1/251170_backdrop_scale_1280xauto.jpg"
//     }
// )

// firstHeros.save((err, data) => {
//     if (err) {
//         console.log("something isn't good with your instructions");
//         console.log(err);
//     } else {
//         console.log(`Succes... There is a ${data.name} in your Hero list`);
//     }
// })
// secondHeros.save((err, data) => {
//     if (err) {
//         console.log("something isn't good with your instructions");
//         console.log(err);
//     } else {
//         console.log(`Succes... There is a ${data.name} in your Hero list`);
//     }
// })
// thirdHeros.save((err, data) => {
//     if (err) {
//         console.log("something isn't good with your instructions");
//         console.log(err);
//     } else {
//         console.log(`Succes... There is a ${data.name} in your Hero list`);
//     }
// })

// A modifier

app.get("/heroes", async (req, res) => {

    // console.log("Heros ", Heros)
    // console.log("req ", req)
    // console.log("res ", res)

    try {
        const heros = await Heros.find().exec()
        console.log("heros ", heros)

        res.json(heros)

    } catch (error) {
        console.error("Error in GET /heroes", error)
        res.json({
            message: "Error when finding heroes :("
        })
    }
})

app.get("/heroes/:name", async (req, res) => {

    const nameHero = req.params.name.toLowerCase()

    try {
        const heros = await Heros.find().exec()
        // const nameHero = await heros.find(req.params.name.toLowerCase()).exec()

        for (var i = 0; i < heros.length; i++) {

            if (heros[i].name.toLowerCase() === nameHero) {
                res.json(heros[i])
            } else {
                res.json({
                    message: `Hero ${nameHero} not found`
                })
                console.log(`Hero ${nameHero} not found`);
            }
        }

    } catch (error) {
        console.error("Error in GET /heroes/:name", error)

        res.json({
            message: `Error when finding heroes :(`
        })
    }
})

// app.get("/heroes/:name/powers", (req, res) => {
//     const nameHero = req.params.name.toLowerCase()

//     const selectedHero = superHeros.find(elem => {
//         return nameHero === elem.name.toLowerCase()
//     })

//     res.json(selectedHero.powers)
// })

// const transformName = (req, res, next) => {
//     // console.log("transformName req.body ", req.body);
//     // console.log("transformName req.body.name ", req.body.name);

//     if (req.body.name === undefined) {
//         res.json({
//             erroMessage: "To add a hero send at least he's name"
//         })
//     } else {
//         req.body.name = req.body.name.toLowerCase()

//         next()
//     }

// }

app.post("/heroes", transformName, async (req, res) => {
    // console.log(req.body);
    try {
        const heros = await Heros.find().exec()

        const hero = req.body

        await heros.push(hero)

        res.json({
            message: "Ok, héros ajouté",
            hero
        })

    } catch (error) {
        console.error("Error in POST /students", error)

        res.json({
            message: "The student was not saved :("
        })
    }

})

// app.post("/heroes/:name/powers", (req, res) => {
//     const nameHero = req.params.name.toLowerCase()

//     const selectedHero = superHeros.find(elem => {
//         return nameHero === elem.name.toLowerCase()
//     })

//     if (selectedHero) {


//         const heroPower = req.body.power

//         selectedHero.powers.push(heroPower)

//         res.json({
//             message: `Power added! The powers of ${nameHero} are ${selectedHero.powers}`
//         })
//     } else {
//         res.json({
//             errorMessage: "Hero not found"
//         })
//     }
// })

// app.get("*", (req, res) => {
//     res.json({
//         message: "The route doesn't exist"
//     })
// })

app.listen(port, () => {
    console.log("Server is listenin at port ", port);
})