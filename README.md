# Cerebro

[Demo](https://jiahaog.com/cerebro) | [Source](https://github.com/jiahaog/cerebro)

Team Name: Goh Bros

Team Members: 

- Goh Jia Hao 
- Chong Zhi Wei 
- Wong Jun Xiang

## Project Concept:

> An exploration of utilising “Real-Time” visualisations of bus locations over the course of a day projected on to the Singapore map for a greater understanding of Singapore's Transport Service. 
Project Outline:

Our web application has a data pipeline consisting of three major components: 

- Data Scrapper 
- Analysis
- Front End Visualisation Client  

## Installation

With Node.js installed:

```bash
# clone the repo
git clone git@github.com:jiahaog/cerebro.git
cd cerebro

# install dependencies
npm install

# watch files
# website is available locally at http://localhost:3000
npm run watch

# or build files into ./dist
npm run build
```

## Data Collection

We also used data from [BusRouter-SG](https://github.com/cheeaun/busrouter-sg) to obtain information on bus stop locations and bus routes. Joining and augmenting data, we were able to get the mapping from bus route to all bus stops. For each bus stop in the route, we would then query for the location of the buses arriving at that bus stop.

To facilitate the data collection, we deployed a dedicated server on DigitalOcean to query the [Datamall](http://www.mytransport.sg/content/mytransport/home/dataMall.html) API at 1 minute intervals. During this step we also filter bad data, where the coordinates of the buses were undefined, and extract the necessary fields to reduce the size of the payload.

## Analysis

With the data that we have, it was difficult to interpolate the markers denoting buses, especially across bus stops as there was no good way to keep track of the buses across bus stops. As such we augmented the data by calculating the distance between each bus and their next bus stop, using it as a guideline to track for each bus stop the relative locations of the 3 buses over time.

The full algorithm is as follows:

1. At each time step, compare the buses at each bus stop with the buses at next time step
2. Sort the array of buses by distance to the bus stop
3. Compare element-wise the arrays at `t = 0` with those in   `t = 1` 
4. For each element, if the distance increased, we deduce that the bus has passed the stop, and set the next destination at the bus stop. Else, we move the bus to coordinates of `t = 1` 

This seemed to work for certain areas, but at the same time lead to a ‘flying-bus’ phenomena due to missing data causing markers to move towards the bus stop prematurely at step 4. To mitigate this problem we added a threshold check at step 4 before deciding to move a bus to the bus stop.

## Visualization

We intend to build a similar version of [http://tracker.geops.ch/](http://tracker.geops.ch/) for Singapore buses. Our technology stack is as follows:                                           

- [Node.js](https://nodejs.org/en/) for backend
- [Elasticsearch](https://www.elastic.co/products/elasticsearch) for database
- [Mapbox GL](https://www.mapbox.com/mapbox-gl-js/api/) Javascript library to visualise the maps on the browser
- [React](https://facebook.github.io/react/)-[Redux](http://redux.js.org/) Web app architecture

To build the visualisation, the project is split into the front and back end. The back end server is responsible for data collection, while the front end is a web page which displays the map with data retrieved from the server.

### Back End

As mentioned above the back end is a `cron` job scheduled to query the LTA end point and preprocess it before outputting as `JSON` or storing it in `ElasticSearch` . The server’s endpoint was then exposed to facilitate the front end querying for data according to a date range.

### Front End

A React-Redux front-end architecture is used to structure the app, and it is supported by the Mapbox GL library to display a customised vector map.

We were able to customise our map using Mapbox Studio, and most elements of the map were darkened and removed, so as to highlight the route of the bus. Bus stops of along the route of Bus 2 were also added to the tileset.

When the webpage is loaded, the client loads data about the bus stops and routes initially, and interpolation is carried out on the client side before the page is loaded. It would be better to offload the computation of the routes to the back end in a complete implementation, this implementation is simply to facilitate debugging during development.

## Limitations

Due to performance limitations, in our demo web page the visualisation is limited to the route for bus 2, and is also based on a cached dataset.

The visualisation of the bus routes is not optimised for animation. Before every time step, the browser has to recalculate the positions between the current locations of each markers and the next position before starting the animation. This can be addressed by performing the calculations at the time step before the animation, possibly according to the principles of FLIP https://aerotwist.com/blog/flip-your-animations/.

The stream of data provided by LTA’s API is not consistent, the set of data for the whole bus stop can disappear at times for many consecutive intervals. This results in complete blanks in between certain sections of the route for a time step. Despite the threshold checks put in place in our algorithm to catch this error, we are unable to fill in the data void and it messes up the order of of our markers, resulting in points often disappearing.

The size of our scrapped data is too huge to be bulk loaded by the client. From our initial collections of a single bus service, a day’s records at a once per minute frequency is about 40 mb. Thus, there is a need for a service that provides only the relevant range of data that is being viewed. Exploration was done in using an Elasticsearch database to serve as the medium but was ultimately dropped due to time constraints and technical difficulties faced.
 
## Post-Mortem

![Analysis](https://cdn.rawgit.com/jiahaog/cerebro/master/docs/analysis.svg)

In lieu of the problem with missing data, we did an analysis on the density of bus points. The counts represent the number of times buses were found in the hexagon during the query. Assuming that bus stops are well spaced out, we are able to see how the quality of the data differs in various areas. The west side suffers most heavily from this problem, explaining why buses there appear less. The range of the counts is quite big, with most areas being on the low side of the spectrum. This is telling about the inferior quality of the API - the Achilles Heel of Cerebro.
