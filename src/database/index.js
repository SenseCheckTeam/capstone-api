const mongoose = require('mongoose');
require('dotenv').config();

const isVercel = process.env.VERCEL === '1';
let connection = null;

const connectToDatabase = async () => {
  // If we already have a connection, use it
  if (connection) {
    console.log('Using existing database connection');
    return connection;
  }

  try {
    // Try to connect to MongoDB Atlas
    console.log('Connecting to MongoDB Atlas...');

    // Check if environment variables are set
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set');
    }

    if (!process.env.MONGODB_DB_NAME) {
      throw new Error('MONGODB_DB_NAME environment variable is not set');
    }

    // Connect with retry logic for Vercel
    const connectWithRetry = async (retryCount = 0, maxRetries = 3) => {
      try {
        await mongoose.connect(process.env.MONGODB_URI, {
          dbName: process.env.MONGODB_DB_NAME,
          serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
        });
        console.log('Connected to MongoDB Atlas successfully');
        connection = mongoose.connection;
        return connection;
      } catch (err) {
        if (retryCount < maxRetries) {
          console.log(`Retrying connection to MongoDB Atlas (${retryCount + 1}/${maxRetries})...`);
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retrying
          return connectWithRetry(retryCount + 1, maxRetries);
        }
        throw err;
      }
    };

    return await connectWithRetry();
  } catch (error) {
    console.error('MongoDB Atlas connection error:', error.message);

    // In Vercel environment, we should throw the error
    if (isVercel) {
      throw error;
    }

    console.log('Using in-memory MongoDB for development...');

    // Set up in-memory MongoDB for development
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();

      await mongoose.connect(uri, {
        dbName: 'capstone_dev',
      });
      console.log('Connected to in-memory MongoDB successfully');
      connection = mongoose.connection;
      return connection;
    } catch (memError) {
      console.error('In-memory MongoDB connection error:', memError);
      if (isVercel) {
        throw memError;
      } else {
        process.exit(1);
      }
    }
  }
};
// test
module.exports = {
  connectToDatabase,
  mongoose,
};
