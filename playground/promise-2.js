const request = require('request');

var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    var encodedAddress = encodeURIComponent(address);

    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
      json: true
    }, (error, response, body) => {
      if (body.status === 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      } else if (body.status === 'ZERO_RESULTS' || body.status === 'INVALID_REQUEST') {
        reject(`Unable to find that address.`);
      } else {
        reject('Unable to connect to Google servers.');
      }
    });
  })
}

geocodeAddress('0').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
})
