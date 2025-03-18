const express = require('express');
const { registerUserController } = require('../controllers/register');

const usersRoutes = express.Router();

usersRoutes.get('/', (req, res) => {
    res.send(`<h1>Welcome to homepage</h1>`);
});

usersRoutes.post('/register', registerUserController);


module.exports = {
    usersRoutes
}



