const Router = require('express').Router();
const Events = require('./events_model.js')
const User = require('./user_model.js')

//Obtener User
Router.get('/login/:email/:pass', function(req, res) {
    let user_email = req.params.email;
    let user_password = req.params.pass;
    User.findOne({email:user_email,password:user_password}).exec(function(err, docs) {
        if (err) {
            res.status(500)
            res.json(err)
        }
        res.json(docs)
    })
})

//Obtener todos los eventos
Router.get('/all', function(req, res) {
    Events.find({}).exec(function(err, docs) {
        if (err) {
            res.status(500)
            res.json(err)
        }
        res.json(docs)
    })
})

// Obtener id de un usuario
Router.get('/', function(req, res) {
    let email = req.query.email
    Events.findOne({email: email}).exec(function(err, doc){
        if (err) {
            res.status(500)
            res.json(err)
        }
        res.json(doc)
    })
})

// Agregar a un nuevo evento
Router.post('/new', function(req, res) {
    let evento = new Eventos({
        eventoId: Math.floor(Math.random() * 50),
        titulo: req.body.titulo,
        fecha_inicio: req.body.fecha_inicio,
        hora_inicio: req.body.hora_inicio,
        fecha_fin: req.body.fecha_fin,
        hora_fin: req.body.fecha_fin,
        dia_completo: req.body.fecha_fin,
        user_id: req.body.user_id,
    })
    Events.save(function(error) {
        if (error) {
            res.status(500)
            res.json(error)
        }
        res.send("Evento guardado")
    })
})

// Eliminar un usuario por su id
Router.post('/events/delete/:id', function(req, res) {
    let uid = req.params.id
    Events.remove({userId: uid}, function(error) {
        if(error) {
            res.status(500)
            res.json(error)
        }
        res.send("Evento eliminado")
    })
})

module.exports = Router
