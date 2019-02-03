const fetch = require('node-fetch');

exports.handler = async (event) => {
  const clientId = 'J4MRVIOL2HLL0HZ4C2YMLP14LQ3KLG52414DAFIV5GELG211';
  const clientSecret = 'IE43KAQRQGDFXCWZTQE0SSBFTQR4U4Q5AX4KZUO1AYCJ4QUX';
  const url = `https://developer.foursquare.com/docs/api/venues/explore?client_id=${clientId}&client_secret=${clientSecret}`
  
  const result = await fetch(url, {
      method: 'GET'
  });
  
  const response = {
      statusCode: 200,
      body: result,
  };
  return response;
};
