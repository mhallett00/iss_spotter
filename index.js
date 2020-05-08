const { nextISSTimesForMyLocation } = require('./iss');

// console logs the fly over times.
const logFlyOvers = (flyOvers) => {
  for (let pass of flyOvers) {
    const datetime = new Date(0);
    const duration = pass.duration;
    datetime.setUTCSeconds(pass.risetime);
    
    console.log(`Next fly over will be on ${datetime} for ${duration} seconds!`)
  };

}

// Calling function to get fly over times.
nextISSTimesForMyLocation((error, flyOvers) => {
  if (error) {
    return console.log("It didn't work!" , error);
  }

  logFlyOvers(flyOvers);
});






















// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// const ip = '70.31.78.233';

// fetchCoordsByIP (ip, (error, coords) => {
//   if (error) {
//     console.log("It didn't work!" , error)
//     return;
//   }

//   console.log('It worked! Returned Coords:' , coords);
// });

// const coords = { latitude: '43.51020', longitude: '-79.62960' };

// fetchISSFlyOverTimes(coords, (error, flyOvers) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned flyOvers:' , flyOvers);
// });