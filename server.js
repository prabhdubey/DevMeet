import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './api/routes/router';
import passport from 'passport';

import 'dotenv/config';

const path = require('path');
const app = express();

// DB config keys
const db = process.env.MONGO_URI;

// Mongoose setup
mongoose
    .connect(db)
    .then(()=> console.log('Mongo DB connected'))
    .catch((error)=> console.log(error));

// Body Parser setup
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Passport setup
app.use(passport.initialize());
require('./api/lib/passport')(passport);

// Use Routes
app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const port = process.env.PORT || 5000 ;

app.listen(port, () => console.log(`Server is running on port ${port}`));