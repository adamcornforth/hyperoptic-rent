import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './../routes';
import NotFoundPage from './../components/NotFoundPage';

const express = require('express');
const hyperoptic = require('./models/hyperoptic');
const zoopla = require('./models/zoopla');
const Fuse = require('fuse.js');

const router = express.Router();

const options = {
  include: ['score', 'matches'],
  shouldSort: true,
  threshold: 0.33,
  location: 0,
  distance: 50,
  maxPatternLength: 32,
  keys: [
    'displayable_address',
  ],
};

// universal routing and rendering
router.get('/', (req, res, err) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {

      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps}/>);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      res.render('index', { markup });

    },
  );
});

module.exports = router;
