// https://rest.bandsintown.com/artists/metalica/events?app_id=codingbootcamp
// let bandURL = `https://rest.bandsintown.com/${artists}/metalica/events?`;
// npm install dotenv

const colors = {
  red: "\x1b[31m",
  green: "\x1b[32m",
  reset: "\x1b[0m"
};

//require("./.env").config();

//let keys = require("./keys.js");

//let usrInput = process.argv;

//console.log(keys.spotify);
//console.dir(usrInput);

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
