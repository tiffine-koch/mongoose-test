var express = require('express');
var router = express.Router();

var Person = require('../models/person');


/* GET persons listing. */
router.get('/', function(req, res) {
  Person.find({}, function(err, persons) {
    res.status(err ? 400 : 200).send(err || persons);
  });
});
// router.get('/', function(req, res) {
  // req.query === {}; //no query
  //GET localhost:3000/persons?company=MARAVANE&sort=age
  //key/value pair separated by equal sign
  //when we make the get request- special find by users
  // req.query === {company: "MARVANE"};

//   Person.find({}).limit(20).exec(function(err, persons) {
//     res.status(err ? 400 : 200).send(err || persons);
//   });
// });

//same route different query strings - as many or as few
router.post('/', function(req, res) {
  // var person = req.body;
  Person.create(req.body, function(err, person) {
    res.status(err ? 400 : 200).send(err || person);
  });
});



module.exports = router;
