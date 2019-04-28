// https://rest.bandsintown.com/artists/metalica/events?app_id=codingbootcamp
// let bandURL = `https://rest.bandsintown.com/${artists}/metalica/events?`;

const colors = {
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
  `Momentjs is working, today is ${moment().date()}`,
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
    console.log("inside concert-this");
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
