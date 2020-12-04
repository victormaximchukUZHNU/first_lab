const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const https = require('https')
const fs = require('fs');

const { DB_URI } = require('./config/connection');

const options = {
  key: fs.readFileSync('./secret/key.pem'),
  cert: fs.readFileSync('./secret/cert.pem')
};

const app = express();

app.use(bodyParser.json());

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

app.use(require('./router'));

https.createServer(options, app).listen(3443);

app.listen(3000);