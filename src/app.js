// Load environment variables from .env file into process.env
const dotenv = require('dotenv');
dotenv.config();

// Import required packages
const expressErrorHandler = require('express-async-errors'); // Handles async errors in Express
const express = require('express'); // The Express web framework
const { default: mongoose } = require('mongoose'); // MongoDB ODM (Object Data Modeling)

// Import middleware and route files
const morgan = require('morgan'); // HTTP request logger middleware
const { errorHandler } = require('./handlers/errorHandler'); // Custom error handler
const { usersRoutes } = require('./modules/users/routes/users.routes'); // User-related routes
const { transactionRoutes } = require('./modules/transactions/routes/transactions.routes'); // Transaction routes

// Create Express application instance
const app = express();

// Middleware to parse incoming JSON requests
// This allows Express to automatically parse JSON request bodies
app.use(express.json());

// HTTP request logging middleware
// 'dev' format gives concise output colored by response status
app.use(morgan('dev'));

// Mount route handlers
// All routes in usersRoutes will be prefixed with '/api/users'
app.use('/api/users', usersRoutes);
// All routes in transactionRoutes will be prefixed with '/api/transactions'
app.use('/api/transactions', transactionRoutes);

// Register the error handling middleware
// This will catch any errors thrown in routes
app.use(errorHandler);

// Connect to MongoDB database using the connection string from environment variables
mongoose.connect(process.env.MONGO_DB_CONNECTION)
    .then(() => {
        // Connection successful
        console.log('Db Connected!!');
        
        // Server configuration
        const port = 8000;
        const host = "localhost";
        
        // Start the Express server
        app.listen(port, () => {
            console.log(`This server is running on http://${host}:${port}`);
        });
    })
    .catch(err => {
        // Connection failed
        console.log(`Db Connection error: ${err.message}`);
    });

// Initialize Mongoose models
// This ensures all model schemas are registered before they're used
require("../src/models/users.model"); // User model schema
require("../src/models/transaction.model"); // Transaction model schema