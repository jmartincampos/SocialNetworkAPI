const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB connection string. You can replace 'mongodb://localhost:27017/social-network' with your actual MongoDB connection string.
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network';

    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
