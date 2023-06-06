// const express = require('express');
// const app = express();
// const routes = require('./routes');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const cors = require('cors');

// app.use(bodyParser.json());
// app.use(express.json());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(cors());
// app.use('/', routes);

// module.exports = app;

const express = require('express');
const app = express();
// const db = require('./db')
// const connection = require('./db');
// const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/', routes)


module.exports = app;