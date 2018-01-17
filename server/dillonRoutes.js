var dbProfile = require('../database/profile.js');
var dbLogin = require('../database/login.js');
var router = require('express').Router();
var bcrypt = require('bcrypt');
var nodeMailer = require('./nodemailer.js');
const saltRounds = 10;

router.post('/enable2factorauth', (req, res) => {
	dbProfile.toggleTwoFactorAuth(req.body.username, req.body.currentAuth)
	.then((result) => {
		if(result) {
			res.status(201).json('Updated Settings');
		}
	})
	.catch((error) => {
		console.log('Error with enable2factorauth', error);
	})
})

var tempTwoFactorHash = [];
router.post('/twoFactorAuth', (req, res) => {
	bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
		if(err) {
			console.log('Something wrong with the hash', err);
			res.status(404).json('Error occurred with the hash', err);
		} else {
			tempTwoFactorHash.push(req.body.userId, hash);
			console.log('This is the hash generated as I log in.', tempTwoFactorHash);
			nodeMailer.sendMail(`This is your user generated hash, ${hash}`);
		}
		res.status(200).json('A temporary password has been sent to your email.');
	})
})

router.post('/twoFactorAuthCompare', (req, res) => {
	if(req.body.hash === tempTwoFactorHash[1]) {
		res.status(201).json(tempTwoFactorHash[0]);
	} else {
		res.status(201);
	}
})

exports.router = router;