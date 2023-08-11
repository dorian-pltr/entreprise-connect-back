const express = require('express')
const knex = require('knex')
const knexConfig = require('../knexfile')
const db = knex(knexConfig.development)

const app = express()
const port = process.env.PORT || 3000

require('dotenv').config()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.listen(port, '0.0.0.0', function () {
  console.log(`Server is running on port ${port}`)
})

app.get('/api/entreprises', async (req, res) => {
  try {
    const { name, page } = req.query
    const pageSize = 10
    const offset = (page - 1) * pageSize || 0

    let query = db('entreprises')

    if (name) {
      query = query.where('name', 'like', `%${name.toUpperCase()}%`)
    }

    const totalEntreprisesQuery = query.clone().count('* as count')
    const totalEntreprises = await totalEntreprisesQuery.first()

    const entreprisesQuery = query.select('*').limit(pageSize).offset(offset)
    const entreprises = await entreprisesQuery

    res.json({
      entreprises,
      page: parseInt(page) || 1,
      totalPages: Math.ceil(totalEntreprises.count / pageSize),
      pageSize: pageSize,
      totalEntreprises: parseInt(totalEntreprises.count),
    })
  } catch (error) {
    console.error('Error fetching entreprises:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.get('/api/entreprise/:id', async (req, res) => {
  try {
    const { id } = req.params

    const entreprise = await db('entreprises').where('id', id).first()

    if (!entreprise) {
      return res.status(404).json({ error: 'Entreprise not found' })
    }

    res.json(entreprise)
  } catch (error) {
    console.error('Error fetching entreprise:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})
