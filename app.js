const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

// eslint-disable-next-line no-unused-vars
const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64808a18bbc62395be705a4e',
  };

  next();
});
app.use(router);

app.all('*', (req, res) => {
  res.status(404).send({ message: 'Ресурс не найден, проверьте путь и метод запроса' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
