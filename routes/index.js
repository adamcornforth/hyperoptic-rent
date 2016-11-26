const express = require('express');
const hyperoptic = require('../hyperoptic');
const zoopla = require('../zoopla');
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

/* GET home page. */
router.get('/', (req, res, next) => {
  hyperoptic.getLocations('N7')
    .then((locations) => {
      zoopla.getRentals('N7')
        .then((rentals) => {
          // initiate a fuzzy search on the rentals
          const fuse = new Fuse(rentals, options);
          const results = [];

          locations.forEach((location) => {
            const result = fuse.search(location.siteName.replace('The', ''));
            // store the location we've matched with
            result.location = location;
            results.push(result);
          });

          res.render('index', { title: 'Hyperoptic Rentals in N7', district: 'N7', results, locations, rentals });
        })
        .catch(next);
    })
    .catch((err) => {
      res.render('error', { message: 'Error', error: err });
    });
});

module.exports = router;
