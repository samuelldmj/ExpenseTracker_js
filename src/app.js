const dotenv = require('dotenv');
dotenv.config();

const expressErrorHandler = require('express-async-errors');
const express = require('express');
const { default: mongoose } = require('mongoose'); // Import mongoose for MongoDB object modeling

const morgan = require('morgan');
const { errorHandler } = require('./handlers/errorHandler');
const { usersRoutes } = require('./modules/users/routes/users.routes');
const { transactionRoutes } = require('./modules/transactions/routes/transactions.routes');

const app = express();



//Express does not return a json format by default
//so to get a json format we need to do the following below.
app.use(express.json());

//middleware
app.use(morgan('dev'));

//Routes
app.use('/api/users', usersRoutes);
app.use('/api/transactions', transactionRoutes);

//error handler
app.use(errorHandler);


//connecting to db
mongoose.connect(process.env.MONGO_DB_CONNECTION)
    .then(() => {
        //-----------------
        console.log('Db Connected!!')
        //-----------------
        const port = 8000;
        const host = "localhost";
        app.listen(port, () => {
            console.log(`This server is running on http://${host}:${port}`);
        });
    })
    .catch(err => console.log(`Db Connection error: ${err.message}`));


    //model initialization
require("../src/models/users.model");
require("../src/models/transaction.model");