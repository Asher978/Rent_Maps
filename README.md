# <img src="http://sfrentindex.com/images/landlord.svg" height="70px"> SF & NYC Index 


### [Live Version](https://rent-maps.herokuapp.com/)

### Description

SF & NYC Index provides accurate, up-to-date, rent information for properties around the city. 

Potential Renters can easily compare prices with what neighbors pay in the area and historical trends to see if they are paying the right amount. Similarly landlords can know how to easily price their properties.

For real-estate purchases, most information is available online (previous selling price, neighbor's price, land value, etc.). Yet for renting, none of this information is available for renters or landlords - SF & NYC Index aims to change that by bringing price transparency to the market.

### Project Updates
This project is undergoing major development... Consistent updates will be provided. ~~A deployed version will be launched very soon where we will ask `USERS` to start providing the `DATA`~~ 
  - [x] Live version was realease: April 9th
  - [x] Live version updated: _colored radius is shown around clusters so they can be easily identified on the map_


### Why:
  * There is very little price transparency when renting an apartment. It is difficult to:
    * Know what neighbors are paying
    * Adjust for variations such as a size of property, neighborhoods, views, etc. 
    * When a particular lease was signed, which could affect the price.
    * Identify longer term trends about prices.

  * For renters, knowing if you are paying too much for your place is an important criteria for choosing an apartment.

### How will it work?

The key to making SF & NYC Index work is utilizing a pay to play model - where users have to contribute rent information in order to access other people’s info:
  * SF & NYC Index will contain crowdsourced rent information of others

  * In order to see rent information, individual users will have to either:
    * Contribute their own rent information
    * Share the website with two other people, who have to sign up

  * We will seed SF & NYC Index with rent information from our friends, craigslist, and
  other sources. We will seed the platform with 100 data points before launching fully.

### Long Term:
Become THE rental real-estate site for cities, Find apartments, roommates, etc.


### Stack Used
  - [x] Frontend is wrapped with React
  - [x] Backend is on Node/Express/Mongo
  - [x] Material-ui, SASS - styling
  - [x] React Leaflet - For Maps Integrations
  - [x] Mapbox - for providing custom Maplayers
  - [x] Google Places - parsing users addresses to `coordinates => [latitude, longitude]`

### Credits
Full credit of this project's idea goes to [Varun Bhartia](https://github.com/vbhartia) who has given me the opportunity to develop!



