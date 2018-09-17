const express = require('express')
const router = express.Router()
const socketInfo = require('../config/socket')
// const template = require('../lib/template.js');
// const auth = require('../lib/auth');

router.get('/', (req, res) => {
  let socketUrl = `${socketInfo.signalHost}:${socketInfo.signalPort}/${socketInfo.namespace}`;

  res.render('index', {
    socketUrl
  })
})

module.exports = router