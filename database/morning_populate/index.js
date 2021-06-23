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

// async function addAddress() {
//     try {
//         await addressModel.insertMany([
//             {
//                 streetName: "eluard",
//                 streetNumber: "20",
//                 postCode: "93000",
//                 city: "Bobigny"
//             },
//             {
//                 streetName: "Ourcq",
//                 streetNumber: "10",
//                 postCode: "75019",
//                 city: "Paris"
//             }])

//         console.log("data base is create/update !!");

//     } catch (err) {
//         console.error(err);
//     }
// }

// async function addStudent() {
//     try {
//         await studentModel.insertMany([
//             {
//                 firstName: "yannick",
//                 surname: "noah",
//                 // address: ["60c2279cb6623d99c62e9806", "60c2279cb6623d99c62e9807"]
//             },
//             {
//                 firstName: "Gael",
//                 surname: "monfils",
//                 address: ["60c2279cb6623d99c62e9807"]
//             }])

//         console.log("data base is create/update !!");

//     } catch (error) {
//         console.error(error);
//     }
// }

// async function showStudent() {
//     try {
//         const studentFound = await studentModel.findById("60c22913770a0e9a4fd74238").populate('address')
//         console.log('studentFound', studentFound);
//     } catch (error) {
//         console.error(error);
//     }
// }

app.listen(port, () => {
    console.log(`J'écoute des requêtes sur le port ${port}`);
})