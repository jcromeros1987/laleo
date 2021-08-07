const estados_nav = [
	{time : '04-05-2021 13:17:26', estatus : "Orden creada"}, 
	{time : '04-05-2021 13:17:26', estatus : "Buscando Mensajero Cercano"},
	{time : '04-05-2021 13:17:26', estatus : "Orden en proceso"}, 
	{time : '04-05-2021 13:17:26', estatus : "Punto de Origen A : En Proceso"}, 
	{time : '04-05-2021 13:17:26', estatus : "Punto de Origen A : Finalizado"}, 
	{time : '04-05-2021 13:17:26', estatus : "En Ruta"}, 
	{time : '04-05-2021 13:17:26', estatus : "Punto de Entrega B : En Proceso"}, 
	{time : '04-05-2021 13:17:26', estatus : "Punto de Entrega B : Finalizado"}, 
	{time : '04-05-2021 13:17:26', estatus : "Orden Finalizada"}];

const ruta = [
	{lat: 19.386222605144557, lng: -99.15703021069578},
	{lat: 19.396222605144557, lng: -99.15603021069578},
	{lat: 19.406222605144557, lng: -99.15503021069578},
	{lat: 19.416222605144557, lng: -99.15403021069578},
	{lat: 19.434131107320475, lng: -99.1536538109751},
];

let avance = []

// const origen = { lat: 19.386222605144557, lng: -99.15703021069578 };
let map;
let mrk_act;
let edo_act = 0;
let edo_sig = 1;
let i = 0;

const simulacion = () => {

	if(estados_nav[edo_act]['estatus'] == "En Ruta") {
	  //ruta.forEach((position, i) => {
		position = ruta[i];
		
		marcador = new google.maps.Marker({
		  position,
		  map,
		  title: `${i + 1}`,
		  label: `${i + 1}`,
		  optimized: false,
		});
		
		marcador.addListener("click", () => {
		  infoWindow.close();
		  infoWindow.setContent(marcador.getTitle());
		  infoWindow.open(marcador.getMap(), marcador);
		});
		
		if(i == 1){
			mrk_act = marcador;
		} else if(i > 1) {
			mrk_act.setMap(null);
			mrk_act = marcador;
		}
		
		// marcadores.push(marcador);
		
		avance.push(ruta[i]);
		
		var flightPath = new google.maps.Polyline({
			path: avance,
			geodesic: true,
			strokeColor: '#FF0000',
			strokeOpacity: 1.0,
			strokeWeight: 4
		});

		flightPath.setMap(map);
		

		console.log("i : " + i);
		
		i++;
		
		if(i >= ruta.length){
			edo_act++;
			edo_sig+=2
		}	
		
		
	  //});
		
	} else {
		
		console.log(estados_nav[edo_act]['time'] + " : " + estados_nav[edo_act]['estatus']);
		document.getElementById('ruta').innerHTML += estados_nav[edo_act]['time'] + '<br /> | ' + estados_nav[edo_act]['estatus'] + '<br />';
		
		edo_act = edo_sig;
		edo_sig++;
	}
	
}

function initMap() {
  
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: ruta[2],
    mapTypeId: 'terrain'
  });
  
  const infoWindow = new google.maps.InfoWindow();
    
  setInterval(simulacion, 2000);
}


