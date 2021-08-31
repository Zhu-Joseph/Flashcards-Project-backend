
exports.up = function(knex) {
  return knex.schema.createTable("decks", (table) => {
      table.increments("id").primary()
      table.string("name", 255).notNullable()
      table.string("description", 255).notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("decks")
};
