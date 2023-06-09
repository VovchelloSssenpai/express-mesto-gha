const User = require('../models/user');

const getUserById = ('/users/:id',
(req, res) => {
  User.findById(req.params.id)
    .orFail(() => new Error('Not found'))
    .then((user) => { res.status(200).send(user); })
    .catch((err) => {
      if (req.params.id.length === 24) {
        return res.status(400).send({ message: 'Вы ввели некоректный ID' });
      }
      if (req.params.id.length !== '24') {
        return res.status(404).send({ message: 'Вы ввели некоректные данные' });
      }
      return res.status(500).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      });
    });
});

const getUsers = ('/users',
(req, res) => {
  User.find({})
    .then((usersData) => res.send(usersData))
    .catch((err) => {
      res.status(500).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      });
    });
});

const createUser = ('/users',
(req, res) => {
  User.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.message.includes('validation failed')) {
        return res.status(400).send({ message: 'Вы ввели некоректные данные' });
      }

      return res.status(500).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      });
    });
});

const updateUser = ('/users',
(req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message.includes('Validation failed')) {
        return res.status(400).send({ message: 'Вы ввели некоректные данные' });
      }
      if (err.message.includes('ObjectId failed')) {
        return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
      }
      return res.status(500).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      });
    });
});

const updateAvatar = ('/users',
(req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message.includes('Validation failed')) {
        return res.status(400).send({ message: 'Вы ввели некоректные данные' });
      }
      if (err.message.includes('ObjectId failed')) {
        return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
      }

      return res.status(500).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
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
