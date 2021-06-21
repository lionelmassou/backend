const express = require('express');
const port = 8000;

const app = express();

const { listStudent } = require("./students.js")

module.export = listStudent

app.use(express.json()) // permet de recevoir body json dans les requetes

var cors = require('cors')
app.use(cors())


app.get('/students', (req, res) => {

    res.json({
        listStudent
    });
    // console.log("listStudent", listStudent);
});

app.post("/students", (req, res) => {

    const newStudent = req.body

    console.log("newStudent", newStudent);

    listStudent.push(newStudent)

    res.json({
        message: "Voilà c'est bon"
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