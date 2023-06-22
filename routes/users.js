const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserById, getUsers, updateUser, updateAvatar, getUser,
} = require('../controllers/users');

router.get('/me', getUser);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), getUserById);

router.get('/', getUsers);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
    avatar: Joi.string().default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
  }),
}), updateUser);

router.patch('/me/avatar', updateAvatar);

module.exports = router;
