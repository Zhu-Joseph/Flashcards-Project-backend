const router = require("express").Router()
const controller = require("./decks.controller")

router.route("/:deckId")
    .put(controller.update)
    .delete(controller.delete)
    .get(controller.listCards)

router.route("/")
    .post(controller.create)
    .get(controller.list)

module.exports = router