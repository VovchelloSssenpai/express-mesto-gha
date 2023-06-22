const Card = require('../models/card');
const DefaultError = require('../utils/DefaultError');
const IncorrectError = require('../utils/IncorrectError');
const NotFoundError = require('../utils/NotFoundError');
const LimitedAccessError = require('../utils/LimitedAccessError');

const getCards = ((req, res, next) => {
  Card.find({}).then((cardsData) => res.send(cardsData))
    .catch(next);
});

const deleteCardById = ((req, res, next) => {
  Card.findById(req.params.id)
    .orFail(() => new Error('Not found'))
    .then((user) => {
      if (req.user._id !== user.owner.toString()) {
        next(new LimitedAccessError());
      }
      return Card.findByIdAndRemove(req.params.id).then((data) => res.send(data));
    })
    .catch(next);
});

const createCard = ((req, res, next) => {
  const cardData = {
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  };

  Card.create(cardData)
    .then((user) => res.status(201).send(user))
    .catch(next);
});

const likeCard = ((req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => new Error('Not found'))
    .then((user) => { res.status(201).send(user); })
    .catch(next);
}
);

const dislikeCard = ((req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => new Error('Not found'))
  .then((user) => res.send(user))
  .catch(next));

module.exports = {
  getCards, deleteCardById, createCard, likeCard, dislikeCard,
};
