const knex = require("../db/connection")

function list() {
    return knex("decks")
    .select("*")
    .orderBy("id")
}

module.exports = {
    list,
}