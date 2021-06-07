// ETAPE 1

const mongoose = require ('mongoose')

mongoose.connect("mongodb://localhost:27017/garage", (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log("I'm connected to the database");
    }
})

// ETAPE 2

const garageSchema = mongoose.Schema({
    // _id : ID,
    brand: String,
    model: String,
    year: Number,
    created: { type: Date, default: Date.now }
})

const Garage = mongoose.model('Garage', garageSchema)

// ETAPE 4

Garage.findById("60be186524dfbf3dabb2357e", (err,carName) => {
    if(!err){
        console.log("Voici la voiture que vous recherchez");
        console.log(carName)
    }
})
