var request = require('request');
var Xray = require('x-ray');
var x = Xray();

// just cache a set of locations for now so we don't bug hyperoptic's servers!
var locations = require('./locations');

module.exports = {
  getLocations : function(district) {
    // uncomment to 
    // return new Promise(function(resolve, reject) {
    //   request('https://www.hyperoptic.com/map/?q='+district, function (error, response) {
    //     // If we've got a response...
    //     if (!error && response.statusCode == 200) {
    //       // Grab the <head> tag
    //       x(response.body, 'head')(function(err, script) {
    //         // Parse for "var locations" in the <head>
    //         var locations_str = script.substring(script.indexOf('var locations = ')+17, script.indexOf('}];') +1);
    //         var locations = JSON.parse("[" + locations_str + "]");

    //         // Filter to only include locations Taking Orders
    //         locations = locations.filter(function(location) {
    //           return location.status == 'Taking Orders';
    //         });

    //         resolve(locations);
    //       });
    //     } else {
    //      reject({'status':404, 'message': "No response from Hyperoptic..."});
    //     }
    //   });
    // });
    
    return new Promise(function(resolve, reject) {
        // reject({'status':404, 'message': "No response from Hyperoptic..."});
        locations = locations.filter(function(location) {
            return location.greaterCityLocator == "N7";
        });

        resolve(locations);
    }) 
  }
};