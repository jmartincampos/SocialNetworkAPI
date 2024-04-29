const { Thought, User } = require('./models');

const thoughtController = {
  createThought: async (req, res) => {
    try {
      const thought = await Thought.create(req.body);
      await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });
      res.status(200).json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.status(200).json(thoughts);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id);
      res.status(200).json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  updateThought: async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  deleteThought: async (req, res) => {
    try {
      await Thought.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Thought deleted successfully' });
    } catch (err) {
      res.status(400).json(err);
    }
  },

  addReaction: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      thought.reactions.push(req.body);
      await thought.save();
      res.status(200).json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  removeReaction: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      thought.reactions.pull({ _id: req.params.reactionId });
      await thought.save();
      res.status(200).json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  }
};

module.exports = thoughtController;
