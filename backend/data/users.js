import bcrypt from 'bcryptjs';

const users = [
  {
    _id: '1',
    name: 'Admin User',
    email: 'admin@gmail.com',
    phone: '01779007937',
    password: '123456',
    passwordHash: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    _id: '2',
    name: 'John Doe',
    email: 'john@gmail.com',
    phone: '01779007931',
    password: '123456',
    passwordHash: bcrypt.hashSync('123456', 10),
  },
  {
    _id: '3',
    name: 'Zia Ahmed',
    email: 'rafin@gmail.com',
    phone: '01779007932',
    password: '123456',
    passwordHash: bcrypt.hashSync('123456', 10),
  },
];

export default users;
