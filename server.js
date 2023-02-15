const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const app = express();
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true);


app.use(bodyParser.urlencoded({ extended: true }))

//application/json
app.use(bodyParser.json())

// define a route
app.get('/', (req, res) => {
    res.json({"message": "User Data -------- Kevin"});
});

// Connect to routes
require('./app/routes/user.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

// connect to databases
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

