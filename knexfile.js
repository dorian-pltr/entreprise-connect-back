require('dotenv').config() // Charge les variables d'environnement depuis le fichier .env

module.exports = {
  development: {
    client: 'pg', // Utilise PostgreSQL
    connection: process.env.DATABASE_URL,
    // Use this for local development
    // connection: {
    //   host: process.env.DB_HOST,
    //   port: process.env.DB_PORT,
    //   user: process.env.DB_USER,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_NAME,
    // },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
    useNullAsDefault: true,
  },
}
