var express = require('express');
var axios = require('../axiosFile');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  axios.get('/users.json')
    .then(dbRes => {
      let usersList = Object.values(dbRes.data);
      res.send(usersList);
    })
});

// Sign up user
router.post('/sign-up', function (req, res, next) {

  let usersList =[];
  axios.get('/users.json')
    .then(dbRes => {
      usersList = Object.values(dbRes.data);
    })




  axios.post('/users.json', req.body)
    .then(dbRes => {
      res.send('SUCCESS');
    })
    .catch(err => {
      res.send('ERROR');
    })

  })

  

module.exports = router;
