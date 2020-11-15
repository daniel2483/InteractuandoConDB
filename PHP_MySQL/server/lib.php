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

  function newEvents($userId,$allDay,$titulo,$fecha_inicio,$hora_inicio,$fecha_fin,$hora_fin){
    if($allDay == 'true'){
      $sql = 'INSERT INTO evento (titulo,fecha_inicio,dia_completo,user_id) VALUES';
      $sql .= '('.$titulo.','.$fecha_inicio.',1,'.$userId.');';
    }
    else{
      $sql = 'INSERT INTO evento (titulo,fecha_inicio,hora_inicio,fecha_fin,hora_fin,dia_completo,user_id) VALUES';
      $sql .= '('.$titulo.','.$fecha_inicio.','.$hora_inicio.','.$fecha_fin.','.$hora_fin.',0,'.$userId.');';
    }
    //echo $sql;
    $this->ejecutarQuery($sql);
  }

  function deleteEvent($event_id){
    $sql ='DELETE FROM evento WHERE id='.$event_id.";";
    //echo $sql;
    $this->ejecutarQuery($sql);
  }

  function getType($event_id){
    $sql = 'SELECT dia_completo from evento where id = ';
    $sql .= "'".$event_id."';";
    return $this->ejecutarQuery($sql);
  }

  function updateEvent($event_id,$start_date,$start_hour,$end_date,$end_hour,$all_day){
    if ($all_day == 0){
      $sql ='UPDATE evento SET fecha_inicio='.$start_date.', hora_inicio ='.$start_hour.', fecha_fin='.$end_date.', hora_fin='.$end_hour;
      $sql .= " WHERE id=".$event_id.";";
    }
    else{
      $sql ='UPDATE evento SET fecha_inicio='.$start_date;
      $sql .= " WHERE id=".$event_id.";";
    }

    //echo $sql;
    $this->ejecutarQuery($sql);
  }

}


?>
