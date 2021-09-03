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

function create(cards) {
    return knex("cards") 
    .insert(cards, "*")
    .then((createCard) => createCard[0])
}

function read (cardId) {
    return knex("cards")
    .select("*")
    .where({"id": cardId})
    .first()
}

function updateCards(cardId, update) {
    return knex("cards")
    .select("*")
    .where({"id": cardId})
    .update(update,"*")
} 

function destory(cardId) {
    return knex("cards")
    .where({"id": cardId})
    .del()
}

module.exports = {
    list,
    findCardDeck,
    create,
    read,
    updateCards,
    destory
}