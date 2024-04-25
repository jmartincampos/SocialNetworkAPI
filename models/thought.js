const mongoose = require('mongoose');
const reactionSchema = require('./reaction');

// Thought schema
const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAt) => new Date(createdAt).toISOString(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], // Embed reaction subdocuments
  },
  {
    toJSON: { getters: true },
    id: false,
  }
);

// Virtual to retrieve the length of the thought's reactions array
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

module.exports = mongoose.model('Thought', thoughtSchema);
