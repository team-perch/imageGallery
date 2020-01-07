const { Pool } = require('pg');

const pool = new Pool({
  user: 'student',
  host: '13.57.227.181',
  database: 'imagegallery',
  password: 'student',
});

module.exports = pool;
