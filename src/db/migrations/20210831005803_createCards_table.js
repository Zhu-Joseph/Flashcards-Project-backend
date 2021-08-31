
exports.up = function(knex) {
    return knex.schema.createTable("cards", (table) => {
        table.increments("id").primary()
        table.string("front",255).notNullable()
        table.string("back", 255).notNullable()
        table.integer("deckId").notNullable()
        table.foreign("deckId").references("id").inTable("decks")
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("cards")
  };
