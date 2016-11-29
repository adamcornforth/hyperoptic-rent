var request = require('request');
var Xray = require('x-ray');
var x = Xray();

module.exports = {
  getLocations(postcode) {
    let locations = require('./data/locations');
    // return new Promise(function(resolve, reject) {
    //   request('https://www.hyperoptic.com/map/?q='+postcode, function (error, response) {
    //     // If we've got a response...
    //     if (!error && response.statusCode == 200) {
    //       // Grab the <head> tag
    //       x(response.body, 'head')(function(err, script) {
    //         // Parse for "var locations" in the <head>
    //         var locations_str = script.substring(script.indexOf('var locations = ')+17,
    //          script.indexOf('}];') +1);
    //         var locations = JSON.parse("[" + locations_str + "]");
    
    //         // Filter to only include locations Taking Orders
    //         locations = locations.filter(function(location) {
    //           return location.status == 'Taking Orders' && location.greaterCityLocator === postcode;
    //         });
    
    //         resolve(locations);
    //       });
    //     } else {
    //      reject({'status':404, 'message': "No response from Hyperoptic..."});
    //     }
    //   });
    // });
    return new Promise((resolve) => {
      // reject({'status':404, 'message': "No response from Hyperoptic..."});
      locations = locations.filter((location => location.status == 'Taking Orders' && location.greaterCityLocator === postcode));

      resolve(locations);
    });
  },
};
