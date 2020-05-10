// console logs the fly over times.
const logFlyOvers = (flyOvers) => {
  for (let pass of flyOvers) {
    const datetime = new Date(0);
    const duration = pass.duration;
    datetime.setUTCSeconds(pass.risetime);
    
    console.log(`Next fly over will be on ${datetime} for ${duration} seconds!`)
  };

}


module.exports = { logFlyOvers };