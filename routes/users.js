const router = require('express').Router();
const {
  getUserById, getUsers, createUser, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/:id', getUserById);

router.get('/', getUsers);

router.post('/', createUser);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateAvatar);

module.exports = router;
