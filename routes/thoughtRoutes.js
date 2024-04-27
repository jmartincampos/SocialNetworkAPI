const router = require('express').Router();
const { createThought, getAllThoughts, getThoughtById, updateThought, deleteThought, addReaction, removeReaction } = require('../controllers/thoughtController');

// Routes
router.route('/')
  .get(getAllThoughts)
  .post(createThought);

router.route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router.route('/:thoughtId/reactions')
  .post(addReaction)
  .delete(removeReaction);

module.exports = router;
