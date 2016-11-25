var express = require('express');
var router = express.Router();
var hyperoptic = require('../hyperoptic');
var zoopla = require('../zoopla');
var Fuse = require('fuse.js');

var options = {
  include: ["score","matches"],
  shouldSort: true,
  threshold: 0.33,
  location: 0,
  distance: 50,
  maxPatternLength: 32,
  keys: [
    "displayable_address",
]
};

/* GET home page. */
router.get('/', function(req, res, next) {
  hyperoptic.getLocations("N7")
    .then(function(locations) {
      zoopla.getRentals("N7")
        .then(function(rentals) {
          var fuse = new Fuse(rentals, options); // "list" is the item array
          var results = [];
          locations.forEach(function(location) {
            var result = fuse.search(location.siteName.replace("The", ""));
            // store the location we've matched with
            result['location'] = location;
            console.log(result);
            results.push(result);
          });
          
          res.render('index', { title: 'Hyperoptic Rentals in N7', district: 'N7', results: results, locations: locations, rentals: rentals });    
        })
        .catch(next)
    })
    .catch(function(err) {
      res.render('error', { message: 'Error', error: err });
    })
});

module.exports = router;