const express = require('express');
const router = express.Router();
const { Reaction } = require('../models'); // Assuming you've defined the Reaction model

// POST route to add a reaction to a thought
router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;

    // Create a new reaction
    const newReaction = await Reaction.create({
      reactionBody,
      username,
    });

    // Find the thought by ID and push the new reaction to its reactions array
    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: newReaction._id } },
      { new: true }
    );

    res.json(thought);
  } catch (error) {
    console.error('Error adding reaction:', error);
    res.status(500).json({ message: 'Server error while adding reaction' });
  }
});

// DELETE route to remove a reaction from a thought
router.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const { thoughtId, reactionId } = req.params;

    // Remove the reaction from the thought's reactions array
    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: reactionId } },
      { new: true }
    );

    res.json(thought);
  } catch (error) {
    console.error('Error removing reaction:', error);
    res.status(500).json({ message: 'Server error while removing reaction' });
  }
});

module.exports = router;
