var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email : {type: String, required: true},
  name : {type: Number, required: true},
  password : {type: Number, required: true},
  status : {type: Number, required: true}
})

var User = mongoose.model('usuarios', userSchema)

module.exports = User;
