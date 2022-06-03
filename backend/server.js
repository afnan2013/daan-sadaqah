import path from 'path';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import colors from 'colors';

import {
  getUserRolesFromDb,
  getRolesFromDb,
  getMenuForRoleFromDb,
  getUserLogin
} from './utils/dbApiCall.js';
import generateToken from './utils/generateToken.js';

import sliders from './data/sliders.js';
import about from './data/about.js';
import usefulLinks from './data/usefulLinks.js';
import users from './data/users.js';
import menus from './data/menus.js';
import posts from './data/posts.js';
import postCategories from './data/postCategories.js';
import footerLinks from './data/footerLinks.js';

dotenv.config();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/sliders', (req, res) => {
  res.json(sliders);
});

app.use('/api/about', (req, res) => {
  res.json(about);
});

app.use('/api/usefullinks', (req, res) => {
  res.json(usefulLinks);
});

app.use('/api/menus', (req, res) => {
  res.json(menus);
});

app.use('/api/posts/study', (req, res) => {
  const filteredPosts = posts.filter((p) => {
    return p.categoryCode === 'study';
  });
  res.json(filteredPosts);
});

app.use('/api/posts', (req, res) => {
  res.json(posts);
});

app.use('/api/footers', (req, res) => {
  res.json(footerLinks);
});

app.use('/api/postCategories', (req, res) => {
  res.json(postCategories);
});

app.post('/api/users/login', async (req, res) => {
  const { phone, password } = req.body;
  // console.log(phone);
  if(phone && password){
    const data = await getUserLogin(phone, password);
    if(data.returnTables){
      const roles = data.returnTables[0];
      const menulist = data.returnTables[1];
      const [user] = data.returnTables[2];
      
      const rolelist = roles.map((role)=>role.rolecode);

      res.json({
        menulist,
        rolelist, 
        phone: user.userid,
        token: data.token
      });
    }
    else{
      res.status(401);
      res.json({
        message: 'Invalid User Credentials',
      });
    }
  }else{
    res.status(400);
    res.json({
      message: 'Invalid Request',
    });
  }
});

app.post('/api/users', (req, res) => {
  const { phone, password } = req.body;
  console.log(phone);

  const userMatched = users.filter((u) => {
    return u.password === password && u.phone === phone;
  });
  const user = userMatched[0];
  console.log(user);
  if (user) {
    res.status(401);
    res.json({
      message: 'Already user registered',
    });
  } else {
    res.json({
      id: 'NewUser1',
      phone: phone,
      isAdmin: false,
      token: generateToken(password),
    });
  }
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server is listeing in ${process.env.NODE_ENV} mode to ${PORT} Port`.yellow
  )
);
