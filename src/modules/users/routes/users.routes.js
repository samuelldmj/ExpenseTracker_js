const express = require('express');
const { registerUserController } = require('../controllers/registerController');
const { loginController } = require('../controllers/loginController');
const { userDashboardController } = require('../controllers/UserDashboard');
const { authMiddleware } = require('../../../middleware/authMiddleware');

const usersRoutes = express.Router();

usersRoutes.get('/', (req, res) => {
    res.send(`<h1>Welcome to homepage</h1>`);
});

usersRoutes.post('/register', registerUserController);
usersRoutes.post('/login', loginController);


usersRoutes.use(authMiddleware);
usersRoutes.get('/dashboard', userDashboardController);

module.exports = {
    usersRoutes
}



