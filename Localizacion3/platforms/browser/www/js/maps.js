var app = {
  inicio: function() {
    this.iniciaFastClick();

  },

  iniciaFastClick: function () {
    FastClick.attach(document.body);
  },

  dispositivoListo: function(){
    navigator.geolocation.getCurrentPosition(app.pintaCoordenadasEnMapa, app.errorAlSolicitarLocalizacion);
  },

   pintaCoordenadasEnMapa: function(position){
    var miMapa = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ29vdHlmZXIiLCJhIjoiY2l1MGlrb2M3MDAwMDJ6bXAxY3dlOXdkYiJ9.RBfUsuzHfLrofEyMR8IVlA', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(miMapa);

    app.pintaMarcador([position.coords.latitude, position.coords.longitude], '¡Estoy aquí!', miMapa);//llamada a funcion pinta marcador

	// escuchamos eventos el evento click tap del usuario sobre el mapa se ejecuta esa funcion sobre el mapa
	//navegador le pasa, latitud y longitus creamos texto , tofixed solo con dos decimales, limitar el numero dedecimales 
    miMapa.on('click', function(evento){
      var texto = 'Marcador en l(' + evento.latlng.lat.toFixed(2) + ') y L(' + evento.latlng.lng.toFixed(2) + ')';
      app.pintaMarcador(evento.latlng, texto, miMapa); //pintamos un nuevo marcador con el texto que sea ha creado nuevo 
    });
  },

  //pintamarcador es una funcion que , recibe latitud y longitud en un array o arrreglo 
  pintaMarcador: function(latlng, texto, mapa){
    var marcador = L.marker(latlng).addTo(mapa);//con leflet utilizamos l.marker para crear un nuevo marcador
	//y se lo añadimos a nuestro mapa
    marcador.bindPopup(texto).openPopup();//añadimos un poppup una ventanica que contendra el texto 
  },
  
  
  
  
  
  
  
  
  
  
	 
  errorAlSolicitarLocalizacion: function(error){
    console.log(error.code + ': ' + error.message);
  }

};

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    app.inicio();
  }, false);
  document.addEventListener('deviceready', function() {
    app.dispositivoListo();// escuchar otro evnto dispositivo listo para solicitar localizacion , se ejecuta la funcion que declaramos 
	//pedimos la localizacion del api 
  }, false);
}
