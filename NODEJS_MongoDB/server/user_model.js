var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email : {type: String, required: true},
  name : {type: String, required: true},
  password : {type: String, required: true},
  status : {type: Boolean, required: true}
})

var UserModel = mongoose.model('Usuario', userSchema)

module.exports = UserModel;
