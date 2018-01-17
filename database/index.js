
require('dotenv').config();
const knex = require('knex') ({
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://postgres:0@localhost:5432/paymo',
    pool: { min: 0, max: 7 }
  });

module.exports = {
  pg: knex
}
