const Card = require('../models/card');
const {
  INCORRECT_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
} = require('../utils/utils');

const getCards = ((req, res) => {
  Card.find({}).then((cardsData) => res.send(cardsData))
    .catch(() => {
      res.status(DEFAULT_ERROR_CODE).send({
        message: 'Internal Server Error',
      });
    });
});

const deleteCardById = ((req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(() => new Error('Not found'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'Not found') {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Вы ввели некоректный ID' });
      }
      if (err.name.includes('CastError')) {
        return res.status(INCORRECT_ERROR_CODE).send({ message: 'Вы ввели некоректные данные' });
      }
      return res.status(DEFAULT_ERROR_CODE).send({
        message: 'Internal Server Error',
      });
    });
});

const createCard = ((req, res) => {
  const cardData = {
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  };

  Card.create(cardData)
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

const likeCard = ((req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new Error('Not found'))
    .then((user) => { res.status(201).send(user); })
    .catch((err) => {
      console.log(err.message);
      if (err.message === 'Not found') {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Запрашиваемый пользователь не найден' });
      }
      if (err.name.includes('CastError')) {
        return res.status(INCORRECT_ERROR_CODE).send({ message: 'Вы ввели некоректные данные' });
      }
      return res.status(DEFAULT_ERROR_CODE).send({
        message: 'Internal Server Error',
      });
    });
}
);

const dislikeCard = ((req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => new Error('Not found'))
  .then((user) => res.send(user))
  .catch((err) => {
    if (err.message === 'Not found') {
      return res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Вы ввели некоректный ID' });
    }

    if (err.name.includes('CastError')) {
      return res.status(INCORRECT_ERROR_CODE).send({ message: 'Вы ввели некоректные данные' });
    }
    return res.status(DEFAULT_ERROR_CODE).send({
      message: 'Internal Server Error',
      err: err.message,
      stack: err.stack,
    });
  }));

module.exports = {
  getCards, deleteCardById, createCard, likeCard, dislikeCard,
};
