import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './api/routes/router';
import passport from 'passport';

import 'dotenv/config';

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

const port = process.env.PORT || 5000 ;

app.listen(port, () => console.log(`Server is running on port ${port}`));