/* Contains the code to actually run the application */

const express = require('express');
const cors = require('cors');
const routes = require('../routes/routes');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

// Register the routes here
app.use("/api", routes);

module.exports = app;
