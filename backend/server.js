import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

import generateToken from './utils/generateToken.js';

import sliders from './data/sliders.js';
import about from './data/about.js';
import usefulLinks from './data/usefulLinks.js';
import users from './data/users.js';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running.......');
});

app.use('/api/sliders', (req, res) => {
  res.json(sliders);
});

app.use('/api/about', (req, res) => {
  res.json(about);
});

app.use('/api/usefullinks', (req, res) => {
  res.json(usefulLinks);
});

app.post('/api/users/login', (req, res) => {
  const { phone, password } = req.body;
  console.log(phone);

  const userMatched = users.filter((u) => {
    return u.password === password && u.phone === phone;
  });
  const user = userMatched[0];
  console.log(user);
  if (user) {
    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    res.json({
      message: 'Invalid User Credentials',
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server is listeing in ${process.env.NODE_ENV} mode to ${PORT} Port`.yellow
  )
);
