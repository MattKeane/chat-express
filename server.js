require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
		credentials: true,
	}
});

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

io.on('connection', socket => {
	console.log('New client connected.');
	socket.on('global', msg => {
		io.emit('global', msg);
	});
	socket.on('disconnect', () => {
		console.log('Client disconnected.');
	});
});

const authController = require('./controllers/authController');
app.use('/api/v1/auth', authController);

app.get('/', (req, res) => {
	res.send('Hewwo! UwU');
});

server.listen(PORT, err => {
	const d = new Date();
	if (err) {
		console.log(`${d.toLocaleString()}: Error: ${err}`);
	} else {
		console.log(`${d.toLocaleString()}: Listening on Port ${PORT}`);
	}
});