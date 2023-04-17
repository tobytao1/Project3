const User = require("../models.js/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecretValue';

const register = (req, res) => {
  bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
    if (err) {
      return res.status(500).json({ error: err });
    }

    let user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPass,
    })

    user.save()
    .then(user => {
      res.json({ message: "User Added Successfully!" })
    })
    .catch(error => {
      res.status(500).json({ error: error })
    })
  })
}

const login = (req, res, next) => {
  let userName = req.body.name;
  let password = req.body.password;
  User.findOne({ name: userName })
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: 'Either userName or password not match!' });
      }

      bcrypt.compare(password, user.password, function(err, result) {
        if (err) {
          return res.status(500).json({ error: err })
        }
        if (result) {
          let token = jwt.sign({ name: user.name }, JWT_SECRET, { expiresIn: '1h' })
          res.json({ message: 'Login Successful!', token })
        } else {
          return res.status(401).json({ message: 'Either userName or password not match!' })
        }
      })
    })
    .catch(error => {
      res.status(500).json({ error: error })
    })
}

module.exports = { register, login }
