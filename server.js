require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');

const PORT = process.env.PORT;

const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
};

app.use(cors(corsOptions));

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	}))
app.use(express.json());

const authController = require('./controllers/authController');
app.use('/api/v1/auth', authController);

app.get('/', (req, res) => {
	res.send('Hewwo! UwU');
});

app.listen(PORT, err => {
	const d = new Date();
	if (err) {
		console.log(`${d.toLocaleString()}: Error: ${err}`);
	} else {
		console.log(`${d.toLocaleString()}: Listening on Port ${PORT}`);
	}
});