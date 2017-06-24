const passport = require('passport')
const User = require('../models/user')
const config = require('../config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')

// look at the email property of the request 
const localOptions = {usernameField: 'email' }

//this is for the /login route. When we login we don't have any JWT token so we can't use the jwtLogin strategy
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {

  User.findOne({email}, (err, user) => {
    if (err) return done(err)
    if (!user) return done(null, false)

    user.comparePassword(password, (err, isMatch) => {
      if (err) return done(err)
      if (!isMatch) return done(null, false)
      console.log('test', user)
      return done(null, user)
    })
  })
})

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret,
}

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // payload is the decoded jwt token
  // it contains sub and iat
  User.findById(payload.sub, (err, user) => {
    if (err) return done(err, false)

    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  })
})

passport.use(jwtLogin)
passport.use(localLogin)