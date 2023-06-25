const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const limiter = require('./middlewares/limiter');
const router = require('./routes');
const errorHandler = require('./middlewares/error');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(helmet.xssFilter());
app.use(router);

app.use(limiter);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
