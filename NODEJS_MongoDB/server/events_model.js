var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var eventosSchema = new Schema({
  id : {type: String, required: true},
  title : {type: String, required: true},
  start : {type: String, required: true},
  end : {type: String},
  allday : {type: Boolean, required: true},
  user : {type: String, required: true}
})

var Events = mongoose.model('Events', eventosSchema)

module.exports = Events;
