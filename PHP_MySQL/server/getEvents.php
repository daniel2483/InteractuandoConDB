<?php

  require('./lib.php');

  session_start();
  #error_reporting(0);

  $con = new ConectorBD('localhost','nextu','12345');
  $events_data['DBCon'] = $con->initConexion('agenda_db');

  $user_info = $con->checkLogin($_SESSION['username']);

  $fila_user = $user_info->fetch_assoc();

  $events_data['UserId'] = $fila_user['id'];

  $user_events = $con->getEvents($fila_user['id']);

  if ($user_events->num_rows != 0) {
    $events_data['EventMessage'] = 'There are events';
    //////////////// For testing
    //$evento = $user_events->fetch_assoc();
    //$events_data['Events'][0]['title']=$evento['titulo'];
    //$events_data['Events'][0]['start']='2020-11-07T11:00:00';
    //$events_data['Events'][0]['end']='2020-11-07T12:00:00';

    $i = 0;
    while ($evento = $user_events->fetch_assoc()) {
      //$events_data['Test'] = 'TEST';
      $events_data['Events'][$i]['id']=$evento['id'];
      $events_data['Events'][$i]['title']=$evento['titulo'];


      if($evento['dia_completo'] == 1){
        $events_data['EventType']="Día Completo";
        $events_data['Events'][$i]['start']=$evento['fecha_inicio'];
        $events_data['Events'][$i]['allDay']=true;

        //$events_data['Events'][$i]['end']=$evento['fecha_inicio']."T23:59:59";
      }
      else{
        $events_data['EventType']="Rango de Fecha y hora";
        $events_data['Events'][$i]['start']=$evento['fecha_inicio']."T".$evento['hora_inicio'];
        $events_data['Events'][$i]['end']=$evento['fecha_fin']."T".$evento['hora_fin'];
      }
      $i++;
    }
    $events_data['msg'] = $events_data['DBCon'];
  }
  else{
    $events_data['EventMessage'] = 'There are no events for '.$_SESSION['username'];
    $events_data['msg'] = $events_data['DBCon'];
  }

  echo json_encode($events_data);

  $con->cerrarConexion();

 ?>
