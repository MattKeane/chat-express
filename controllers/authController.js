const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const prisma = require('../prisma/client');

router.get('/', (req, res) => {
	res.send('Auth controller works!');
});

router.get('/currentUser', (req, res) => {
	if (req.session.loggedIn) {
		const body = {
			message: "User currently logged in",
			data: req.session.currentUser,
		};
		res.status(200).json(body);
	} else {
		const body = {
			message: "No user currently logged in",
			data: {}
		};
		res.status(400).json(body);
	}
})
router.post('/register', async (req, res) => {
	try {
		const emailExists = await prisma.user.findUnique({
			where: {
				email: req.body.email,
			}
		});
		const usernameExists = await prisma.user.findUnique({
			where: {
				username: req.body.username,
			}
		});
		if (emailExists) {
			const body = {
				message: 'User with that email already exists!',
				data: {},
			};
			res.status(400).json(body);
		} else if (usernameExists) {
			const body = {
				message: 'User with that username already exists!',
				data: {},
			};
			res.status(400).json(body)
		} else {
			const salt = bcrypt.genSaltSync(10);
			req.body.password = bcrypt.hashSync(req.body.password, salt);
			const createdUser = await prisma.user.create({
				data: req.body,
			});
			delete createdUser.password;
			req.session.loggedIn = true;
			req.session.currentUser = createdUser;
			const body = {
				message: "User successfully created!",
				data: createdUser,
			};
			res.status(201).json(body);
		}
	} catch (err) {
		const d = new Date();
		console.log(`${d.toLocaleString()}: ${err}`)
		const body = {
			message: err,
			data: {},
		};
		res.status(400).json(body);
	}
});

module.exports = router;