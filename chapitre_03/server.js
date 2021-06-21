const express = require("express")
const cors = require("cors")
const multer = require('multer');
const fs = require("fs")
const path = require("path")
const mongoose = require("mongoose")
const userModel = require('./models/User')

mongoose.connect("mongodb://localhost:27017/upload", (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log("I'm connected to the database");
    }
})

const upload = multer({ dest: 'public/uploads/' });

const port = 9000

const app = express()

app.use(cors())
app.use(express.json())

app.use(express.static("./public"))

app.get("/users", async (req,res) => {

    try {
        const users = await userModel.find({})

        res.json(users)
    } catch (error) {
        console.log("Error:", error)

        res.status(500).json({ message: "Erreur en traitant la requête" })
    }
})

app.post("/users/add", upload.single("new-image"), async (req, res) => {
    
    try {

        const date = new Date().toISOString().slice(0,10).replace(/-/g,"");
        const extension = req.file.originalname.split(".")[1]
        const newImageName = req.body.name + "_" + date + "." + extension
        
        const userAdded = await userModel.create({
            name: req.body.name,
            profilePicture: newImageName
        })
        
        fs.renameSync(req.file.path, path.join(req.file.destination, newImageName));

        res.json({
            message: "User ajouté correctement",
            userAdded
        })
    } catch (error) {
        console.log("Error:", error)

        fs.rmSync(req.file.path)

        res.status(500).json({ message: "Erreur en traitant la requête" })
    }
})

app.listen(port, () => {
    console.log(`J'écoute des requêtes sur le port ${port}`);
})


// Essais
// app.post('/upload', upload.single('image'), (req, res) => {
//     console.log("req.body", req.body);
//     console.log("req.file", req.file);

//     fs.renameSync(req.file.path, path.join(req.file.destination, req.file.originalname));

//     res.send("ok");
// });


