const { User, Thought } = require('../models');

const userController = {
  createUser: async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Implement other CRUD operations for users here
};

module.exports = userController;
