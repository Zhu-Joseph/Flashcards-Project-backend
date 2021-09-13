const service = require("./cards.service")
const deckService = require("../decks/decks.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function foundDeck(req, res, next) {
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

async function deckExist (req, res, next) {
    const deckId = req.body.data.deckId
    const foundDeck = await deckService.findDeck(deckId)
    
    if(!foundDeck) {
        next({status: 404, message: `Sorry, deck number ${deckId} does not exist` })
      }
    next()
}

function bodyDataHas(propertyName) {
    return function (req, res, next) {
      const { data = {} } = req.body;
      if (data[propertyName]) {
        return next();
      }
      next({ status: 400, message: `Must include a ${propertyName}` });
    };
}

const has_front = bodyDataHas("front")
const has_back = bodyDataHas("back")
const has_deckId = bodyDataHas("deckId")

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

async function create(req, res, next) {
    const data = await service.create(req.body.data)
    res.status(201).json({data})
}

async function updateCards(req, res, next) {
    const id = res.locals.cards.cardId 
    const newInfo = req.body.data
    const update = await service.updateCards(id, newInfo)

    res.json({data: update})
}

async function destory(req, res, next) {
    const id = res.locals.cards.cardId
    const data = await service.destory(id)
    res.sendStatus(204)
}

module.exports = {
    list,
    findCardDeck: [foundDeck, asyncErrorBoundary(findCardDeck)],
    create: [has_front, has_back, has_deckId, deckExist, asyncErrorBoundary(create)],
    read: [cardExist, asyncErrorBoundary(read)],
    update: [has_front, has_back, has_deckId, deckExist, cardExist, asyncErrorBoundary(updateCards)],
    delete: [cardExist, destory]
}