var request = require('request');

// const x = Xray();

module.exports = {
  getRentals(postcode) {
    const rentals = require('./data/rentals');
    // return new Promise(function(resolve, reject) {
    //   request('http://api.zoopla.co.uk/api/v1/property_listings.json?postcode='+postcode+'&radius=0&listing_status=rent&maximum_price=350&minimum_beds=1&maximum_beds=1&page_size=100&api_key=INVALID', function (error, response) {
    //     // If we've got a response...
    //     if (!error && response.statusCode == 200) {
    //       const result = JSON.parse(response.body);
    //       resolve(result.listing);
    //     } else {
    //       reject({'status':404, 'message': "No response from Zoopla..."});
    //     }
    //   });
    // });
    return new Promise(resolve => resolve(rentals.listing));
  },
};
