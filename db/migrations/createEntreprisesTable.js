exports.up = function (knex) {
  return knex.schema.createTable('entreprises', function (table) {
    table.increments('id').primary()
    table.string('name').notNullable().unique()
    table.string('address')
    table.float('latitude')
    table.float('longitude')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('entreprises')
}
