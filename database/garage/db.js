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

// ETAPE 3

const firstCar = new Garage ({
    brand: "Renault",
    model: "Espace",
    year: 1999
})
const secondCar = new Garage ({
    brand: "Renault",
    model: "Scenic",
    year: 2004
})
const thirdCar = new Garage ({
    brand: "Peugeot",
    model: "308",
    year: 2017
})

firstCar.save((err, carName) => {
    if (err){
        console.log("something isn't good with your instructions");
        console.log(err);
    } else {
        console.log(`Succes... There is a ${carName.brand} model ${carName.model} in your Garage`);
        // console.log(`Succes... There is a ${firstCar.brand} model ${firstCar.model} in your Garage`);
    }
})

secondCar.save((err, carName) => {
    if (err){
        console.log("something isn't good with your instructions");
        console.log(err);
    } else {
        console.log(`Succes... There is a ${carName.brand} model ${carName.model} in your Garage`);
    }
})

thirdCar.save((err, carName) => {
    if (err){
        console.log("something isn't good with your instructions");
        console.log(err);
    } else {
        console.log(`Succes... There is a ${carName.brand} model ${carName.model} in your Garage`);
    }
})