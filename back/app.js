// Fawez TEKA 
//     https://www.linkedin.com/in/fawez-teka/
//     https://github.com/TekaFawez
//    Copyright © Fawez TEKA . All rights reserved.

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
const app = express();


var cors = require('cors');
app.use(cors());
app.set('secretKey', 'nodeRestApi');

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/web", { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected to db!'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function(req, res) {
    res.json({ "tutorial": "Build REST API with node.js" });
});
app.use(express.json());

const router = require('./routs/apiroutes');

app.use('/api', router);

app.listen(4000, () => console.log('server Up and running'));