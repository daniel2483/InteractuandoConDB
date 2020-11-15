$(function(){
  var l = new Login();
})


class Login {
  constructor() {
    this.submitEvent()
  }

  submitEvent(){
    $('form').submit((event)=>{
      event.preventDefault()
      this.sendForm()
    })
  }

  sendForm(){
    //let form_data = new FormData();
    var usuario = $('#user').val();
    var contrasenia = $('#password').val();

    console.log(usuario);
    console.log(contrasenia);
    //form_data.append('username', $('#user').val())
    //form_data.append('password', $('#password').val())
    //console.log(form_data);
    $.ajax({
      url: '../server/check_login.php',
      dataType: "json",
      cache: false,
      //processData: false,
      //contentType: false,
      data: {user:usuario,password:contrasenia},
      type: 'POST',
      success: function(php_response){
        //alert(php_response.user);
        console.log(php_response.msg);
        if (php_response.acceso == "concedido") {
          window.location.href = 'main.html';
        }else {
          alert("Acceso: "+php_response.acceso+" Motivo: "+php_response.motivo);
        }
      },
      error: function(){
        alert("Error en la comunicación con el servidor!");
      }
    })
  }
}
