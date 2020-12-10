const Pool = require('pg').Pool

const pool = new Pool({
	user: 'user42',
	host: 'localhost',
	database: 'matcha',
	password: 'user42',
	port: 5432,
});

module.exports = pool
