// https://rest.bandsintown.com/artists/metalica/events?app_id=codingbootcamp
// let bandURL = `https://rest.bandsintown.com/${artists}/metalica/events?`;
// https://www.npmjs.com/package/print-message
// https://www.npmjs.com/package/node-spotify-api

require("dotenv").config();
// Add the code required to import the keys.js file and store it in a variable.
let keys = require("./key");
// npm install moment
let moment = require("moment");
// Spotify
let Spotify = require("node-spotify-api");
// axios
let axios = require("axios");
// PrintMessage
let print = require("print-message");

/* commands
 concert-this
 spotify-this-song
 movie-this
 do-what-it-says
*/
// Switch through commands
switch (process.argv[2]) {
  case "concert-this":
    consertThis("alok");
    break;
  case "spotify-this-song":
    spotifyThis("Hear me now");
    break;
  case "movie-this":
    movieThis("Movie name");
    break;
  case "do-what-it-says":
    console.log("inside do-what-it-says");
    break;
  default:
    console.error(colors.red, `Invalid Command "${process.argv[2]}"`);
    break;
}

/* ******************************************************************* */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* ******************************************************************* */

/* ******************************************************************* */
/* * * * * * * * * * * * * * consertThis() * * * * * * * * * * * * * * */
/* ******************************************************************* */
/*
node liri.js concert-this <artist/band name here>
This will search the Bands in Town Artist Events API 
(`https://rest.bandsintown.com/artists/${artist}events?app_id=codingbootcamp`)
for an artist and render the following information about each event to the terminal:
   * Name of the venue
   * Venue location
   * Date of the Event (use moment to format this as "MM/DD/YYYY")
 */
function consertThis(artist) {
  // API URL used for request
  let url = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;
  // Send request using Axios and Promisses
  axios.get(url).then(response => {
    // Loop through Object data to display each info
    for (let item of response.data) {
      // create a array to print info using print-message package
      let _venue = [
        // get venue name
        `Name : ${item.venue.name}`,
        // get venue location (city, country)
        `Location : ${item.venue.city}, ${item.venue.country}`,
        // get venue date (MM-DD-YYYY)
        `Date : ${moment(item.datetime).format("MM-DD-YYYY")}`
      ];
      // print-message
      print(_venue);
    }
  });
}
/* ****************************************************************** */
/* * * * * * * * * * * * * * spotifyThis()  * * * * * * * * * * * * * */
/* ****************************************************************** */
/*
node liri.js spotify-this-song '<song name here>'
This will show the following information about the song in your terminal/bash window
    * Artist(s)
    * The song's name
    * A preview link of the song from Spotify
    * The album that the song is from
If no song is provided then your program will default to "The Sign" by Ace of Base.
You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.
The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a client id and client secret:
    * Step One: Visit https://developer.spotify.com/my-applications/#!/
    * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.
    * Step Three: Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.
    * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the node-spotify-api package.
 */
function spotifyThis(song) {
  // Get Spotify keys
  var spotify = new Spotify(keys.spotify);
  // Set the search query
  let spotifySearch = {
    type: "track",
    query: song
  };
  // send request for Spotify API
  spotify
    .search(spotifySearch)
    // get the results from API (Promisses)
    .then(response => {
      // Loop thruogh tracks
      for (let data of response.tracks.items) {
        // Place track info into array
        let _info = [
          // Get Artist Name
          `Artist : ${data.artists[0].name}`,
          // Get Track Name
          `Track : ${data.name}`,
          // Get Track URL
          `Link : ${data.external_urls.spotify}`,
          // Get Track Album
          `Album : ${data.album.name}`
        ];
        // Use print-message to Display Info
        print(_info);
        //console.log(data);
      }
    });
}
/* ******************************************************************* */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* ******************************************************************* */
/*
node liri.js movie-this '<movie name here>'
This will output the following information to your terminal/bash window:
  * Title of the movie.
  * Year the movie came out.
  * IMDB Rating of the movie.
  * Rotten Tomatoes Rating of the movie.
  * Country where the movie was produced.
  * Language of the movie.
  * Plot of the movie.
  * Actors in the movie.
If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
It's on Netflix!
You'll use the axios package to retrieve data from the OMDB API. 
Like all of the in-class activities, the OMDB API requires an API key. You may use trilogy.
 */
function movieThis(monvie) {
  console.log("movieThis called");
}
