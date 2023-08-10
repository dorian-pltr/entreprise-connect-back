const express = require('express')
const knex = require('knex')
const knexConfig = require('../knexfile')
const db = knex(knexConfig.development)

const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

app.get('/api/entreprises', async (req, res) => {
  try {
    const { name, page } = req.query
    const pageSize = 10
    const offset = (page - 1) * pageSize || 0

    let query = db('companies')

    if (name) {
      query = query.where('name', 'like', `%${name}%`)
    }

    const totalCompaniesQuery = query.clone().count('* as count')
    const totalCompanies = await totalCompaniesQuery.first()

    const companiesQuery = query.select('*').limit(pageSize).offset(offset)
    const companies = await companiesQuery

    res.json({
      companies,
      page: parseInt(page) || 1,
      totalPages: Math.ceil(totalCompanies.count / pageSize),
      pageSize: pageSize,
      totalCompanies: parseInt(totalCompanies.count),
    })
  } catch (error) {
    console.error('Error fetching companies:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})
