const mongoose = require('mongoose')
const studentModel = require('./models/student');
const addressModel = require('./models/address');

mongoose.connect("mongodb://localhost:27017/morning_populate", (err) => {
    if (err) {
        console.error('Error !!!', err);
    } else {
        console.log('Connected !');
    }
})

app.listen(port, () => {
    console.log(`J'écoute des requêtes sur le port ${port}`);
})