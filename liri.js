// API used
// https://rest.bandsintown.com`;
// https://www.npmjs.com/package/print-message
// https://www.npmjs.com/package/node-spotify-api

// Load Eviroment variables
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
// File System
let fs = require("fs");

/* ******************************************************************* */
/* * * * * * * * * * * * * * consertThis() * * * * * * * * * * * * * * */
/* ******************************************************************* */
// node liri.js concert-this <artist/band name here>
// This will search the Bands in Town Artist Events API
// https://rest.bandsintown.com/artists/${artist}events?app_id=[API_ID]
function consertThis(artist) {
  const BIT_ID = keys.bandintown.id;
  // API URL used for request
  let url = `https://rest.bandsintown.com/artists/${artist}/events?app_id=${BIT_ID}`;
  // Send request using Axios and Promisses
  axios.get(url).then(response => {
    // Loop through Object data to display each info
    for (let item of response.data) {
      // for an artist and render the following information about each event to the terminal:
      // create a array to print info using print-message package
      let _venue = [
        // * Name of the venue
        `Name : ${item.venue.name}`,
        // * Venue location (city, country)
        `Location : ${item.venue.city}, ${item.venue.country}`,
        // * Date of the Event (use moment to format this as "MM/DD/YYYY")
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
The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a client id and client secret:
    * Step One: Visit https://developer.spotify.com/my-applications/#!/
    * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.
    * Step Three: Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.
    * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the node-spotify-api package.
 */
function spotifyThis(song = "The Sign") {
  // Utilize the node-spotify-api package in order to retrieve
  // song information from the Spotify API.
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
/* * * * * * * * * * * * * * movieThis() * * * * * * * * * * * * * * * */
/* ******************************************************************* */
// node liri.js movie-this '<movie name here>'
// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
// http://www.imdb.com/title/tt0485947/
function movieThis(monvie = "Mr. Nobody") {
  // OMDB API requires an API key
  const IMDB_KEY = keys.imdb.key;
  // API URL
  let _url = `http://www.omdbapi.com/?apikey=${IMDB_KEY}&t=${monvie}`;
  // use the axios package to retrieve data from the OMDB API.
  axios
    .get(_url)
    // get the response
    .then(response => response.data)
    // get the data object
    .then(dataObj => {
      // This will output the following information to your terminal/bash window:
      console.log("-".repeat(65));
      // * Title of the movie.
      console.log(`Title : ${dataObj.Title}`);
      // * Year the movie came out.
      console.log(`Release Year : ${dataObj.Released.split(" ")[2]}`);
      // * IMDB Rating of the movie.
      console.log(`IMDB Rating : ${dataObj.Ratings[0].Value}`);
      // * Rotten Tomatoes Rating of the movie.
      console.log(`Rotten Tomatoes Rating : ${dataObj.Ratings[1].Value}`);
      // * Country where the movie was produced.
      console.log(`Country : ${dataObj.Country}`);
      // * Language of the movie.
      console.log(`Language : ${dataObj.Language}`);
      // * Plot of the movie.
      console.log(`Plot : ${dataObj.Plot}`);
      // * Actors in the movie.
      console.log(`Actors : ${dataObj.Actors}`);
      console.log("-".repeat(65));
    });
}
/* ******************************************************************* */
/* * * * * * * * * * * * * * doWhatItSay() * * * * * * * * * * * * * * */
/* ******************************************************************* */
/*
node liri.js do-what-it-says
Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
Edit the text in random.txt to test out the feature for movie-this and concert-this.
*/
function doWhatItSay() {
  // File System used to read from text file
  fs.readFile("./random.txt", "utf8", function(err, textData) {
    // Check for error
    if (err) {
      return console.log(err);
    }
    // get data from text file and split using ','
    let _tempArr = textData.split(",");
    // Call runLiri()
    runLiri(_tempArr[0], _tempArr[1]);
  });
}
/* ******************************************************************* */
/* * * * * * * * * * * * * runLiri() * * * * * * * * * * * * * * * * * */
/* ******************************************************************* */
// Switch through commands
// concert-this, spotify-this-song, movie-this, do-what-it-says
function runLiri(_command, _argv) {
  switch (_command) {
    case "concert-this":
      consertThis(_argv);
      break;
    case "spotify-this-song":
      spotifyThis(_argv);
      break;
    case "movie-this":
      movieThis(_argv);
      break;
    case "do-what-it-says":
      doWhatItSay();
      break;
    default:
      print([`Invalid Command "${_command}"`], {
        color: "red",
        borderColor: "red",
        marginTop: 2,
        marginBottom: 2
      });
      break;
  }
}
///////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
runLiri(process.argv[2], process.argv[3]);
