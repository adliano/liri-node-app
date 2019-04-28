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

const colors = {
  blue: "\x1b[94m",
  cyan: "\x1b[36m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  reset: "\x1b[0m"
};

// Debug Momentjs
console.log(
  colors.green,
  `Momentjs is working, ${moment("2019-10-26T19:00:56").format("MM-DD-YYYY")}`,
  colors.reset
);

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
    console.log("inside spotify-this-song");
    break;
  case "movie-this":
    console.log("inside movie-this");
    break;
  case "do-what-it-says":
    console.log("inside do-what-it-says");
    break;
  default:
    console.error(colors.red, `Invalid Command "${process.argv[2]}"`);
    break;
}

// Spotify //
var spotify = new Spotify(keys.spotify);

let spotifySearch = {
  type: "track",
  query: "All the Small Things"
};

spotify
  .search(spotifySearch)
  .then(response => console.log(response.tracks.items[0].album.name));

/* ******************************************************************* */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* ******************************************************************* */

/* ******************************************************************* */
/* * * * * * * * * * * * * * consertThis() * * * * * * * * * * * * * * */
/* ******************************************************************* */
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
