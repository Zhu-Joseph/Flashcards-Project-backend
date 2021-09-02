const service = require("./cards.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function deckExist(req, res, next) {
    const deckId = req.query.deckId
    const foundCardDeck = await service.findCardDeck(deckId)

    if(!foundCardDeck || foundCardDeck.length === 0) {
        next({status: 404, message: `Sorry, deck number ${deckId} does not exist`})
    }
    res.locals.cards = foundCardDeck
    next()
}

async function cardExist(req, res, next) {
    const cardId = req.params.cardId
    const foundCard = await service.read(cardId)

    if(!foundCard) {
        next({status: 404, message: `Sorry, card number ${cardId} does not exist`})
    }
    res.locals.cards = foundCard
    next()
}


// VALIDATION FUNCTIONS ABOVE, API CALLS BELOW
async function list(req, res, next) {
    const data = await service.list()
    res.json({data})
}

async function findCardDeck(req, res, next) {
    const data = res.locals.cards
    res.status(200).json({data})
}

async function read(req, res, next) {
    const data = res.locals.cards
    res.status(200).json({data})
}


module.exports = {
    list,
    findCardDeck: [deckExist, asyncErrorBoundary(findCardDeck)],
    read: [cardExist, asyncErrorBoundary(read)]
}