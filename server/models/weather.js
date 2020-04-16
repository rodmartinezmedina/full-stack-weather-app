const request = require('request-promise');

const API_KEY = `7f50425f6786422f2bd9b71c1375e313`;

class Weather {
  static retrieveByCity (city, callback) {
    request({
      uri: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,   // <= where the data is exracted from
      json: true
    })
    .then(function (res) {
      callback(res);
    })
    .catch(function (err) {
      console.log(err);
      callback({ error: 'Could not reach OpenWeatherMap API.' });
    });
  }
}

module.exports = Weather;