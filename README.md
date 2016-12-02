# Hyperoptic Rentals Finder 

Quick tool which returns the "enabled" Hyperoptic (1Gbps fibre) locations for a given postcode district using the Zoopla property API. 

## Demo

[Click here](hyperental.herokuapp.com) for a demo. Please note that this is using my Zoopla API key which has a max of 100 calls per hour, so please be nice!

> **Note**: Please be smart about how you scrape data and please do not use these tools without the permission of any target websites, or for commercial purposes. This tool has been created for learning purposes only!

## Sample Output 
![Sample output](http://i.imgur.com/DvPJg9b.png)

## Instructions 

Firstly [sign up for a Zoopla API key](http://developer.zoopla.com/).

Rename the `.env.example` file to `.env` and populate it with your Zoopla API key: 

```
ZOOPLA_KEY=ZOOPA_KEY_HERE
```

Install the project dependencies with `npm install`, run with `npm run dev`. 

Access the project at `http://localhost:3000`.

### Build 

You can build the project to the `dist/` directory and then serve up the project using:

```
npm run build
npm start
```

### Deploy with Heroku

Firstly you'll need to install the [Heroku toolbelt](https://toolbelt.heroku.com/) and [sign up to Heroku](https://www.heroku.com). 

Create your heroku application with the nodejs buildpack:

```
heroku create your-project-name --buildpack https://github.com/heroku/heroku-buildpack-nodejs\#v83
```

Deploy to heroku with: 

```
git push heroku master
```

And then open your application with `heroku open`.

## Todo

- [x] Add functionality to fetch Hyperoptic locations
- [x] Add functionality to fetch Zoopla Rentals
- [x] Add express route that parses the Hyperoptic and Zoopla results and creates a list of Hyperoptic enabled rentals
- [x] Make the Hyperoptic locations / Zoopla Rentals return a fixed data set for now (to save API calls)
- [x] Implement basic Google Maps React component
- [x] Implement Locations List React component
- [x] Add additional styling to the results/locations list
- [x] Improve Google Maps React component (centering on markers, hover over markers, etc)
- [x] Allow custom Zoopla API key via .env so people can perform their own searches
- [ ] Allow tweaking of Zoopla API calls (filtering on radius, number of beds, price, etc)

## Information Sources 

Hyperoptic location data is retrieved from their listings pages.

Rental information provided by the [Zoopla Property API](http://developer.zoopla.com/).
![Powered by Zoopla](http://www.zoopla.co.uk/static/images/mashery/powered-by-zoopla-150x73.png)
