const knex = require("../db/connection")
const reduceProperties = require("../utils/reduce-properties")

const reduceCards = reduceProperties("id", {
    deckId: ["cards", null, "deckId"],
    front: ["cards", null, "front"],
    back: ["cards", null, "back"],
    cardId: ["cards", null, "cardId"],
  });

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
    .select("c.*", "d.*")
    .where({"c.deckId": deckId})
    .then(reduceCards)
    .then((findCard) => findCard[0])
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