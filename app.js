const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const user_routes = require('./routes/user.routes');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(cors());

const API_PREFIX = '/api/v1';

app.use(`${API_PREFIX}`, user_routes);

module.exports = app;