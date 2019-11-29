/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });

  this.modelo.preguntaEliminada.suscribir(function(){
    contexto.reconstruirLista();
  });

  this.modelo.todasBorradas.suscribir(function(){
    contexto.reconstruirLista();
  });

  this.modelo.preguntaEditada.suscribir(function(){
    contexto.reconstruirLista();
  });

  this.modelo.guardarStorage.suscribir(function(){
    contexto.reconstruirLista();
  });

  this.modelo.preguntaGuardada.suscribir(function(){
    contexto.reconstruirLista();
  })

  this.modelo.votada.suscribir(function(){
    contexto.reconstruirLista();
  })
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    this.reconstruirLista();
    this.configuracionDeBotones();
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    validacionDeFormulario();
    this.controlador.cargarPreguntas()
  },

  construirElementoPregunta: function(pregunta){
    var contexto = this;
    var nuevoItem = $('<li></li>')
    nuevoItem.addClass('list-group-item');
    nuevoItem.attr({id: pregunta.id});
    document.getElementsByClassName('list-group-item')
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html())

    return nuevoItem;
  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];
      
      $('[name="option[]"]').each(function() {
        //completar
        var respuesta = $(this).val()
        respuestas.push(respuesta)
      })
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });
    
    //asociar el resto de los botones a eventos
    e.botonBorrarPregunta.click(function(){
      var id = parseInt($('.list-group-item.active').attr('id'));
      if(id >= 0) {
        contexto.controlador.borrarPregunta(id);
      }
    });

    e.botonBorrarTodo.click(function(){
      contexto.controlador.borrarTodas();
    });

    e.botonEditarPregunta.click(function(id){
      var id = parseInt($('.list-group-item.active').attr('id'));
      if(id >= 0) {
        contexto.controlador.editarPregunta(id);
      }
    });

    e.formulario.submit(function(){
      contexto.controlador.localStorage();
    })

  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
