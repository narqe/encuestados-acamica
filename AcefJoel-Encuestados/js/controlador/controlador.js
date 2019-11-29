/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },
  borrarPregunta: function(id){
    this.modelo.borrarPregunta(id);
  },

  borrarTodas: function(){
    this.modelo.borrarTodas();
  },

  editarPregunta: function(id, pregunta){
    this.modelo.editarPregunta(id, pregunta);
  },

  agregarVoto: function(nombrePregunta,respuestaSeleccionada){
    this.modelo.agregarVoto(nombrePregunta,respuestaSeleccionada)
  },

  localStorage: function(){
    this.modelo.guardar();
  },

  cargarPreguntas: function(){
    this.modelo.cargarPreguntas();
  }
};
