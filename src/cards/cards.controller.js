const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

function list(req, res, next) {
    res.send("cards is connected")
}


module.exports = {
    list
}