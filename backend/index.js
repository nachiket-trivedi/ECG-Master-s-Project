const express = require('express')
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require('multer');
const config = require('./Config/settings');
const app = express();
const port = 8000;

var dbConnection = require('./Database/sqlDb');

// setting view engine
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
  secret: 'ecg_backend_295',
  resave: false,
  saveUninitialized: false,
  duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
  activeDuration: 5 * 60 * 1000
}));

//use cors to allow cross origin resource sharing
app.use(cors({ origin:`http://${config.frontendAddress}:${config.frontendAddress}`, credentials: true }));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', `http://${config.frontendAddress}:${config.frontendAddress}`);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

testDBConection = async () => {
  let con = await dbConnection();
  if (con) {
    console.log("Connected to Database");
  }
}
testDBConection();

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`ECG backend listening on port ${port}!`)
});