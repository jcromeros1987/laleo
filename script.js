function initMap() {
	
  // const origen = { lat: 19.386222605144557, lng: -99.15703021069578 };

  var ruta = [
	{lat: 19.386222605144557, lng: -99.15703021069578},
    {lat: 19.396222605144557, lng: -99.15603021069578},
    {lat: 19.406222605144557, lng: -99.15503021069578},
    {lat: 19.416222605144557, lng: -99.15403021069578},
    {lat: 19.434131107320475, lng: -99.1536538109751},
  ];
  
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: ruta[0],
    mapTypeId: 'terrain'
  });
  const infoWindow = new google.maps.InfoWindow();
  
  
  var flightPath = new google.maps.Polyline({
    path: ruta,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 4
  });
  flightPath.setMap(map);
  
  
  ruta.forEach((position, i) => {
    const marker = new google.maps.Marker({
      position,
      map,
      title: `${i + 1}`,
      label: `${i + 1}`,
      optimized: false,
    });
    
    marker.addListener("click", () => {
      infoWindow.close();
      infoWindow.setContent(marker.getTitle());
      infoWindow.open(marker.getMap(), marker);
    });
	console.log(i);
  });
}