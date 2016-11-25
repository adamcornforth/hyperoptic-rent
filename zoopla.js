var request = require('request');
var Xray = require('x-ray');
var x = Xray();

// just cache a set of rentals for now so we don't bug hyperoptic's servers!
var rentals = require('./rentals');

module.exports = {
  getRentals : function(postcode) {
    return new Promise(function(resolve, reject) {
        // reject({'status':404, 'message': "No response from Zoopla..."});
        resolve(rentals.listing);   
    }) 
  }
};