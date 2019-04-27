console.log("loading spotify keys.js");
// npm install dotenv
require("dotenv").config();

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.bandintown = {
  id: process.env.BAND_KEY
};
