const knex = require("../db/connection")

function list() {
    return knex("cards")
    .select("*")
    .orderBy("id")
}

module.exports = {
    list,
}