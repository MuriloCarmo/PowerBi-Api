const knex = require('knex');

const connection = knex({
  client: 'mssql',
  connection: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 2733
  },
});

module.exports = connection;
