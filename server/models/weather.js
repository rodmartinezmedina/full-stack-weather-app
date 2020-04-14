const request = require('request-promise');

const API_KEY = "0310a08011b70cc7fea7200e55f868e7";

class Weather {
  static retrieveByCity (city, callback) {
    request({
      uri: `api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units-metric`,   // <= where the data is exracted from
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