import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './api/routes/router';
import 'dotenv/config';

const app = express();

// DB config keys
const db = process.env.MONGO_URI;

mongoose
    .connect(db)
    .then(()=> console.log('Mongo DB connected'))
    .catch((error)=> console.log(error));

app.get('/', (req, res) => res.send('Hello!'));

// Use Routes
app.use('/api', routes);

const port = process.env.PORT || 5000 ;

app.listen(port, () => console.log(`Server is running on port ${port}`));