const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const WrongDataError = require('../utils/WrongDataError');
const User = require('../models/user');
const {
  NOT_FOUND_ERROR_CODE,
} = require('../utils/utils');
const NotFoundError = require('../utils/NotFoundError');

const getUserById = (
  (req, res, next) => {
    User.findById(req.params.id)
      .orFail(() => new Error('Not found'))
      .then((user) => { res.send(user); })
      .catch(next);
  });

const getUsers = (
  (req, res, next) => {
    User.find({})
      .then((usersData) => res.send(usersData))
      .catch(next);
  });

const getUser = (
  (req, res, next) => {
    User.findById(req.user._id)
      .orFail(() => new Error('Not found'))
      .then((user) => { res.send(user); })
      .catch(next);
  });

const createUser = (
  (req, res, next) => {
    const userData = {
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: req.body.password,
    };

    bcrypt.hash(String(req.body.password), 10)
      .then((hashedPassword) => {
        User.create({ ...userData, password: hashedPassword })
          .then((user) => res.status(201).send(user))
          .catch(next);
      });
  });

const updateUser = (
  (req, res, next) => {
    const { name, about } = req.body;
    User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
      .then((user) => { if (!user) { throw new NotFoundError(); } return res.send(user); })
      .catch(next);
  });

const updateAvatar = (
  (req, res, next) => {
    const { avatar } = req.body;
    User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
      .then((user) => { if (!user) { throw new NotFoundError(); } return res.send(user); })
      .catch(next);
  });

const login = (
  (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email })
      .select('+password')
      .orFail(() => new WrongDataError())
      .then((user) => {
        bcrypt.compare(String(password), user.password).then((isValidUser) => {
          if (isValidUser) {
            const jwt = jsonWebToken.sign({
              _id: user._id,
            }, 'SECRET');

            res.cookie('jwt', jwt, {
              maxAge: 360000,
              httpOnly: true,
              sameSite: true,
            });

            res.send({ data: user.toJSON() });
          } else {
            throw new WrongDataError();
          }
        });
      })
      .catch(next);
  }
);

module.exports = {
  getUserById,
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
