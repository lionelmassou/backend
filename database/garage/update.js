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

// ETAPE 5

 let conditions = {brand: "Renault"}
 let update = {year: 2000}


Garage.update(conditions, update, (err,carName) => {
    if(!err){
        console.log("Modifications effectuées");
        console.log("nombre de modifications ", carName.nModified)
    }
})