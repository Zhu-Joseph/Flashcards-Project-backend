const service = require("./decks.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function deckExist(req, res, next) {
    const id = req.params.deckId
    const foundDeck = await service.findDeck(id)

    if(!foundDeck) {
      next({status: 404, message: `Sorry, deck number ${id} does not exist` })
    }
    res.locals.deck = foundDeck
    next()
  }


// VALIDATION FUNCTIONS ABOVE, API CALLS BELOW
async function list(req, res, next) {
    const data = await service.list()
    res.json({data})
}

async function read(req, res, next) {
    const data = res.locals.deck
    res.status(200).json({data})
}


module.exports = {
    list: asyncErrorBoundary(list),
    read: [deckExist, asyncErrorBoundary(read)]
}