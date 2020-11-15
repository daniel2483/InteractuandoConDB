const Router = require('express').Router();
const Events = require('./events_model.js')
const Users = require('./user_model.js')

//Login access
Router.post('/login', function(req, res) {
    let user_email = req.body.user;
    let user_password = req.body.pass;
    //console.log(user_email);
    //console.log(user_password);
    Users.findOne({email:user_email,password:user_password}).exec(function(err, docs) {
        if (err) {
            res.status(500)
            res.json(err)
        }
        res.json(docs)
        //console.log(res.json(docs));
    })
})


//Obtener todos los eventos
Router.get('/events/all/', function(req, res) {
    let emailUser = req.query.email;
    //console.log(emailUser);
    Events.find({user:emailUser}).exec(function(err, docs) {
        if (err) {
            res.status(500)
            res.json(err)
        }
        res.json(docs)
    })
})

// Agregar a un nuevo evento
Router.get('/events/new/', function(req, res) {
    //console.log(Boolean(req.body.allDay));
    //console.log(req.query.allDay);

    let evento = new Events({
        id: Math.floor(Math.random() * 100),
        title: req.query.title,
        start: req.query.start,
        end: req.query.end,
        allday: req.query.allday,
        user: req.query.email,
    })
    //console.log("Titulo: "+req.body.titulo);
    //console.log("Fecha Inicio: "+req.body.start_date);
    evento.save(function(error) {
        if (error) {
            res.status(500)
            res.json(error)
        }
        res.send("Evento guardado")
    })
})

// Eliminar un usuario por su id
Router.post('/events/delete/:id', function(req, res) {
    let eventId = req.params.id;
    console.log(eventId)
    Events.deleteOne({id: eventId}, function(error) {
        if(error) {
            res.status(500)
            res.json(error)
        }
        res.send("Evento eliminado")
    })
})

// Actualizar un usuario por su id
Router.post('/events/update/:id', function(req, res) {
    let uid = req.params.id
    Events.remove({userId: uid}, function(error) {
        if(error) {
            res.status(500)
            res.json(error)
        }
        res.send("Evento actualizado")
    })
})

module.exports = Router
