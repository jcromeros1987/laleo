
let map;

class Simulacion {


	i = 0;
	ruta = [];
	avance = []
	
	estados_nav = [
		{time : '04-05-2021 13:17:26', estatus : "Orden creada"}, 
		{time : '04-05-2021 13:17:28', estatus : "Buscando Mensajero Cercano"},
		{time : '04-05-2021 13:18:35', estatus : "Orden en proceso"}, 
		{time : '04-05-2021 13:29:00', estatus : "Punto de Origen A : En Proceso"}, 
		{time : '04-05-2021 13:32:17', estatus : "Punto de Origen A : Finalizado"}, 
		{time : '04-05-2021 13:32:17', estatus : "En Ruta"}, 
		{time : '04-05-2021 13:53:18', estatus : "Punto de Entrega B : En Proceso"}, 
		{time : '04-05-2021 13:01:29', estatus : "Punto de Entrega B : Finalizado"}, 
		{time : '04-05-2021 13:17:29', estatus : "Orden Finalizada"}];

	ruta = [
		{lat: 19.386222605144557, lng: -99.15703021069578},
		{lat: 19.396222605144557, lng: -99.15603021069578},
		{lat: 19.406222605144557, lng: -99.15503021069578},
		{lat: 19.416222605144557, lng: -99.15403021069578},
		{lat: 19.434131107320475, lng: -99.1536538109751},
		];

	edo_act = 0;
	edo_sig = 1;
	
	avanzar(){
		
		if(this.estados_nav[this.edo_act]['estatus'] == "FIN" ){
			return
		} else if( this.estados_nav[this.edo_act]['estatus'] == "Orden Finalizada" ) {
			this.imprimirEstado();
			this.estados_nav[this.edo_act]['estatus'] = "FIN"
		// Si el pedido esta en ruta, recorrer el arreglo de la ruta
		} else if(this.estados_nav[this.edo_act]['estatus'] == "En Ruta") {
		  //ruta.forEach((position, i) => {

			if(this.i == 0){
				this.imprimirEstado();
			}
			
			this.pintarMarcadores();
			this.pintarPath();

			console.log("Ruta i : " + this.i);
			this.avanzarRuta();
			
			if(this.i >= this.ruta.length){
				this.edo_act++;
				this.edo_sig=this.edo_act+1;
			}	
			
			
		  //});
		} else{
			
			this.imprimirEstado();
			
			if(this.edo_act < this.estados_nav.length - 1 )
				this.avanzarEstadoPedido();
		}
	}
	
	imprimirEstado(){
		console.log(this.estados_nav[this.edo_act]['time'] + " : " + this.estados_nav[this.edo_act]['estatus']);
		document.getElementById('ruta').innerHTML += this.estados_nav[this.edo_act]['time'] + '<br /> | ' + this.estados_nav[this.edo_act]['estatus'] + '<br />';
	}
	
	
	pintarMarcadores(){
		let position = this.ruta[this.i];
		
		this.marcador = new google.maps.Marker({
		  position,
		  map,
		  title: `${this.i + 1}`,
		  label: `${this.i + 1}`,
		  optimized: false,
		});
		
		this.marcador.addListener("click", () => {
		  infoWindow.close();
		  infoWindow.setContent(marcador.getTitle());
		  infoWindow.open(marcador.getMap(), marcador);
		});
	}
	
	pintarPath(){
		if(this.i == 1){
			this.mrk_act = this.marcador;
		} else if(this.i > 1) {
			this.mrk_act.setMap(null);
			this.mrk_act = this.marcador;
		}
		
		// marcadores.push(marcador);
		
		this.avance.push(this.ruta[this.i]);
		
		var flightPath = new google.maps.Polyline({
			path: this.avance,
			geodesic: true,
			strokeColor: '#FF0000',
			strokeOpacity: 1.0,
			strokeWeight: 4
		});

		flightPath.setMap(map);
	}
	
	avanzarRuta(){
		this.i++;
	}
	
	avanzarEstadoPedido(){
		this.edo_act = this.edo_sig;
		this.edo_sig++;
	}
	
}

function initMap() {
  
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 19.406222605144557, lng: -99.15503021069578},
    mapTypeId: 'terrain'
  });
  
  const infoWindow = new google.maps.InfoWindow();
  sim = new Simulacion(map);
  
  setInterval(() => sim.avanzar(), 500);
}


