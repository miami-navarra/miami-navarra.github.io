var map = L.map('uber-map').setView([25.7465389,-80.2118606], 12);

L.tileLayer('https://tile.thunderforest.com/transport/{z}/{x}/{y}@2x.png?apikey=18fe8055d75647fa9bb9cbbb13dc949f', { maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="thunderforest.com">Thunderforest</a>'}).addTo(map);

var mapIcon = L.icon({
iconUrl: '/assets/images/3/map-marker.svg',
iconSize:     [25, 25], // size of the icon
popupAnchor:  [0, 0] // point from which the popup should open relative to icon
});

L.marker([25.778,-80.2195], {icon: mapIcon}).addTo(map).bindPopup("<strong>Marlins Park</strong><br><em>Closest station:</em> Culmer<br><em>Distance:</em> 1.1 miles<br><em>Minutes to walk:</em> 24<br><em>Appx. Uber cost:</em> $8-10");

L.marker([25.727,-80.2363], {icon: mapIcon}).addTo(map).bindPopup("<strong>Miami City Hall</strong><br><em>Closest station:</em> Coconut Grove<br><em>Distance:</em> 1.1 miles<br><em>Minutes to walk:</em> 24<br><em>Appx. Uber cost:</em> $7-9");

L.marker([25.7656908,-80.4609997], {icon: mapIcon}).addTo(map).bindPopup("<strong>Miami-Dade Regional Soccer Park</strong><br><em>Closest station:</em> Palmetto <br><em>Distance:</em> 2.5 miles<br><em>Minutes to walk:</em> 53<br><em>Appx. Uber cost:</em> $10-14");

L.marker([25.958326,-80.2421728], {icon: mapIcon}).addTo(map).bindPopup("<strong>Hard Rock Stadium</strong><br><em>Closest station:</em> Golden Glades<br><em>Distance:</em> 4.4 miles<br><em>Minutes to walk:</em> 98<br><em>Appx. Uber cost:</em> $13-16");

L.marker([25.7859961,-80.1398617], {icon: mapIcon}).addTo(map).bindPopup("<strong>Art Deco District</strong><br><em>Closest station:</em> Historic Overtown/Lyric Theatre<br><em>Distance:</em> 5.1 miles<br><em>Minutes to walk:</em> 114<br><em>Appx. Uber cost:</em> $14-17");

L.marker([25.7443865,-80.2153456], {icon: mapIcon}).addTo(map).bindPopup("<strong>Vizcaya Museum &amp; Gardens</strong><br><em>Closest station:</em> Vizcaya<br><em>Distance:</em> 0.6 miles<br><em>Minutes to walk:</em> 14<br><em>Appx. Uber cost:</em> $9-11");

L.marker([25.7804366,-80.1925736], {icon: mapIcon}).addTo(map).bindPopup("<strong>Freedom Tower</strong><br><em>Closest station:</em> Freedom Tower<br><em>Distance:</em> 0.1 miles<br><em>Minutes to walk:</em> 2<br><em>Appx. Uber cost:</em> N/A");

L.marker([25.7407941,-80.2812545], {icon: mapIcon}).addTo(map).bindPopup("<strong>Biltmore Hotel</strong><br><em>Closest station:</em> Douglas Road<br><em>Distance:</em> 2.1 miles<br><em>Minutes to walk:</em> 47<br><em>Appx. Uber cost:</em> $10-13");

L.marker([25.7665181,-80.204574], {icon: mapIcon}).addTo(map).bindPopup("<strong>Calle Ocho</strong><br><em>Closest station:</em> Vizcaya<br><em>Distance:</em> 1.8 miles<br><em>Minutes to walk:</em> 41<br><em>Appx. Uber cost:</em> $9-12");

L.marker([25.7173947,-80.2807011], {icon: mapIcon}).addTo(map).bindPopup("<strong>University of Miami</strong><br><em>Closest station:</em> University<br><em>Distance:</em> 0.3 miles<br><em>Minutes to walk:</em> 7<br><em>Appx. Uber cost:</em> N/A");