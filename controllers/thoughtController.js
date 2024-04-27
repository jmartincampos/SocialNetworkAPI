const { User, Thought } = require('../models');

const thoughtController = {
  createThought: async (req, res) => {
    try {
      const thought = await Thought.create(req.body);
      await User.findOneAndUpdate({ _id: req.body.userId }, { $push: { thoughts: thought._id } });
      res.status(200).json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Implement other CRUD operations for thoughts here
};

module.exports = thoughtController;
