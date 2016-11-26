// var request = require('request');
// const Xray = require('x-ray');
// just cache a set of rentals for now so we don't bug hyperoptic's servers!
const rentals = require('./data/rentals');

// const x = Xray();

module.exports = {
  getRentals() {
    return new Promise(resolve => resolve(rentals.listing));
  },
};
