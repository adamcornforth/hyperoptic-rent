var request = require('request');

const rentals = require('./data/rentals');

// const x = Xray();

module.exports = {
  getRentals(postcode) {
    return new Promise(function(resolve, reject) {
      request('http://api.zoopla.co.uk/api/v1/property_listings.json?postcode='+postcode+'&radius=0&listing_status=rent&maximum_price=350&minimum_beds=1&maximum_beds=1&page_size=100&order_by=age&ordering=descending&api_key='+process.env.ZOOPLA_KEY, function (error, response) {
        // If we've got a response...
        if (!error && response.statusCode == 200) {
          const result = JSON.parse(response.body);
          resolve(result);
        } else {
          reject({'status':500, 'message': "No response from Zoopla. Perhaps your API keys aren't set?"});
        }
      });
    });
    // return new Promise(resolve => resolve(rentals));
  },
};
