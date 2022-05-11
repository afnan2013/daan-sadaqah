import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

import sliders from './data/sliders.js';
import about from './data/about.js';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running.......');
});

app.use('/api/sliders', (req, res) => {
  res.json(sliders);
});

app.use('/api/about', (req, res)=> {
  res.json(about);
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server is listeing in ${process.env.NODE_ENV} mode to ${PORT} Port`.yellow
  )
);
