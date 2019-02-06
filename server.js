const express = require('express');
const mongoose = require('mongoose');

const app = express();

const users = require('./api/routes/users');
const profiles = require('./api/routes/profiles');
const posts = require('./api/routes/posts');

// DB config keys
const db = require('./config/keys').mongoURI;

mongoose
    .connect(db)
    .then(()=> console.log('Mongo DB connected'))
    .catch((error)=> console.log(error));

app.get('/', (req, res) => res.send('Hello!'));

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profiles);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000 ;

app.listen(port, () => console.log(`Server is running on port ${port}`));