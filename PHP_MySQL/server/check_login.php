<?php

  require('./lib.php');

  error_reporting(0);

  $con = new ConectorBD('localhost','nextu','12345');

  $response['msg'] = $con->initConexion('agenda_db');


  $response['user'] = $_POST['user'];
  $response['password'] = $_POST['password'];

  if ($response['msg']=='OK') {
    $resultado_consulta = $con->checkLogin($_POST['user']);
    
    if ($resultado_consulta->num_rows != 0) {
      $fila = $resultado_consulta->fetch_assoc();
      if (password_verify($_POST['password'], $fila['password'])) {
        $response['acceso'] = 'concedido';
        session_start();
        $_SESSION['username']=$fila['email'];
      }else {
        $response['motivo'] = 'Contraseña incorrecta';
        $response['acceso'] = 'rechazado';
      }
    }else{
      $response['motivo'] = 'Email incorrecto';
      $response['acceso'] = 'rechazado';
    }
  }

  echo json_encode($response);

  $con->cerrarConexion();



 ?>
