const express = require('express');
const hyperoptic = require('./models/hyperoptic');
const zoopla = require('./models/zoopla');
const Fuse = require('fuse.js');

const router = express.Router();

const options = {
  include: ['score'],
  shouldSort: true,
  threshold: 0.3,
  location: 0,
  distance: 50,
  maxPatternLength: 32,
  tokenize: true,
  matchAllTokens: true,
  keys: [
    'displayable_address',
  ],
};

/**
 * Gets the matched locations
 */
router.get('/locations/:postcode', (req, res, next) => {
  const postcode = req.params.postcode;
  hyperoptic.getLocations(postcode)
    .then((locations) => {
      console.log('got '+locations.length+' locations');
      zoopla.getRentals(postcode)
        .then((rentals) => {
          console.log('got '+rentals.length+' rentals');
          // initiate a fuzzy search on the rentals
          const fuse = new Fuse(rentals, options),
            results = [];

          locations.forEach((location) => {
            let result = fuse.search(location.siteName.replace('The', ''));
            // store the location we've matched with
            if(result[0] !== undefined) {
              result = {location, results: result.length, result}
              results.push(result);
            // } else {
            //   result = {location, results: 0, result: []};
            }
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
