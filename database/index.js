// FOR HEROKU DEVELOPMENT
// require('dotenv').config();
// const knex = require('knex') ({
//     client: 'pg',
//     connection: process.env.DATABASE_URL,
//     pool: { min: 0, max: 7 }
//   });

// module.exports = {
//   pg: knex
// }


// FOR LOCAL DEVELOPMENT
const knex = require('knex') ({
    client: 'pg',
    connection: {
      host: '127.0.0.1', 
      user: 'decross', 
      password: '', 
      database: 'paymo', 
    },
    pool: { min: 0, max: 7 }
  });

module.exports = {
  pg: knex
}

