const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

function list(req, res, next) {
    res.send("Decks is working")
}


module.exports = {
    list
}