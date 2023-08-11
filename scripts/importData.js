const axios = require('axios')
const knex = require('knex')
const knexConfig = require('../knexfile')
const db = knex(knexConfig.development)

const pageSize = 25
let currentPage = 1
let totalPages = 1

async function importData() {
  try {
    while (currentPage <= totalPages) {
      const response = await axios.get(
        `https://recherche-entreprises.api.gouv.fr/search?code_postal=69001&page=${currentPage}&per_page=${pageSize}`
      )
      const entreprises = response.data.results
      totalPages = response.data.total_pages

      for (const entreprise of entreprises) {
        await db('entreprises')
          .insert({
            name: entreprise.nom_complet,
            address: entreprise.siege.adresse,
            latitude: entreprise.siege.latitude,
            longitude: entreprise.siege.longitude,
          })
          .onConflict('name')
          .merge()
        console.log(`Data for ${entreprise.nom_complet} successfully imported`)
      }
      currentPage++
    }
    console.log('Data imported successfully')
  } catch (error) {
    console.error('Error importing data:', error)
  } finally {
    await db.destroy()
  }
}

importData()
