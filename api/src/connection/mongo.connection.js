const mongoose = require('mongoose');
const {mongoUri} = require("../config")


const connectWithRetry = () => {
  mongoose.connect(mongoUri, { })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('Failed to connect to MongoDB:', err);
      console.log('Retrying MongoDB connection after 5 seconds...');
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

// Optional: Listening to various connection events for better handling
mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Reconnecting...');
  connectWithRetry();
});
