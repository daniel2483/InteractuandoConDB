// This script is build to create a new user in table usuarios in MongoDB

var MongoClient = require('mongodb').MongoClient

var url = "mongodb://localhost/"

var usuario = {email:"jdrs@email.com",
            name:"Daniel R",
            password:"12345",
            status:true}

let userExist = false;

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true } , function(err,client){
  const db = client.db('agenda');
  const coleccion = 'usuarios';

  // Conexión
    if(err) console.log(err);
    console.log("Conexión establecida con la base de datos");

    checkIfUserAlreadyExist(db, coleccion, (error, result) =>{
      if(error) console.log("Error Verificando el registro de usuario: "+error);
    })


})


insertarNuevoUsuario = function(db, coleccion_name, callback){
  let coleccion = db.collection(coleccion_name);

  // inserOne usuario in the database
  coleccion.insertOne(
    {email:usuario.email,name: usuario.name, password: usuario.password, status: usuario.status}
  , (error, result) => {
    console.log("Usuario insertado Nombre: " + usuario.name + " Email: " + usuario.email + " Password(only for this test): " + usuario.password);
    console.log("Resultado ID: "+result.insertedId.toString());
  })

}

checkIfUserAlreadyExist = function(db, coleccion_name, callback){
  let coleccion = db.collection(coleccion_name);

  // Find One usuario in the database
  coleccion.findOne( {} , (error, user) => {
    console.log("Checking if user already exist from colection: "+coleccion_name);
    if (error) throw error;
    if (user != null){
      console.log("Return email: "+user.email + " user already exists...");
    }
    else{
      // Create the user only if doesn't exist
      console.log("User does not exist... Creating");
      insertarNuevoUsuario(db, coleccion_name, (error, result) =>{
        if(error) console.log("Error insertando el nuevo usuario: "+error);
      })
    }
  })

}
