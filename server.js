require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT;

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