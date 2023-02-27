var express = require('express');
var router = express.Router();
const axios = require('axios');



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Express' });
});

router.post('/register', async function (req, res, next) {
  try {
    const { name, username, password } = req.body
    axios.post('http://159.223.57.121:8090/auth/register', {
      profileName: name,
      Username: username,
      Password: password
    }).then((res) => {
      console.log(res.data)
    }).catch((err) => {
      console.log(err)
    })
    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
});

router.post('/', async function (req, res, next) {
  try {
    const token = ''
    const { username, password } = req.body
    axios.post('http://159.223.57.121:8090/auth/login', {
      password: password,
      username: username,
    }).then(({ data }) => {
      console.log(data)
    }).catch((err) => {
      console.log(err)
    })
    res.redirect('dashboard')
  } catch (err) {
    console.log(err)
  }
});

router.get('/dashboard', function (req, res, next) {
  try {
    // axios.get('http://159.223.57.121:8090/auth/login', {
    //   Offsite: 5,
    //   Limit: 10,
    //   // Authorizations: ,
    // }).then((res) => {
    //   console.log(res.data)
    // }).catch((err) => {
    //   console.log(err)
    // })
    res.render('dashboard')
  } catch (err) {
    console.log(err)
  }
  res.render('dashboard', { title: 'Express' });
});

module.exports = router;
