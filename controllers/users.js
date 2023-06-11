const User = require('../models/user');
const {
  INCORRECT_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
} = require('../utils/utils');

const getUserById = (
  (req, res) => {
    User.findById(req.params.id)
      .orFail(() => new Error('Not found'))
      .then((user) => { res.send(user); })
      .catch((err) => {
        if (err.message === 'Not found') {
          return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Вы ввели некоректный ID' });
        }
        if (err.name === 'CastError') {
          return res.status(INCORRECT_ERROR_CODE).send({ message: 'Вы ввели некоректные данные' });
        }
        return res.status(DEFAULT_ERROR_CODE).send({
          message: 'Internal Server Error',
        });
      });
  });

const getUsers = (
  (req, res) => {
    User.find({})
      .then((usersData) => res.send(usersData))
      .catch(() => {
        res.status(DEFAULT_ERROR_CODE).send({
          message: 'Internal Server Error',
        });
      });
  });

const createUser = (
  (req, res) => {
    const userData = {
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
    };

    User.create(userData)
      .then((user) => res.status(201).send(user))
      .catch((err) => {
        if (err.message.includes('validation failed')) {
          return res.status(INCORRECT_ERROR_CODE).send({ message: 'Вы ввели некоректные данные' });
        }
        return res.status(DEFAULT_ERROR_CODE).send({
          message: 'Internal Server Error',
        });
      });
  });

const updateUser = (
  (req, res) => {
    const { name, about } = req.body;
    User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
      .then((user) => { if (!user) { return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Запрашиваемый пользователь не найден' }); } return res.send(user); })
      .catch((err) => {
        if (err.message.includes('Validation failed')) {
          return res.status(INCORRECT_ERROR_CODE).send({ message: 'Вы ввели некоректные данные' });
        }
        return res.status(DEFAULT_ERROR_CODE).send({
          message: 'Internal Server Error',
        });
      });
  });

const updateAvatar = (
  (req, res) => {
    const { avatar } = req.body;
    User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
      .then((user) => { if (!user) { return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Запрашиваемый пользователь не найден' }); } return res.send(user); })
      .catch((err) => {
        if (err.message.includes('Validation failed')) {
          return res.status(INCORRECT_ERROR_CODE).send({ message: 'Вы ввели некоректные данные' });
        }
        return res.status(DEFAULT_ERROR_CODE).send({
          message: 'Internal Server Error',
        });
      });
  });

module.exports = {
  getUserById,
  getUsers,
  createUser,
  updateUser,
  updateAvatar,
};
