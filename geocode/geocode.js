const request = require('request');

var geocodeAddress = (address, callback) => {
  // console.log(encodeURIComponent(argv.address));
  var encodedAddress = encodeURIComponent(address);

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    if (body.status === 'ZERO_RESULTS' || body.status === 'INVALID_REQUEST') {
      callback(`Unable to find that address.`);
    } else if (body.status === 'OK') {
      // console.log(JSON.stringify(body, undefined, 2));
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
      // console.log(`Address: ${body.results[0].formatted_address}`);
      // console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
      // console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
    } else {
      callback('Unable to connect to Google servers.');
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;
