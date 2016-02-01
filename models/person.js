'use strict';

var mongoose = require('mongoose');
var moment = require('moment');
var Person;

var personSchema = mongoose.Schema({
  occupation: String,
  name: {first: String,
    last: String},
  age: {type: Number, min: 1, max: 100},
  likes: [String],
  dislikes: [String],
  gender: String,
  education: String,
  birthday: {type: Date},
  createdAt: {type: Date, default: Date.now }
})

//age linked with birthday
personSchema.pre('save', function(next) {
  this.age = moment().diff(moment(this.birthday), 'years');
  next();
});

personSchema.statics.create = function(personObj, callback){
  var person = new Person(personObj);
  person.save(callback)
}

personSchema.statics.showAll = function(req, callback){
  Person.find({}, function(err, people){
    callback(err, people);
  });
}

personSchema.statics.doQuery = function(req, callback){
  console.log("req", req.body.query);
  Person.find(req.body.query, function(err, people){
    callback(err, people);
  });
}

Person = mongoose.model('Person', personSchema);
// Person = mongoose.model('person', personSchema);

module.exports = Person;
