const darksky = require('./darksky/darksky')

const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Address not found');
  }
  var lng = response.data.results[0].geometry.location.lng;
  var lat = response.data.results[0].geometry.location.lat;
  console.log(lat, lng);
  var weatherUrl = `https://api.darksky.net/forecast/${darksky.api}/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  console.log(weatherUrl)
  return axios.get(weatherUrl);
}).then((response) => {
  temperature = response.data.currently.temperature;
  apparentTemperature = response.data.currently.apparentTemperature;
  summary = response.data.currently.summary;
  humidity = response.data.currently.humidity;
  dewPoint = response.data.currently.dewPoint;
  console.log(`Currently, the weather is ${summary}.`);
  console.log(`It is ${temperature} degrees and feels like ${apparentTemperature} degrees.`);
  console.log(`The humidity is ${humidity} percent with a Dew point at ${dewPoint}`);
}).catch((e) => {
  if (e.code === 'ETIMEDOUT') {
    console.log('Timeout: Unable to reach server');
  } else {
    console.log(e.message);
  }
});
