const request = require('request');

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) return callback(error, null);
    
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) return callback(error, null);

      fetchISSFlyOverTimes(coords, (error, flyOvers) => {
        if (error) return callback(error,null);
        
        callback(null, flyOvers);
      });
    });
  });
};

//IP pull
const fetchMyIP = function(callback) {
  const url = 'https://api.ipify.org?format=json';
  request(url, (error, response, body) => {
    if (error) return callback("Invalid IP URL", null);
    
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

// Geo coordinates pull
const fetchCoordsByIP = function(ip, callback) {
  const url = 'https://ipvigilante.com/json/' + ip;
  
  request(url, (error, response, body) => {
    if (error) return callback("invalid geo coord URL", null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Geocoords: ${body}`), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body).data;
    callback(null, { latitude, longitude });

  });

};

// ISS flyover pull
const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  
  request(url, (error, response, body) => {
    if (error) return callback("invalid flyover URL", null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Flyover: ${body}`), null);
      return;
    }

    const flyOvers = JSON.parse(body).response;
    callback(null, flyOvers);

  });
};

module.exports = { nextISSTimesForMyLocation };
