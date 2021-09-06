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

function findAllCards(deckId) {
    return knex("decks as d")
    .join("cards as c", "c.deckId", "d.id")
    .select("*")
    .where({"c.deckId": deckId})
}

function create(decks) {
    return knex("decks") 
    .insert(decks, "*")
    .then((createDeck) => createDeck[0])
}

function updateDecks(deckId, update) {
    return knex("decks")
    .select("*")
    .where({"id": deckId})
    .update(update,"*")
} 

function destory(deckId) {
    return knex("decks")
    .where({"id": deckId})
    .del()
}

module.exports = {
    list,
    findDeck,
    create,
    updateDecks,
    findAllCards,
    destory
}