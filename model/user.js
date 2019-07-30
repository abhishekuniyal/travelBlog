const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userId: {
    type: String,
    unique: true
  },
  firstName: String,
  lastName: String,
  age: Number,
  city: String
}) 

module.exports = mongoose.model('User',UserSchema)