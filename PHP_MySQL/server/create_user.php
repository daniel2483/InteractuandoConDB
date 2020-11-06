<?php

  require('lib.php');

  # Creating DB Object
  $con = new ConectorBD('localhost','nextu','12345');

  # Getting connection into agenda_db database
  $message = $con->initConexion('agenda_db');

  echo "<h3>Status conexión a agenda_db:</h3><b>".$message."</b><br><br>";

	# To use encrypt passwords functions
  #password_hash(, PASSWORD_DEFAULT);
  #password_verify($_POST['passw'], $fila['psw']);

  if ($message == 'OK'){

    #################### Creating User 1

    $email = "'jps@mail.com'";
    $nombre = "'Juan Perez S'";
    $passwd = "'".password_hash('12345678', PASSWORD_DEFAULT)."'";
    $birth_date = "'1989-09-11'";

    $user =['email' => $email,
            'nombre_completo' => $nombre,
            'password' => $passwd ,
            'fecha_nacimiento' => $birth_date];

    $query = $con->insertUsers($user);

    echo "Creando usuario: ".$email."<br>";
    echo $query."<br><br>";

    if(!$con->ejecutarQuery($query)){
  	  echo "Error en creación de usuario <b>".$email."</b>!<br><br>";
    };

    #################### Creating User 2

    $email = "'klc@mail.com'";
    $nombre = "'Karla Luisa C'";
    $passwd = "'".password_hash('12345', PASSWORD_DEFAULT)."'";
    $birth_date = "'1999-06-23'";

    $user =['email' => $email,
            'nombre_completo' => $nombre,
            'password' => $passwd ,
            'fecha_nacimiento' => $birth_date];

    $query = $con->insertUsers($user);

    echo "Creando usuario: ".$email."<br>";
    echo $query."<br><br>";
  #  $con->ejecutarQuery($query);

    if(!$con->ejecutarQuery($query)){
  	  echo "Error en creación de usuario <b>".$email."</b>!<br><br>";
    };

    #################### Creating User 3

    $email = "'mmr@mail.com'";
    $nombre = "'Manuel Martin R'";
    $passwd = "'".password_hash('123456789', PASSWORD_DEFAULT)."'";
    $birth_date = "'1985-01-15'";

    $user =['email' => $email,
            'nombre_completo' => $nombre,
            'password' => $passwd ,
            'fecha_nacimiento' => $birth_date];

    $query = $con->insertUsers($user);

    echo "Creando usuario: ".$email."<br>";
    echo $query."<br><br>";

    if(!$con->ejecutarQuery($query)){
  	  echo "Error en creación de usuario <b>".$email."</b>!<br><br>";
    };

  }

 ?>
