// https://rest.bandsintown.com/artists/metalica/events?app_id=codingbootcamp
// let bandURL = `https://rest.bandsintown.com/${artists}/metalica/events?`;
// https://www.npmjs.com/package/print-message

const colors = {
  blue: "\x1b[94m",
  cyan: "\x1b[36m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  reset: "\x1b[0m"
};

require("dotenv").config();

// Add the code required to import the keys.js file and store it in a variable.
let keys = require("./key");

// npm install moment
let moment = require("moment");

// Debug Momentjs
console.log(
  colors.green,
  `Momentjs is working, ${moment("2019-10-26T19:00:56").format("MM-DD-YYYY")}`,
  colors.reset
);

// https://www.npmjs.com/package/node-spotify-api
let Spotify = require("node-spotify-api");

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
  console.log("inside consert this function");
  let axios = require("axios");
  let url = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;
  axios.get(url).then(response => {
    for (let item of response.data) {
      console.log(colors.blue, "----------------------", colors.reset);
      console.log(`Name : ${item.venue.name}`);
      console.log(`Location : ${item.venue.city}, ${item.venue.country}`);
      let _date = moment(item.datetime).format("MM-DD-YYYY");
      console.log(`Date : ${_date}`);
    }
  });
}
