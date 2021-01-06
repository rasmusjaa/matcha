import { Pool } from 'pg'
import * as testdata from './testdata.json'
import { createUser } from './controllers/usersFunctions'
import { createInterest } from './controllers/interestsFunctions'
import { createImage } from './controllers/imagesFunctions'
import createPool from './pool'

function addTestData(){
	testdata.testusers.map((user: any) => {
		createUser(user)
	})
	testdata.interests.map((interest: any) => {
		createInterest(interest.interest)
	})
	testdata.user_pics.map((image: any) => {
		createImage(image)
	})
}

function createTables(){
	const pool = createPool()
	pool.query(`

		CREATE TABLE users (
			id SERIAL PRIMARY KEY,
			email VARCHAR(254) UNIQUE NOT NULL,
			username VARCHAR(30) UNIQUE NOT NULL,
			password VARCHAR(64) NOT NULL,
			name VARCHAR[] NOT NULL,
			birth_date DATE,
			gender INTEGER,
			sexual_preferences INTEGER[],
			biography VARCHAR(500),
			fame INTEGER DEFAULT 0,
			location FLOAT[],
			interests INTEGER[],
			profile_pic_file VARCHAR(64),
			user_pics INTEGER[],
			logged_in BOOL DEFAULT FALSE,
			last_login_timestamp TIMESTAMP
		);
		
		CREATE TABLE interests (
			id SERIAL PRIMARY KEY,
			interest VARCHAR(50) UNIQUE NOT NULL
		);
		
		CREATE TABLE user_images (
			id SERIAL PRIMARY KEY,
			filename VARCHAR(50) UNIQUE NOT NULL,
			user_id INTEGER NOT NULL
		);
		
		CREATE TABLE likes (
			id SERIAL PRIMARY KEY,
			timestamp DATE,
			liked_user INTEGER,
			liker_user INTEGER,
			is_like BOOLEAN
		);`
		, (err: any, res: any) => {
			console.log(err, res)
			pool.end()
			addTestData()
		});
}

function createDatabase(){

	const pool = new Pool({
		user: 'user42',
		host: '127.0.0.1',
		database: 'postgres',
		password: 'user42',
		port: 5432}
	);
	
	pool.query("CREATE DATABASE matcha;", 
		(err: any, res: any) => {
			console.log(err, res)
			pool.end()
			createTables()
		});
}

function createDatabaseUser(){

	const pool = new Pool({
		user: 'postgres',
		host: '127.0.0.1',
		database: 'postgres',
		password: 'postgres',
		port: 5432}
	);

	pool.query("DROP TABLE IF EXISTS matcha ;", 
	(err: any, res: any) => {
		console.log(err, res)
	});
	
	pool.query("CREATE ROLE user42 CREATEDB LOGIN PASSWORD 'user42' ;", 
		(err: any, res: any) => {
			console.log(err, res)
			pool.end()
			createDatabase()
		});
}

function recreateDatabase(){

	const pool = new Pool({
		user: 'postgres',
		host: '127.0.0.1',
		database: 'postgres',
		password: 'postgres',
		port: 5432}
	);

	pool.query("DROP DATABASE IF EXISTS matcha WITH ( FORCE )",
	(err: any, res: any) => {
		console.log(err, res)
	});

	pool.query("DROP USER IF EXISTS user42", 
	(err: any, res: any) => {
		console.log(err, res)
		pool.end()
		createDatabaseUser()
	});
}

recreateDatabase()
