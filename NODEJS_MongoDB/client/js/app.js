

//////////////////// Class
class EventManager {
    constructor() {
        this.urlBase = "/events"
        this.obtenerDataInicial()
        this.inicializarFormulario()
        this.guardarEvento()
    }

    obtenerDataInicial() {
        //console.log("Getting parameters: " + jQuery.param(email));
        let url = this.urlBase + "/all";
        let email = $('#email').val();
        $.get(url,{email: email}, (response) => {
            //console.console.log(response.eventoId);
            this.inicializarCalendario(response)
        })
    }

    eliminarEvento(evento) {
        let eventId = evento._id
        $.post('/events/update/'+eventId, (response) => {
            alert(response)
        })

    }

    actualizarEvento(evento){
      let eventId = evento.id,
          start = moment(evento.start).format('YYYY-MM-DD HH:mm:ss'),
          end = moment(evento.end).format('YYYY-MM-DD HH:mm:ss'),
          start_date,
          end_date,
          start_hour,
          end_hour

          start_date = start.substr(0,10)
          start_hour = start.substr(11,8)

          if(evento.end != null ){
            end_date = end.substr(0,10)
            end_hour = end.substr(11,8)
          }
          else
          {end_date = ''; end_hour='';}


      console.log("Inicio: "+start_date+" Hora: "+start_hour);
      console.log("Fin: "+end_date+" Hora: "+end_hour);
      $.post('/events/update/'+eventId, {start:start_date+"T"+start_hour,end:end_date+"T"+end_hour}, (response) => {
          alert(response)
      })
    }

    guardarEvento() {
        $('.addButton').on('click', (ev) => {
            ev.preventDefault()
            let nombre = $('#titulo').val(),
            start = $('#start_date').val(),
            title = $('#titulo').val(),
            end = '',
            start_hour = '',
            end_hour = '',
            email = $('#email').val();

            if (!$('#allDay').is(':checked')) {
                end = $('#end_date').val()
                start_hour = $('#start_hour').val()
                end_hour = $('#end_hour').val()
                start = start + 'T' + start_hour
                end = end + 'T' + end_hour
            }
            let url = this.urlBase + "/new?allday="+$('#allDay').is(':checked');
            if (title != "" && start != "") {
                let ev = {
                    title: title,
                    start: start,
                    end: end,
                    email:email,
                }
                $.get(url, ev, (response) => {
                    alert(response)
                })
                $('.calendario').fullCalendar('renderEvent', ev)
            } else {
                alert("Complete los campos obligatorios para el evento")
            }
        })
    }

    actu

    inicializarFormulario() {
        $('#start_date, #titulo, #end_date').val('');
        $('#start_date, #end_date').datepicker({
            dateFormat: "yy-mm-dd"
        });
        $('.timepicker').timepicker({
            timeFormat: 'HH:mm:ss',
            interval: 30,
            minTime: '5',
            maxTime: '23:30:00',
            defaultTime: '',
            startTime: '5:00',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });
        $('#allDay').on('change', function(){
            if (this.checked) {
                $('.timepicker, #end_date').attr("disabled", "disabled")
            }else {
                $('.timepicker, #end_date').removeAttr("disabled")
            }
        })
    }

    inicializarCalendario(eventos) {

      // Get current date
      var d = new Date();
      var month = d.getMonth()+1;
      var day = d.getDate();
      if (day<10){day = '0'+day;}
      var year = d.getFullYear();
      var full_date = year+'-'+month+'-'+day;

        $('.calendario').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,basicDay'
            },
            defaultDate: full_date,
            navLinks: true,
            editable: true,
            eventLimit: true,
            droppable: true,
            dragRevertDuration: 0,
            timeFormat: 'H:mm',
            eventDrop: (event) => {
                this.actualizarEvento(event)
            },
            events: eventos,
            eventDragStart: (event,jsEvent) => {
                $('.delete').find('img').attr('src', "../img/trash-open.png");
                $('.delete').css('background-color', '#a70f19')
            },
            eventDragStop: (event,jsEvent) => {
                var trashEl = $('.delete');
                var ofs = trashEl.offset();
                var x1 = ofs.left;
                var x2 = ofs.left + trashEl.outerWidth(true);
                var y1 = ofs.top;
                var y2 = ofs.top + trashEl.outerHeight(true);
                if (jsEvent.pageX >= x1 && jsEvent.pageX<= x2 &&
                    jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                        this.eliminarEvento(event)
                        $('.calendario').fullCalendar('removeEvents', event._id);
                    }
                }
            })
        }
    }

    // Contruct the calendar View after rendering the complete html
    window.onload = function(){
      const Manager = new EventManager()
    }
