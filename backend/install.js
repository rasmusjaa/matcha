const Pool = require('pg').Pool

function createTables(){

	const pool = new Pool({
		user: 'user42',
		host: '127.0.0.1',
		database: 'matcha',
		password: 'user42',
		port: '5432'}
	);
	
	pool.query(`
		CREATE TYPE gender AS ENUM ('male', 'female', 'other');

		CREATE TYPE name AS (
			first VARCHAR(50),
			last VARCHAR(50)
		);

		CREATE TYPE location AS (
			latitude FLOAT,
			longitude FLOAT
		);

		CREATE TABLE users (
			id SERIAL PRIMARY KEY,
			email VARCHAR(254) UNIQUE NOT NULL,
			username VARCHAR(30) UNIQUE NOT NULL,
			password VARCHAR(30) NOT NULL,
			name name NOT NULL,
			birth_date DATE NOT NULL,
			gender gender NOT NULL,
			sexual_preferences gender[] NOT NULL,
			biography VARCHAR(500),
			fame INTEGER DEFAULT 0,
			location location NOT NULL,
			interests INTEGER[],
			profile_pic_file VARCHAR(64),
			user_pics INTEGER[],
			logged_in BOOL DEFAULT FALSE,
			last_login_timestamp TIMESTAMP
		);`, (err, res) => {
			console.log(err, res)
			pool.end()
		});
}

function createDatabase(){

	const pool = new Pool({
		user: 'user42',
		host: '127.0.0.1',
		database: 'postgres',
		password: 'user42',
		port: '5432'}
	);
	
	pool.query("CREATE DATABASE matcha;", 
		(err, res) => {
			console.log(err, res)
			pool.end()
			createTables()
		});
}

function createUser(){

	const pool = new Pool({
		user: 'postgres',
		host: '127.0.0.1',
		database: 'postgres',
		password: 'postgres',
		port: '5432'}
	);
	
	pool.query("CREATE ROLE user42 CREATEDB LOGIN PASSWORD 'user42' ;", 
		(err, res) => {
			console.log(err, res)
			pool.end()
			createDatabase()
		});
}

createUser()
