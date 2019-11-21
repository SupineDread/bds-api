const mongoose = require('mongoose')
const findOrCreate = require('mongoose-find-or-create')

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  role:{
    type: String
  }
});

UserSchema.plugin(findOrCreate)

module.exports = mongoose.model('User', UserSchema);