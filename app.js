const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const errorControl = require('./controller/error');

const contactRoute = require('./routes/contactroute');

app.use(cors());
app.use(bodyParser.json({extended: false}));

app.use('/user', contactRoute);

app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'home.html'));
});

app.use(errorControl.get404);

mongoose.connect(process.env.MONGODB)
    .then(result => {
        app.listen(3000);
    })
    .catch(err => console.log(err));