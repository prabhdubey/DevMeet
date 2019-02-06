const express = require('express');
const mongoose = require('mongoose');

const app = express();

// DB config keys
const db = require('./config/keys').mongoURI;

mongoose
    .connect(db)
    .then(()=> console.log('Mongo DB connected'))
    .catch((error)=> console.log(error));

app.get('/', (req, res) => res.send('Hello!'));

const port = process.env.PORT || 5000 ;

app.listen(port, () => console.log(`Server is running on port ${port}`));