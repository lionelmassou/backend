const express = require("express")
const router = express.Router()
const multer = require('multer');
const { continueIfHeroExists, continueIfHeroExistsById, continueIfHeroDoesntExists } = require("../middlewares/heroesMiddlewares")
const { verifyToken, onlyAdmin } = require("../middlewares/authMiddlewares")
const {
    getHeros,
    getHeroById,
    getHero,
    getHeroPower,
    addNewHero,
    addNewPowerHero,
    deleteHero,
    deletePowerFromHero,
    replaceHero
} = require("../controllers/heroesController")

const upload = multer({ dest: 'public/uploads/' });

router.get("/", getHeros)

router.get("/:id", getHeroById)

router.get("/name/:name", getHero)

router.get("/:id/powers", getHeroPower)

router.post("/", verifyToken, onlyAdmin, continueIfHeroDoesntExists, upload.single("image-hero"), addNewHero)

router.post("/:id/powers", verifyToken, onlyAdmin, continueIfHeroExistsById, addNewPowerHero)

router.delete("/:id", verifyToken, onlyAdmin, continueIfHeroExistsById, deleteHero)

router.delete("/:id/power/:idPower", verifyToken, onlyAdmin, continueIfHeroExistsById, deletePowerFromHero)

router.put("/:id", verifyToken, onlyAdmin, continueIfHeroExistsById, replaceHero)

router.all("*", (req, res) => {
    res.status(404).json({
        errorMessage: "The route was not found"
    })
})

module.exports = router
