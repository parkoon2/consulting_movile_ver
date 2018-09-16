const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')
const path = require('path')
// const compression = require('compression');
// const helmet = require('helmet')
// app.use(helmet());
const session = require('express-session')
const FileStore = require('session-file-store')(session)

app.set('views', path.join(__dirname, '/public/views'))
app.set('view engine', 'ejs')

app.use(express.static('public'))
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(compression());
// app.use(session({
//   secret: 'asadlfkj!@#!@#dfgasdg',
//   resave: false,
//   saveUninitialized: true,
//   store:new FileStore()
// }))

// app.get('*', function(request, response, next){
//   fs.readdir('./data', function(error, filelist){
//     request.list = filelist;
//     next();
//   });
// });

const indexRouter = require('./routes/index')
// const topicRouter = require('./routes/topic')
// const authRouter = require('./routes/auth')

app.use('/', indexRouter)
// app.use('/topic', topicRouter)
// app.use('/auth', authRouter)

app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.listen(8888, function() {
  console.log('Example app listening on port 3000!')
});
