const router = require('express').Router();
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');

// Routes
router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
