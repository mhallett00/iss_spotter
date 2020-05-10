const { nextISSTimesForMyLocation }= require('./iss-promised');
const { logFlyOvers } = require('./log-fly-overs');

nextISSTimesForMyLocation()
  .then(logFlyOvers)
  // .catch((error) => {
  //   console.log("it didn't work!", error.message);
  // });