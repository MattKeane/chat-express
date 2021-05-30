const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
	res.send('Auth controller works!');
});

router.post('/register', (req, res, next) => {

});

module.exports = router;