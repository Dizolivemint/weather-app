const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather')

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

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(results.address);
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`Currently, the weather is ${weatherResults.summary}.`);
        console.log(`It is ${weatherResults.temperature} degrees and feels like ${weatherResults.apparentTemperature} degrees.`);
        console.log(`The humidity is ${weatherResults.humidity} percent with a Dew point at ${weatherResults.dewPoint}`);
      }
    });
  }
});
