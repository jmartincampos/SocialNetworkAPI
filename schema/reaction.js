const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reactionSchema = new Schema({
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => {
      return new Date(createdAtVal).toLocaleString();
    },
  },
});

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;
