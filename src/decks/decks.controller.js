const service = require("./decks.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

function bodyDataHas(propertyName) {
    return function (req, res, next) {
      const { data = {} } = req.body;
      if (data[propertyName]) {
        return next();
      }
      next({ status: 400, message: `Must include a ${propertyName}` });
    };
}

const has_name = bodyDataHas("name")
const has_description = bodyDataHas("description")


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

async function create(req, res, next) {
    const data = await service.create(req.body.data)
    res.status(201).json({data})
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [deckExist, asyncErrorBoundary(read)],
    create: [has_name, has_description, asyncErrorBoundary(create)]
}