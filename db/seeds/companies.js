exports.seed = function (knex) {
  return knex('companies')
    .del()
    .then(function () {
      return knex('companies').insert([
        { name: 'Entreprise 1', address: 'Adresse 1' },
        { name: 'Entreprise 2', address: 'Adresse 2' },
      ])
    })
}
