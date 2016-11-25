var request = require('request');
var Xray = require('x-ray');
var express = require('express')
var app = express()
var x = Xray();

var postcode_districts = ["N7"];

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  for (var i = postcode_districts.length - 1; i >= 0; i--) {
    (function(i){
      // Make a request for this district/postcode
      request('https://www.hyperoptic.com/map/?q='+postcode_districts[i], function (error, response) {
        // If we've got a response...
        if (!error && response.statusCode == 200) {
          // Grab the <head> tag
          x(response.body, 'head')(function(err, script) {
            // Parse for "var locations" in the <head>
            var locations_str = script.substring(script.indexOf('var locations = ')+17, script.indexOf('}];') +1);
            var locations = JSON.parse("[" + locations_str + "]");

            // Filter to only include locations Taking Orders
            locations = locations.filter(function(location) {
              return location.status == 'Taking Orders';
            });

            /**
             * Output name of each for now
             * @param location The location
             * @param location.siteId The ID of the location
             * @param location.siteName The name "street" of the location
             * @param location.greaterCityLocator The postcode district used to identify the location
             */
            locations.forEach(function(location) {
              res.send(location.siteId + ": " + location.siteName + " ("+location.greaterCityLocator+")");
            });
          });
        }
      });
    })(i);
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})