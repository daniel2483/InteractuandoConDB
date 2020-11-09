<?php

  require('./lib.php');
  #error_reporting(0);
  session_start();

  # Connecting to MySQL
  $con = new ConectorBD('localhost','nextu','12345');

  # Getting connection into agenda_db database
  $message = $con->initConexion('agenda_db');

  $new_event['msg'] = $message;

  $user_info = $con->checkLogin($_SESSION['username']);

  $fila_user = $user_info->fetch_assoc();

  $new_event['UserId'] = $fila_user['id'];

  $allDay = "'".$_POST['allDay']."'";
  $titulo = "'".$_POST['titulo']."'";
  $fecha_inicio = "'".$_POST['start_date']."'";
  $hora_inicio = "'".$_POST['start_hour']."'";
  $fecha_fin = "'".$_POST['end_date']."'";
  $hora_fin = "'".$_POST['end_hour']."'";

  $new_event['AllDay'] = $allDay;

  $con->newEvents($new_event['UserId'],$allDay,$titulo,$fecha_inicio,$hora_inicio,$fecha_fin,$hora_fin);

  echo json_encode($new_event);

  $con->cerrarConexion();

 ?>
