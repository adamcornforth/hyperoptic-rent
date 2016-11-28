// src/server.js
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

import { Server } from 'http';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import NotFoundPage from './components/NotFoundPage';

const index = require('./../routes/index');
const locations = require('./../routes/locations');

const app = express();
const server = new Server(app);
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));
app.set('json spaces', 40);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// define the folder that will be used for static assets
app.use(express.static(path.join(__dirname, 'static')));

app.use('/', index);
app.get('/locations/:postcode', locations);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  const response = res;
  response.locals.message = err.message;
  response.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  response.status(err.status || 500);
  response.render('error');
});

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
