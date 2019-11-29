/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.todasBorradas = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.guardarStorage = new Evento(this);
  this.preguntaGuardada = new Evento(this);
  this.votada = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    return this.preguntas.length-1
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var cantidades = [];
    respuestas.forEach(
      respuesta => {
        var cantidadPorRespuesta = {
          'textoRespuesta': respuesta,
          'cantidad': 0
        }
        return cantidades.push(cantidadPorRespuesta)
      }
    )
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': cantidades};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },
  
  cargarPreguntas: function(){
    localStorage.getItem('preguntas');
    var preguntasArray = JSON.parse(localStorage.getItem('preguntas'));
    preguntasArray.forEach(pregunta => this.preguntas.push(pregunta))
    this.preguntaGuardada.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
    localStorage.getItem('preguntas');
    JSON.parse(localStorage.getItem('preguntas'));
    this.guardarStorage.notificar();
  },

  borrarPregunta: function(id){
    this.preguntas.splice(this.preguntas.findIndex(pregunta => pregunta.id === id), 1);
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  borrarTodas: function(){
    this.preguntas.splice(0, this.preguntas.length);
    this.guardar();
    this.todasBorradas.notificar();
  },

  editarPregunta: function(id){
    var nuevoTextoPregunta = prompt('Editar pregunta');
    var preguntaFiltrada = this.preguntas.find(pregunta => pregunta.id === id)
    preguntaFiltrada.textoPregunta = nuevoTextoPregunta;
    this.guardar();
    this.preguntaEditada.notificar();
  },

  agregarVoto: function(nombrePregunta,respuestaSeleccionada){
    this.preguntas.filter(
      pregunta => { 
        pregunta.textoPregunta === nombrePregunta 
        pregunta.cantidadPorRespuesta.forEach(
          respuesta => {
          if(respuestaSeleccionada === respuesta.textoRespuesta){
            respuesta.cantidad++;
            this.guardar();
          }
        })
      }
    ); 
    this.votada.notificar();
  }
  
};
