<?php


class ConectorBD
{
  private $host;
  private $user;
  private $password;
  private $conexion;

  function __construct($host, $user, $password){
    $this->host = $host;
    $this->user = $user;
    $this->password = $password;
  }

  # Function to Connect to DB response with Error or OK messages
  function initConexion($nombre_db){
    $this->conexion = new mysqli($this->host, $this->user, $this->password, $nombre_db);
    if ($this->conexion->connect_error) {
      return "Error:" . $this->conexion->connect_error;
    }else {
      return "OK";
    }
  }

  # Function to close connection
  function cerrarConexion(){
    $this->conexion->close();
  }

  # Function to execute a query
  function ejecutarQuery($query){
    return $this->conexion->query($query);
  }

  # Function to create an user in users table in agenda_db
  function insertUsers($columns){
    $sql = 'INSERT INTO users'.'(';
    $i = 1;
    foreach ($columns as $key => $value) {
      $sql .= $key;
      if ($i<count($columns)) {
        $sql .= ', ';
      }else $sql .= ')';
      $i++;
    }
    $sql .= ' VALUES (';
    $i = 1;
    foreach ($columns as $key => $value) {
      $sql .= $value;
      if ($i<count($columns)) {
        $sql .= ', ';
      }else $sql .= ');';
      $i++;
    }

    return $sql;
    #return $this->ejecutarQuery($sql);

  }

  # Query to Check if the user exists
  function checkLogin($user){
    $sql = 'SELECT id,email,password from users where email = ';
    $sql .= "'".$user."';";
    return $this->ejecutarQuery($sql);
  }

  function getEvents($userId){
    $sql = 'SELECT * from evento where user_id = ';
    $sql .= "'".$userId."';";
    return $this->ejecutarQuery($sql);
  }

}


?>
