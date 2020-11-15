<?php

  require('./lib.php');

  # Connecting to MySQL
  $con = new ConectorBD('localhost','nextu','12345');

  # Getting connection into agenda_db database
  $message = $con->initConexion('agenda_db');

  $update_event['msg'] = $message;

  //////////////////////////////// Updating an event ////////////////////////////////////////
  #  For debugging
  $update_event['id'] = $_POST['id'];

  # Getting is allday is set
  $event_type = $con->getType($_POST['id']);
  $evento = $event_type->fetch_assoc();
  $update_event['type'] = $evento['dia_completo'];

  # Updating the Event
  $con->updateEvent($_POST['id'],"'".$_POST['start_date']."'","'".$_POST['start_hour']."'","'".$_POST['end_date']."'","'".$_POST['end_hour']."'",$evento['dia_completo']);


  echo json_encode($update_event);

  $con->cerrarConexion();



 ?>
