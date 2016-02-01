'use strict';

var mongoose = require('mongoose');
var moment = require('moment');
var Person;

var personSchema = mongoose.Schema({
  company: String,
  name: {first: String,
    last: String},
  gender: String,
  likes: [{String}],
  dislikes: [{String}],
  age: {type: Number, min: 1, max: 100},
  // education: String,
  birthday: {type: Date},
  createdAt: {type: Date, default: Date.now }
});

//age linked with birthday
personSchema.pre('save', function(next) {
  this.age = moment().diff(moment(this.birthday), 'years');
  next();
});

Person = mongoose.model('Person', personSchema);
// Person = mongoose.model('person', personSchema);

module.exports = Person;
