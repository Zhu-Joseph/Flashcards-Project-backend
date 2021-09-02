const knex = require("../db/connection")

function list() {
    return knex("cards")
    .select("*")
    .orderBy("id")
}

function findCardDeck (deckId) {
    return knex("cards")
    .select("*")
    .where({"deckId": deckId})
}

function read (cardId) {
    return knex("cards")
    .select("*")
    .where({"id": cardId})
    .first()
}


module.exports = {
    list,
    findCardDeck,
    read
}