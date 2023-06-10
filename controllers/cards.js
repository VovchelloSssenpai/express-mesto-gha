const Card = require('../models/card');

const getCards = ('/cards', (req, res) => {
  Card.find({}).then((cardsData) => res.send(cardsData))
    .catch((err) => {
      res.status(500).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      });
    });
});

const deleteCardById = ('/cards/:id', (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(() => new Error('Not found'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (req.params.cardId.length === 24) {
        return res.status(404).send({ message: 'Вы ввели некоректный ID' });
      }
      if (req.params.cardId.length !== '24') {
        return res.status(400).send({ message: 'Вы ввели некоректные данные' });
      }
      return res.status(500).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      });
    });
});

const createCard = ('/cards', (req, res) => {
  Card.create({ ...req.body, owner: req.user._id })
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

const likeCard = ('/cards', (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new Error('Not found'))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.stack.includes('Not found')) {
        return res.status(404).send({ message: 'Вы ввели некоректный ID' }); }
      if (err.name.includes('CastError')) {
        return res.status(400).send({ message: 'Вы ввели некоректные данные' });
      }
      return res.status(500).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      });
    });
}
);

const dislikeCard = ('/cards', (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
).then((user) => { if (user === null) { return res.status(404).send({ message: 'Вы ввели некоректный ID' }); } return res.status(200).send(user); })
  .catch((err) => {
    if (err.name.includes('CastError')) {
      return res.status(400).send({ message: 'Вы ввели некоректные данные' });
    }
    return res.status(500).send({
      message: 'Internal Server Error',
      err: err.message,
      stack: err.stack,
    });
  }));

module.exports = {
  getCards, deleteCardById, createCard, likeCard, dislikeCard,
};
