const express = require('express');
const router = express.Router();
const { Thought, User } = require('../models'); // Assuming you've defined the Thought and User models

// GET route to get all thoughts
router.get('/thoughts', async (req, res) => {
  try {
    const thoughts = await Thought.find().populate('reactions');
    res.json(thoughts);
  } catch (error) {
    console.error('Error fetching thoughts:', error);
    res.status(500).json({ message: 'Server error while fetching thoughts' });
  }
});

// GET route to get a single thought by ID
router.get('/thoughts/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (error) {
    console.error('Error fetching thought:', error);
    res.status(500).json({ message: 'Server error while fetching thought' });
  }
});

// POST route to create a new thought
router.post('/thoughts', async (req, res) => {
  try {
    const { thoughtText, username } = req.body;

    // Check if the username exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Username not found' });
    }

    // Create a new thought
    const newThought = await Thought.create({
      thoughtText,
      username,
    });

    // Push the new thought's ID to the user's thoughts array
    user.thoughts.push(newThought._id);
    await user.save();

    res.json(newThought);
  } catch (error) {
    console.error('Error creating thought:', error);
    res.status(500).json({ message: 'Server error while creating thought' });
  }
});

// PUT route to update a thought by ID
router.put('/thoughts/:thoughtId', async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const { thoughtText } = req.body;

    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { thoughtText },
      { new: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    res.json(updatedThought);
  } catch (error) {
    console.error('Error updating thought:', error);
    res.status(500).json({ message: 'Server error while updating thought' });
  }
});

// DELETE route to remove a thought by ID
router.delete('/thoughts/:thoughtId', async (req, res) => {
  try {
    const { thoughtId } = req.params;

    // Delete the thought
    const deletedThought = await Thought.findByIdAndDelete(thoughtId);
    
    if (!deletedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    // Remove the thought's ID from the user's thoughts array
    const user = await User.findOne({ username: deletedThought.username });
    user.thoughts.pull(thoughtId);
    await user.save();

    res.json({ message: 'Thought deleted successfully' });
  } catch (error) {
    console.error('Error deleting thought:', error);
    res.status(500).json({ message: 'Server error while deleting thought' });
  }
});

module.exports = router;
