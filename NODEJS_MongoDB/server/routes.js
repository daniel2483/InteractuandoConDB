const Router = require('express').Router();
const Events = require('./events_model.js')
const Users = require('./user_model.js')

//Login access
Router.post('/login', function(req, res) {

    let user_email = req.body.user;
    let user_password = req.body.pass;
    console.log(user_email);
    console.log(user_password);

    Users.findOne({email:user_email,password:user_password}).exec(function(err, docs) {
        if (err) {
            res.status(500)
            res.json(err)
        }
        res.json(docs)
        //console.log(res.json(docs));
    })
})

//Handling user logout
Router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});


//Obtener todos los eventos
Router.get('/events/all', function(req, res) {
    Events.find({}).exec(function(err, docs) {
        if (err) {
            res.status(500)
            res.json(err)
        }
        res.json(docs)
    })
})

// Agregar a un nuevo evento
Router.post('events/new', function(req, res) {
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
