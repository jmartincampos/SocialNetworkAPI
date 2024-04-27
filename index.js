const express = require('express');
const mongoose = require('mongoose');
const { User, Thought, Reaction } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost/social-media-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/thoughts', require('./routes/thoughtRoutes'));

// Start server and sync Mongoose models
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await User.syncIndexes();
  await Thought.syncIndexes();
});

module.exports = app;
