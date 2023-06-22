const router = require('express').Router();
const {
  getUserById, getUsers, updateUser, updateAvatar, getUser,
} = require('../controllers/users');

router.get('/me', getUser);

router.get('/:id', getUserById);

router.get('/', getUsers);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateAvatar);

module.exports = router;
