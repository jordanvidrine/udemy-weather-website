const request = require('request');

//add new data to the forecast
//
//update the forecast string to include new data
//commit changes
//push to github and deploy to heroku
//test

const weatherUrl = 'https://api.darksky.net/forecast/bbc5c80a6e38213f7e85183e81ee1fa7/'

var forecast = (latitude, longitude, callback) => {
  const url = weatherUrl + + latitude +","+ longitude;
  request({url: url, json: true}, (err,res) => {
    if (err) {
      callback('Could not connect to weather API', undefined);
    } else if (res.body.error) {
      callback(res.body.error, undefined)
    } else {
      let data = res.body.currently
      callback(undefined,`${data.summary}. The current temperature is ${data.temperature} degrees, with a ${data.precipProbability}% chance of rain. Also! The Humidity is ${data.humidity}`)
    }
  })
}

module.exports = forecast
