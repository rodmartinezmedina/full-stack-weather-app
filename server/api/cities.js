const express = require ('express');
const Cities = require ('../models/cities');

var router = express.Router();

router.get('/', function (req, res) {
  Cities.retrieveAll(function (err, cities) {
    if(err)
      return res.json(err);
    return res.json(cities);
  });
});


router.post('/', function(req, res) {
  var city = req.body.city;

  Cities.insert(city, function (err, resulsts {
    if (err)
      return res.json(err);
    return res.json(result);
  }));
})