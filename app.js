const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const router = require('./routes');
const errorHandler = require('./middlewares/error');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookieParser());
app.use(router);

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Ресурс не найден, проверьте путь и метод запроса' });
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT);
