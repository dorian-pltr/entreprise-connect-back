exports.seed = function (knex) {
  return knex('entreprises')
    .del()
    .then(function () {
      return knex('entreprises').insert([
        { name: 'Entreprise 1', address: 'Adresse 1' },
        { name: 'Entreprise 2', address: 'Adresse 2' },
      ])
    })
}
