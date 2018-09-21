const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser')
const path = require('path')
const https = require('https')
// const compression = require('compression');
// const helmet = require('helmet')
// app.use(helmet());
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const options = {
  key : fs.readFileSync('./SSL/knowledgetalk.key'),
  cert : fs.readFileSync('./SSL/knowledgetalk.pem')
};

app.set('views', path.join(__dirname, '/public/views/pages'))
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

const indexRouter = require('./routes')
// const topicRouter = require('./routes/topic')
// const authRouter = require('./routes/auth')

app.use('/', indexRouter)
// app.use('/topic', topicRouter)
// app.use('/auth', authRouter)

app.use((req, res, next) => {
  res.status(404).send('Sorry cant find that!');
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

const port = 9900
const server = https.createServer(options, app).listen(port, () => {
  console.log('::: HTTPS ::: App Server Started - PORT : ' + port)
})

var io = require('socket.io')(server);
