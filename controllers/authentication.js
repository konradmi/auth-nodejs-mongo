const User = require('../models/user')
const jwt = require('jwt-simple')
const config = require('../config')

const tokenForUser = (user) => {
  const timestamp = new Date().getTime()
  // JWT stands for JSON web tokens
  // sub and iat are standard fields that are in the standard
  // sub stands for subject
  // iat stands for issued at a time
  return jwt.encode({sub: user.id, iat: timestamp}, config.secret)
}

exports.signin = (req, res, next) => res.send({ token: tokenForUser(req.user) })


exports.signup = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
  	return res.status(422).send({error: "You must provide email and password"})
  }

  User.findOne({email}, (err, existingUser) => {
  	if (err) {
  		return next(err)
  	} 

  	if (existingUser) {
  	  return res.status(422).send({error: 'Email is in use'})
  	}

  	const user = new User({
  	  email,
  	  password
  	})

  	user.save((err) => {
  	  if (err) { return next(err) }

  	  res.json({token: tokenForUser(user)})
  	})
  })	
}