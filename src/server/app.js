const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { MONGO_URI } = require('../config/environment');
const loggers = require('../utils/loggers');
const router = require('../routes/routes');

const app = express();

app.use(cors());
app.use(express.json());

morgan.token('data', function (req) {
  if (Object.keys(req.body).length === 0) {
    return null;
  }
  return JSON.stringify(req.body);
});

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      tokens.data(req, res),
    ].join(' ');
  })
);

const mongoUrl = MONGO_URI;
mongoose.set('strictQuery', false);
loggers.info('connecting to', mongoUrl);
mongoose
  .connect(mongoUrl)
  .then(() => {
    loggers.info('connected to MongoDB');
  })
  .catch((error) => {
    loggers.error('error connecting to MongoDB:', error.message);
  });

app.use('/api/blogs', router);

module.exports = app;
