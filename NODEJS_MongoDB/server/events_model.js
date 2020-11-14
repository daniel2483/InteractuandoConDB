var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var eventosSchema = new Schema({
  eventoId : {type: String, required: true},
  titulo : {type: String, required: true},
  fecha_inicio : {type: Date, required: true},
  hora_inicio : {type: String},
  fecha_fin : {type: Date},
  hora_fin : {type: String},
  dia_completo : {type: Boolean, required: true},
  user_id : {type: Number, required: true}
})

var Eventos = mongoose.model('Events', eventosSchema)

module.exports = Eventos;
