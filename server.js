const express = require('express');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
const PORT = process.env.PORT;

const db = knex({ 
	client: 'pg',
	connection: {
	  connectionString : process.env.DATABASE_URL,
	  ssl: true
	}
});

const app = express();

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
	res.send("App is Running!");
})

app.post(process.env.SIGNIN, (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post(process.env.REGISTER, (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get(process.env.PROFILE, (req, res) => {profile.handleProfile(req, res, db)})

app.put(process.env.IMAGE, (req, res) => {image.handleImage(req, res, db)})

app.post(process.env.IMAGEURL, (req, res) => {image.handleApiCall(req, res)})

app.listen(PORT, ()=>{
	console.log(`app is running on port ${PORT}`);
})