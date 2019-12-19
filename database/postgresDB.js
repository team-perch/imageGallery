const { Pool } = require('pg');

const pool = new Pool({
  user: 'student',
  host: 'localhost',
  database: 'imagegallery',
  password: 'student',
  port: 5432,
});

module.exports = pool;
