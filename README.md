# Hyperoptic Rentals Finder 

Quick tool which returns the "enabled" Hyperoptic (1Gbps fibre) locations for a given postcode district using the Zoopla property API.

> **Note**: Please be smart about how you scrape data and please do not use these tools without the permission of any target websites, or for commercial purposes. This tool has been created for learning purposes only!

## Sample Output 
![Sample output](http://i.imgur.com/TpTVIOn.png)

## Instructions 

Install with `npm install`, run with `npm start`. 

Access the project at `localhost:3000`.

## Todo

- [x] Add functionality to fetch Hyperoptic locations
- [x] Add functionality to fetch Zoopla Rentals
- [x] Add express route that parses the Hyperoptic and Zoopla results and creates a list of Hyperoptic enabled rentals
- [x] Make the Hyperoptic locations / Zoopla Rentals return a fixed data set for now (to save API calls)
- [x] Implement basic Google Maps React component
- [x] Implement Locations List React component
- [ ] Improve Google Maps React component (centering on markers, hover over markers, etc)
- [ ] Allow users to input their own Zoopla API key so they can perform their own searches
- [ ] Add additional styling to the results/locations list
- [ ] Allow tweaking of Zoopla API calls (filtering on radius, number of beds, price, etc)

## Information Sources 

Hyperoptic location data is retrieved from their listings pages.

Rental information provided by the [Zoopla Property API](http://developer.zoopla.com/).
![Powered by Zoopla](http://www.zoopla.co.uk/static/images/mashery/powered-by-zoopla-150x73.png)
