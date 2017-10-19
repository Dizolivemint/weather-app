
const darksky = require('./darksky/darksky')

const request = require('request');

var getWeather = (lng, lat, callback) => {
  // Get temperature from darksky
  request ({
    url: `https://api.darksky.net/forecast/${darksky.api}/${lng},${lat}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature,
        summary: body.currently.summary,
        humidity: body.currently.humidity,
        dewPoint: body.currently.dewPoint
      });
    } else {
      callback('Unable to fetch weather.');
    }
  });
};

module.exports.getWeather = getWeather;
