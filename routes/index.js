var express = require('express');
var router = express.Router();
const axios = require('axios');
const { saveToken, isLoggedIn } = require('../helper/util')



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Express' });
});

router.get('/create/barang', function (req, res, next) {
  res.render('addBarang', { title: 'Express' });
});

router.get('/dashboard', function (req, res, next) {
  res.render('dashboard', { title: 'Express' });
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
    const { username, password } = req.body
    axios.post('http://159.223.57.121:8090/auth/login', {
      password: password,
      username: username,
    }).then(({ data }) => {
      const token = data.data.token
      isLoggedIn.newToken = data.data.token
      console.log(isLoggedIn.newToken, "..")
      axios.get('http://159.223.57.121:8090/barang/find-all', {
        params: {
          limit: 100,
          offset: 1
        },
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }).then(({ data }) => {
        let dataBarang = data.data
        let newData = []
        dataBarang.forEach(item =>
          newData = [...newData, {
            id: item.id,
            namaBarang: item.namaBarang ? item.namaBarang : '',
            harga: item.harga ? item.harga : '',
            stok: item.stok ? item.stok : '',
            newsupplier: item.supplier ? item.supplier : { id: '', namaSupplier: '', noTelp: '', alamat: '' }
          }])
        res.render('dashboard', { newData, token })
      });
    }).catch((err) => {
      console.log(err)
    })
  } catch (err) {
    console.log(err)
  }
});

router.post('/create/barang', async function (req, res, next) {
  console.log('masuk', 'react')
  try {
    let token = isLoggedIn.newToken
    const { harga, idbarang, namaBarang, stokBarang, alamatSupplier, idSupplier, namaSupplier, notlpn } = req.body
    console.log(harga, namaBarang, stokBarang, token, '')
    // axios.post('http://159.223.57.121:8090/barang/create', {
    //   params: {
    //     harga: harga,
    //     id: idbarang,
    //     namaBarang: namaBarang,
    //     stok: stokBarang,
    //     supplier: {
    //       alamat: alamatSupplier,
    //       id: idSupplier,
    //       namaSupplier: namaSupplier,
    //       noTelp: notlpn,
    //     }
    //   },
    //   headers: {
    //     'Authorization': 'Bearer ' + token
    //   }
    // }).then(({ data }) => {
    //   console.log(data.data)
    //   res.redirect('/')
    // }).catch((err) => {
    //   console.log(err)
    // })
  } catch (err) {
    console.log(err)
  }
});
module.exports = router;
