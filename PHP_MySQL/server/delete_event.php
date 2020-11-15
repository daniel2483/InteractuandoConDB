<?php

  require('./lib.php');

  # Connecting to MySQL
  $con = new ConectorBD('localhost','nextu','12345');

  # Getting connection into agenda_db database
  $message = $con->initConexion('agenda_db');

  $delete_event['msg'] = $message;

  //////////////////////////////// Deleting an event ////////////////////////////////////////
  #  For debugging
  $delete_event['id'] = $_POST['id'];

  # Deleting the Event
  $con->deleteEvent($_POST['id']);

  echo json_encode($delete_event);

  $con->cerrarConexion();

 ?>
