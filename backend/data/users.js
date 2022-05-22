import bcrypt from 'bcryptjs';

const users = [
  {
    userid: 'administrator',
    name: 'Admin User',
    email: 'admin@gmail.com',
    phone: '01779007937',
    password: '123456',
    passwordHash: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    userid: 'developer',
    name: 'John Doe',
    email: 'john@gmail.com',
    phone: '01779007931',
    password: '123456',
    passwordHash: bcrypt.hashSync('123456', 10),
  },
  {
    userid: 'donator',
    name: 'Zia Ahmed',
    email: 'rafin@gmail.com',
    phone: '01779007932',
    password: '123456',
    passwordHash: bcrypt.hashSync('123456', 10),
  },
];

export default users;
