const express = require('express');
const router = express.Router();
// const template = require('../lib/template.js');
// const auth = require('../lib/auth');

router.get('/', function (req, res) {
  res.render('index', {

  })
});

module.exports = router;