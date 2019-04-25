// https://rest.bandsintown.com/artists/metalica/events?app_id=codingbootcamp
let bandURL = `https://rest.bandsintown.com/${artists}/metalica/events?`;

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
    console.error(`%cInvalid Command`, `color:red;`);
    break;
}
