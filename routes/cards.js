const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards, deleteCardById, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), deleteCardById);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().uri().required(),
  }),
}), createCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), likeCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), dislikeCard);

module.exports = router;
