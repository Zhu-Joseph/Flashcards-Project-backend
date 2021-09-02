const knex = require("../db/connection")

function list() {
    return knex("decks")
    .select("*")
    .orderBy("id")
}

function findDeck(deckId) {
    return knex("decks") 
    .select("*")
    .where({"id": deckId})
    .first()
}

module.exports = {
    list,
    findDeck
}