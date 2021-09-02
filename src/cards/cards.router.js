const router = require("express").Router()
const controller = require("./cards.controller")


router.route("/:cardId")
    .get(controller.read)

router.route("/")
    .post(controller.create)
    .get(controller.findCardDeck)

module.exports = router