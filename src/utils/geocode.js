const request = require('request');

const mapUrlBeg = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
const mapUrlEnd = ".json?access_token=pk.eyJ1Ijoiam9yZGFudmlkcmluZSIsImEiOiJjanZjdGw5NHIwMXc4NDRwbmg3cHNyM3Q0In0.EoAg-ZKQSmDqilHZQELSBA&limit=1"

var geocode = (address, callback) => {
  const url = mapUrlBeg + encodeURIComponent(address) + mapUrlEnd;
  request({url: url, json: true}, (err,res) => {
    if (err) {
      callback('Unable to connect to location services', undefined)
    } else if (res.body.features.length === 0) {
      callback('Unable to find location. Try another search.',undefined)
    } else {
      callback(undefined, {
        latitude: res.body.features[0].center[1],
        longitude: res.body.features[0].center[0],
        location: res.body.features[0].place_name,
      })
    }
  })
}

module.exports = geocode
