exports.up = function (knex) {
  return knex.schema.createTable('companies', function (table) {
    table.increments('id').primary()
    table.string('name').notNullable().unique() // Ajoutez la contrainte d'unicité ici
    table.string('address')
    table.float('latitude')
    table.float('longitude')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('companies')
}
