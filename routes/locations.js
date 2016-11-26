const express = require('express');
const hyperoptic = require('./models/hyperoptic');
const zoopla = require('./models/zoopla');
const Fuse = require('fuse.js');

const router = express.Router();

const options = {
  include: ['score'],
  shouldSort: true,
  threshold: 0.33,
  location: 0,
  distance: 50,
  maxPatternLength: 32,
  keys: [
    'displayable_address',
  ],
};

/**
 * Gets the matched locations
 */
router.get('/locations', (req, res, next) => {
  hyperoptic.getLocations('N7')
    .then((locations) => {
      zoopla.getRentals('N7')
        .then((rentals) => {
          // initiate a fuzzy search on the rentals
          const fuse = new Fuse(rentals, options);
          const results = [];

          locations.forEach((location) => {
            let result = fuse.search(location.siteName.replace('The', ''));
            // store the location we've matched with
            if(result[0] !== undefined) {
              result = {location, results: result.length, result}
            } else {
              result = {location, results: 0, result: []};
            }
            results.push(result);
          });
          res.json(results);
        })
        .catch(next);
    })
    .catch((err) => {
      res.render('error', { message: 'Error', error: err });
    });
});

module.exports = router;
