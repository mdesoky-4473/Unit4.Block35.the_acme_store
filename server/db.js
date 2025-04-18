const pkg = require('pg');
//const dotenv = require('dotenv');
//dotenv.config();

const client = new pkg.Client({
  connectionString: process.env.DATABASE_URL || 'postgres://mdesoky:Welcome2024@localhost:5432/acme_reservations_db'
});

module.exports = client;
